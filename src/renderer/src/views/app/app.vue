<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from 'vue'
import App from './app.provider'
import Ruleta from '../roulette/roulette.vue'
import Pregunta from '../questions/questions.vue'
import areas from '../../interfaces/interfaces'
import QrcodeVue from '../qr/qr.vue'
import SettingsVue from '../settings/settings.vue'


const Settings = inject('Settings')
type GameState = 'qr-scan' | 'spinning' | 'question' | 'feedback'

const gameState = ref<GameState>('qr-scan')
const currentAreaIndex = ref<number | null>(null)
const currentQuestionIndex = ref(0)
const showBlurOverlay = ref(false)
const scannerEnabled = ref(true)

// 🎯 SISTEMA DE ESCANEO PROPIO - INDEPENDIENTE
let qrInputBuffer = ''
let qrInputTimeout: any = null

function validateVale(value: string): boolean {
  console.log('🔍 Validando vale:', value)
  
  if (!value || typeof value !== 'string') {
    console.log('❌ Valor inválido')
    return false
  }
  
  const normalized = value.toString().toUpperCase().trim()
  
  // Buscar "VALEPORUNJUEGO" en el texto
  if (normalized.includes('VALEPORUNJUEGO')) {
    console.log('✅ VALE VÁLIDO DETECTADO!')
    return true
  }
  
  // Intentar decodificar si parece hex
  if (/^[0-9a-fA-F]+$/.test(value) && value.length % 2 === 0) {
    try {
      let decoded = ''
      for (let i = 0; i < value.length; i += 2) {
        decoded += String.fromCharCode(parseInt(value.substr(i, 2), 16))
      }
      console.log('🔓 Hex decodificado:', decoded)
      
      if (decoded.toUpperCase().includes('VALEPORUNJUEGO')) {
        console.log('✅ VALE VÁLIDO EN HEX!')
        return true
      }
    } catch (err) {
      console.log('⚠️ Error decodificando hex:', err)
    }
  }
  
  console.log('❌ No es un vale válido')
  return false
}

function handleQrScan(scannedValue: string) {
  console.log('📱 QR ESCANEADO:', scannedValue)
  
  if (!scannerEnabled.value) {
    console.log('⏸️ Escáner deshabilitado')
    return
  }
  
  if (gameState.value !== 'qr-scan') {
    console.log('⏸️ No estamos esperando escaneo')
    return
  }
  
  // Validar si es un vale
  if (validateVale(scannedValue)) {
    console.log('🎮 INICIANDO JUEGO!')
    scannerEnabled.value = false
    startGame()
  } else {
    showMessage('Por favor, escanea el QR del vale de juego')
  }
}

// Capturar entrada de teclado (lector de QR se comporta como teclado)
function handleKeyPress(event: KeyboardEvent) {
  if (!scannerEnabled.value || gameState.value !== 'qr-scan') {
    return
  }
  
  // Enter = fin de escaneo
  if (event.key === 'Enter') {
    if (qrInputBuffer.length > 0) {
      console.log('⌨️ Buffer capturado:', qrInputBuffer)
      handleQrScan(qrInputBuffer)
      qrInputBuffer = ''
    }
    return
  }
  
  // Acumular caracteres
  qrInputBuffer += event.key
  
  // Timeout de seguridad (si pasan 100ms entre teclas, resetear)
  clearTimeout(qrInputTimeout)
  qrInputTimeout = setTimeout(() => {
    if (qrInputBuffer.length > 0) {
      console.log('⏱️ Timeout - procesando buffer:', qrInputBuffer)
      handleQrScan(qrInputBuffer)
      qrInputBuffer = ''
    }
  }, 100)
}

async function startGame() {
  console.log('🚀 INICIANDO JUEGO')
  
  // Verificar stock
  try {
    // const hasStock = await Game.prize.checkStock()
    
    // if (!hasStock) {
    //   console.log('❌ Sin stock de premios')
    //   showMessage('Lo sentimos, este juego ha terminado')
    //   scannerEnabled.value = false
    //   return
    // }
    
    // console.log('✅ Hay stock disponible')
  } catch (error) {
    //console.error('⚠️ Error verificando stock:', error)
    // Continuar de todas formas
  }
  
  gameState.value = 'spinning'
  showBlurOverlay.value = true
  
  // Auto-girar ruleta (con un pequeño delay para la animación del overlay)
  setTimeout(() => {
    console.log('🎰 Disparando auto-giro de ruleta')
    try {
      // const rouletteEvent = new Event('auto-spin')
      // window.dispatchEvent(rouletteEvent)
    } catch (err) {
      console.error('Error al girar ruleta:', err)
    }
  }, 1000) // Aumentado a 1s para dar tiempo al overlay
}

function onSelected(index: number) {
  console.log('✅ Área seleccionada:', areas[index].name)
  currentAreaIndex.value = index
  
  // Randomizar el índice de la pregunta
  const availableQuestions = areas[index].questions.length
  currentQuestionIndex.value = Math.floor(Math.random() * availableQuestions)
  console.log(`Seleccionada pregunta random ${currentQuestionIndex.value + 1} de ${availableQuestions}`)
  
  gameState.value = 'question'
}

function onAnswered(answerIndex: number) {
  console.log('📝 Respuesta recibida:', answerIndex)
  
  if (answerIndex === -1) {
    // Pregunta completada
    resetGame()
  } else {
    // Mostrar feedback
    gameState.value = 'feedback'
  }
}

function resetGame() {
  console.log('🔄 RESETEANDO JUEGO')
  
  gameState.value = 'qr-scan'
  currentAreaIndex.value = null
  currentQuestionIndex.value = 0
  showBlurOverlay.value = false
  scannerEnabled.value = true
  qrInputBuffer = ''
  
  console.log('✅ Listo para nuevo escaneo')
}

function showMessage(text: string) {
  console.log('💬 Mensaje:', text)
  // Si tienes algún componente de mensaje, úsalo aquí
  // Por ahora solo log
  alert(text) // Temporal para testing
}

onMounted(() => {
  console.log('🎬 APP MONTADA')
  console.log('📱 Esperando escaneo de vale...')
  console.log('🔧 Scanner enabled:', scannerEnabled.value)
  console.log('🔧 Game state:', gameState.value)
  
  App.init()
  
  // Listener para capturar entrada del scanner
  window.addEventListener('keypress', handleKeyPress)
  
  // También podemos escuchar eventos personalizados si tu componente QR los emite
  window.addEventListener('qr-scanned', ((event: CustomEvent) => {
    console.log('🎯 Evento qr-scanned recibido:', event.detail)
    handleQrScan(event.detail)
  }) as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('keypress', handleKeyPress)
  window.removeEventListener('qr-scanned', (() => {}) as EventListener)
  clearTimeout(qrInputTimeout)
})

// 🧪 FUNCIÓN DE TESTING - Puedes llamarla desde la consola
// @ts-ignore
window.testVale = () => {
  console.log('🧪 TEST: Simulando escaneo de vale')
  handleQrScan('VALEPORUNJUEGO')
}

// @ts-ignore
window.testInvalid = () => {
  console.log('🧪 TEST: Simulando QR inválido')
  handleQrScan('CODIGO_INVALIDO_12345')
}
</script>

<template>
  <div class="app">
    <!-- Settings Component -->
    <SettingsVue v-if="Settings?.active" />
    
    <!-- Logo arriba a la izquierda -->
    <!-- <div class="logo-top-left" 
      @touchstart="Settings?.startCount()" 
      @mousedown="Settings?.startCount()"
      @touchend="Settings?.endCount()"
      @mouseup="Settings?.endCount()"
    >
      <img src="../../assets/Isotipo en Blanco pleno.png" alt="Logo" />
    </div>  -->

    <!-- Logo centrado abajo -->
    <div class="logo-top-left"
      @touchstart="Settings?.startCount()" 
      @mousedown="Settings?.startCount()"
      @touchend="Settings?.endCount()"
      @mouseup="Settings?.endCount()"
    >
      <img src="../../assets/Logo horitzontal blanco.png" alt="Logo inferior" />
    </div>
    
    <div class="game-container">
      <div class="game-content">
        
        <!-- QR Scanner State -->
        <div v-show="gameState === 'qr-scan'" class="qr-section">
          <div class="instruction-box">
            <h2 class="instruction-title">¡Juga con nosotros! 🎮</h2>
            
            <!-- Indicador de estado -->
            <!-- <div class="scanner-status" :class="{ active: scannerEnabled }">
              <div class="status-dot"></div>
              <span>{{ scannerEnabled ? 'Lector activo' : 'Lector deshabilitado' }}</span>
            </div> -->
            <!-- <div class="step">
                <span class="step-number">1</span>
                <span class="step-text">Escanea este QR</span>
            </div> -->
            
            <div class="step">
                <span class="step-number">1</span>
                <span class="step-text">Escanea este QR</span>
            </div>
            <div class="qr-wrapper">
              <QrcodeVue />
            </div>
            
            <div class="instruction-steps">
              <!-- <div class="step">
                <span class="step-number">1</span>
                <span class="step-text">Escanea este QR</span>
              </div> -->
              <div class="step">
                <span class="step-number">2</span>
                <span class="step-text">Completa el formulario</span>
              </div>
              <div class="step">
                <span class="step-number">3</span>
                <span class="step-text">Mostra el QR en el lector</span>
              </div>  
              <div class="step">
                <span class="step-number">4</span>
                <span class="step-text">Disfruta del juego!</span>
              </div>
            </div>
            
            <!-- Botón de testing (solo visible en desarrollo) -->
              <!-- <button 
              @click="handleQrScan('VALEPORUNJUEGO')" 
              class="test-button"
              v-if="true"
            >
              🎯 Toca  para jugar
            </button>    -->
          </div>
        </div>

        <!-- Blur overlay -->
        <div 
          v-if="showBlurOverlay" 
          class="blur-overlay"
          :class="{ active: gameState !== 'qr-scan' }"
        >
          <!-- Ruleta -->
          <div v-show="gameState === 'spinning'" class="roulette-section">
            <Ruleta 
              :areas="areas" 
              @selected="onSelected"
              :auto-spin="true"
            />
          </div>

          <!-- Preguntas -->
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

.logo-top-left {
  position: fixed;
  top: 2.5%;
  left: 15%;
  transform: translateX(-50%);
  z-index: 200;
  animation: fadeInLogo 1s ease forwards;

  img {
    height: clamp(220px, 12vw, 320px);
    width: auto;
    filter: drop-shadow(0 2px 16px rgba(0, 0, 0, 0.4));
  }
}

.logo-bottom-center {
  position: fixed;
  bottom: 1.5rem;
  left: 33%;
  top: 10%;
  z-index: 150;
  animation: fadeInLogo 1.5s ease forwards;

  img {
    height: clamp(150px, 5vw, 80px);
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
  position: relative;
}

.scanner-status {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 2rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  color: #666;
  
  &.active {
    background: #e8f5e9;
    color: #2e7d32;
    
    .status-dot {
      background: #4caf50;
      animation: pulse 2s infinite;
    }
  }
}

.status-dot {
  width: 10px;
  height: 10px;
  background: #999;
  border-radius: 50%;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.7;
  }
}

.test-button {
  margin-top: 2.5rem;
  padding: 2.5rem 5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 1.2rem;
  font-size: 3rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(102, 126, 234, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.instruction-title {
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  color: #2c3e50;
  margin-bottom: 1rem;
  font-weight: 700;
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
.step:nth-child(4) {
  animation-delay: 0.8s;
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

.qr-wrapper {
  animation: pulseQR 2s infinite;
  transition: transform 0.3s ease;
  border-radius: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  transition: all 0.6s ease;
  opacity: 0;
  pointer-events: none;
  padding: 2rem;

  &.active {
    opacity: 1;
    pointer-events: all;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
  }
}

.roulette-section {
  animation: scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.question-section {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

@keyframes fadeInStep {
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

@media (min-width: 1600px) {
  .area-title {
    font-size: 3rem;
  }
  
  .instruction-title {
    font-size: 3rem;
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
</style>