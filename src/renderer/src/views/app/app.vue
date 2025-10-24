<script setup lang="ts">
import { ref, onMounted } from 'vue'
import App from './app.provider'
import type { Question } from '../../interfaces/interfaces'
import Ruleta from '../roulette/roulette.vue'
import Pregunta from '../questions/questions.vue'
import areas from '../../interfaces/interfaces'
import QrcodeVue from '../qr/qr.vue'
import Qr from '../qr/qr.provider'
import Game from '../game/game.provider'

// Game flow states
type GameState = 'qr-scan' | 'spinning' | 'question' | 'feedback'

const gameState = ref<GameState>('qr-scan')
const currentAreaIndex = ref<number | null>(null)
const currentQuestionIndex = ref(0)
const showBlurOverlay = ref(false)

// Store original scan function
const originalQrScan = Qr.scan.bind(Qr)

// Custom scan handler for game
async function customScan(value: string) {
  console.log('🔍 customScan llamado con:', value)
  
  // Safety check: ensure value is a string
  if (!value || typeof value !== 'string') {
    console.log('❌ Valor inválido recibido')
    return
  }
  
  console.log('📱 QR Raw:', value)
  
  // Normalize the value directly (don't try to decode from hex)
  const normalizedValue = String(value).toUpperCase().trim()
  
  console.log('🔄 QR Normalizado:', normalizedValue)
  console.log('✅ Includes VALEPORUNJUEGO?:', normalizedValue.includes('VALEPORUNJUEGO'))

  // Check if it's a valid game ticket
  if (normalizedValue.includes('VALEPORUNJUEGO')) {
    
    // Only intercept when waiting for ticket
    if (gameState.value !== 'qr-scan') {
      console.log('❌ No estamos en estado qr-scan, ignorando')
      return
    }
    
    try {
      // Check if there are prizes available
      const statusStock = await Game.prize.checkStock()
      
      if (!statusStock) {
        console.log('❌ No hay más premios')
        Qr.message.show('Lo sentimos, este juego terminó')
        Qr.enable = false
        return
      }
      
      // Valid ticket - start the game!
      console.log('🎮 Vale válido detectado - iniciando juego')
      startGame()
      return // Important: don't call original scan
    } catch (error) {
      console.error('Error al procesar el vale:', error)
      // Si hay error, igual iniciamos el juego
      console.log('🎮 Iniciando juego sin verificar stock')
      startGame()
      return
    }
  }
  
  // Not a game ticket - it's a regular user QR with {id, name, uuid}
  // Pass to original scan function to handle user data
  console.log('⚠️ No es un vale, es un QR de usuario regular - llamando scan original')
  try {
    return originalQrScan(value)
  } catch (error) {
    console.error('Error en scan original:', error)
    Qr.message.show('Lo sentimos, el código QR escaneado es inválido')
  }
}

// Override Qr.scan
Qr.scan = customScan

function startGame() {
  gameState.value = 'spinning'
  showBlurOverlay.value = true
  
  // Auto-spin the roulette after a brief delay
  setTimeout(() => {
    const rouletteEvent = new Event('auto-spin')
    window.dispatchEvent(rouletteEvent)
  }, 500)
}

function onSelected(index: number) {
  currentAreaIndex.value = index
  currentQuestionIndex.value = 0
  gameState.value = 'question'
}

function onAnswered(answerIndex: number) {
  if (answerIndex === -1) {
    // Question cleared after feedback - return to QR scan
    resetGame()
  } else {
    // Answer was selected, show feedback
    gameState.value = 'feedback'
  }
}

function resetGame() {
  gameState.value = 'qr-scan'
  currentAreaIndex.value = null
  currentQuestionIndex.value = 0
  showBlurOverlay.value = false
  
  // Re-enable QR scanning
  Qr.enable = true
  
  console.log('Juego reiniciado - esperando nuevo vale')
}

onMounted(async() => {
  App.init()
  console.log('App montada - esperando escaneo de vale')
})
</script>

<template>
  <div class="app">
      <!-- 🔵 Logo arriba a la izquierda -->
    <div class="logo-top-left">
      <img src="../../assets/Isotipo en Blanco pleno.png" alt="Logo" />
    </div>

    <!-- 🟣 Logo centrado abajo -->
    <div class="logo-bottom-center">
      <img src="../../assets/Logo horitzontal blanco.png" alt="Logo inferior" />
    </div>
    <div class="game-container">
      <div class="game-content">
        
        <!-- QR Scanner - Always visible when in qr-scan state -->
        <div v-show="gameState === 'qr-scan'" class="qr-section">

          <div class="instruction-box">
            <h2 class="instruction-title">¡Juega con nosotros!</h2>
            <div class="step">
                <span class="step-number">1</span>
                <span class="step-text">Escanea este QR</span>
            </div>
            <div class="qr-wrapper">
            <QrcodeVue />
          </div>
            <div class="instruction-steps">
              <div class="step">
                <span class="step-number">2</span>
                <span class="step-text">Completa el formulario</span>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <span class="step-text">Muestra el QR del final del formulario en el lector del tótem</span>
              </div>
              <div class="step">
                <span class="step-number">4</span>
                <span class="step-text">Disfruta del juego!</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Blur overlay for game elements -->
        <div 
          v-if="showBlurOverlay" 
          class="blur-overlay"
          :class="{ active: gameState !== 'qr-scan' }"
        >
          <!-- Roulette - Visible during spinning -->
          <div v-show="gameState === 'spinning'" class="roulette-section">
            <Ruleta 
              :areas="areas.map(a => a.name)" 
              @selected="onSelected"
              :auto-spin="true"
            />
          </div>

          <!-- Question section - Visible during question and feedback -->
          <div 
            v-if="currentAreaIndex !== null && (gameState === 'question' || gameState === 'feedback')" 
            class="question-section"
          >
            <h3 class="area-title">Área: {{ areas[currentAreaIndex].name }}</h3>
            <Pregunta 
              :question="areas[currentAreaIndex].questions[currentQuestionIndex]" 
              @answered="onAnswered"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.app {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 🔵 Logo arriba a la izquierda */
.logo-top-left {
  position: fixed;
  top: 1.5rem;
  left: 1.5rem;
  z-index: 200;
  animation: fadeInLogo 1s ease forwards;

  img {
    height: clamp(50px, 6vw, 90px);
    width: auto;
    filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4));
  }
}

/* 🟣 Logo centrado abajo */
.logo-bottom-center {
  position: fixed;
  bottom: 1.5rem;
  left: 35%;
  transform: translateX(-50%);
  z-index: 150;
  animation: fadeInLogo 1.5s ease forwards;
  

  img {
    height: clamp(90px, 5vw, 80px);
    width: auto;
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  img:hover {
    opacity: 1;
  }
}

@keyframes fadeInLogo {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* resto del estilo igual */
.game-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: clamp(1rem, 2vw, 2rem);
}


.game-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: clamp(1rem, 2vw, 2rem);
}

.game-content {
  position: relative;
  width: 100%;
  max-width: 1600px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  animation: fadeIn 0.5s ease;
  width: 100%;
  max-width: 800px;
}

.instruction-box {
  background: white;
  padding: clamp(2rem, 4vw, 3rem);
  border-radius: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 100%;
}

.instruction-title {
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
}

.instruction-text {
  font-size: clamp(1.1rem, 2.5vw, 2rem);
  color: #5a6c7d;
  margin-bottom: 2rem;
  font-weight: 500;
}

.instruction-steps {
  display: flex;
  justify-content: space-around;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 120px;
  margin-bottom: 1rem;
}

.step-number {
  width: clamp(40px, 8vw, 60px);
  height: clamp(40px, 8vw, 60px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.step-text {
  font-size: clamp(0.9rem, 2vw, 1.1rem);
  color: #5a6c7d;
  font-weight: 500;
  text-align: center;
}

.blur-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: all 0.6s ease;
  opacity: 0;
  pointer-events: none;

  &.active {
    opacity: 1;
    pointer-events: all;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }
}

.roulette-section {
  animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.question-section {
  width: 100%;
  max-width: 800px;
  padding: 0 2rem;
  animation: slideUp 0.5s ease;
}

.area-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  color: white;
  margin-bottom: clamp(1.5rem, 3vw, 2rem);
  text-align: center;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.6);
  font-weight: 700;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.5);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Totem/Large Display Styles */
@media (min-width: 1600px) {
  .area-title {
    font-size: 3rem;
  }
  
  .instruction-title {
    font-size: 3rem;
  }
  
  .instruction-text {
    font-size: 2rem;
  }
  
  .step-number {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }
  
  .step-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 768px) {
  .instruction-steps {
    flex-direction: column;
  }
  
  .step {
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
  }
  
  .step-text {
    text-align: left;
    flex: 1;
  }
}

.step {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInStep 0.6s ease forwards;
}

.step:nth-child(1) {
  animation-delay: 0.2s;
}
.step:nth-child(2) {
  animation-delay: 0.4s;
}
.step:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes fadeInStep {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseQR {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 10px rgba(255, 255, 255, 0.2);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.6);
  }
}

.qr-wrapper {
  animation: pulseQR 2s infinite;
  transition: transform 0.3s ease;
  border-radius: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}
</style>