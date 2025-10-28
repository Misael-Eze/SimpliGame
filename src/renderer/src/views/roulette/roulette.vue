<template>
  <div class="wheel-wrap">
    <div class="pointer"></div>

    <!-- Mensaje de toque para girar -->
    <div class="touch-hint" v-if="!hasSpun">
      Toca la ruleta para que gire
    </div>

    <!-- Ruleta giratoria (colores + iconos dentro de cada sector) -->
    <div
      class="ruleta"
      :style="{ transform: `rotate(${rotation}deg)`, background: gradient }"
      @click="girar"
      @transitionend="onTransitionEnd"
    >
      <div
        v-for="(area, i) in areas"
        :key="i"
        class="label"
        :style="labelStyle(i)"
      >
        <img v-if="getIcon(area)" :src="getIcon(area) || undefined" class="sector-icon" :alt="getAreaName(area)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref, onMounted, onUnmounted } from 'vue'

type AreaInput = string | { name: string; icon?: string }
const props = defineProps<{ areas: AreaInput[], autoSpin?: boolean }>()
const emits = defineEmits<{ (e: 'selected', index: number): void }>()

const rotation = ref(0)
const spinning = ref(false)
const hasSpun = ref(false)

// Importa automáticamente todos los SVG del directorio de assets
const iconModules = import.meta.glob('../../assets/*.svg', { eager: true, import: 'default' })

// Genera un mapa { nombreSinExtension: ruta }
const iconsByName: Record<string, string> = {}
for (const path in iconModules) {
  const fileName = path.split('/').pop()?.replace('.svg', '') || ''
  iconsByName[fileName.toLowerCase()] = iconModules[path] as string
}

// Función auxiliar
function normalizeName(name: string): string {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\s+/g, '')
}

function getAreaName(area: AreaInput) {
  return typeof area === 'string' ? area : area.name
}

// Nuevo getIcon
function getIcon(area: AreaInput): string | null {
  const name = normalizeName(getAreaName(area))
  return iconsByName[name] || null
}


// Escuchar evento de auto-giro
onMounted(() => {
  console.log('🎰 Ruleta lista para auto-giro')
  try {
    window.addEventListener('auto-spin', () => {
      console.log('🎯 Evento auto-spin recibido en ruleta')
      girar()
    })
  } catch (err) {
    console.error('❌ Error al configurar auto-spin:', err)
  }
})

onUnmounted(() => {
  try {
    window.removeEventListener('auto-spin', girar)
  } catch (err) {
    console.error('❌ Error al limpiar auto-spin:', err)
  }
})

const angle = computed(() => (props.areas.length ? 360 / props.areas.length : 360))

const colors = [
  '#f94144',
  '#f3722c',
  '#f9c74f',
  '#90be6d',
  '#43aa8b',
  '#577590',
]

const gradient = computed(() => {
  if (!props.areas.length) return ''
  const stops = props.areas.map((_, i) => {
    const from = i * angle.value
    const to = (i + 1) * angle.value
    const color = colors[i % colors.length]
    return `${color} ${from}deg ${to}deg`
  })
  return `conic-gradient(${stops.join(', ')})`
})

function labelStyle(i: number) {
  const mid = angle.value * i + angle.value / 2
  // place icon outward from center and let it rotate with the wheel
  return {
    transform: `rotate(${mid}deg) translateY(-130px)`,
  }
}

function girar() {
  if (spinning.value) {
    console.log('⏳ Ruleta ya está girando')
    return
  }
  
  // Marcar que ya ha girado para ocultar el hint
  hasSpun.value = true
  
  console.log('🎰 Iniciando giro de ruleta')
  spinning.value = true
  
  // Generar un giro aleatorio entre 5-7 vueltas completas
  const vueltas = 5 + Math.floor(Math.random() * 3)
  const randomSpin = 360 * vueltas + Math.floor(Math.random() * 360)
  
  console.log(`🎲 Girando ${vueltas} vueltas (${randomSpin}°)`)
  rotation.value += randomSpin
}

function onTransitionEnd() {
  // Solo procesar si estábamos girando
  if (!spinning.value) return
  
  try {
    const normalized = ((rotation.value % 360) + 360) % 360
    const idx = Math.floor(((360 - normalized) % 360) / angle.value)
    console.log('🎯 Ruleta detenida en:', props.areas[idx])
    
    spinning.value = false
    emits('selected', idx)
  } catch (err) {
    console.error('❌ Error al procesar fin de giro:', err)
    spinning.value = false
  }
}

</script>

<style scoped>
.wheel-wrap {
  position: relative;
  width: min(90vw, 500px);
  height: min(90vw, 500px);
}

@media (min-width: 1600px) {
  .wheel-wrap {
    width: 700px;
    height: 700px;
  }
}

@media (max-width: 768px) {
  .wheel-wrap {
    width: min(85vw, 400px);
    height: min(85vw, 400px);
  }
}

.ruleta {
  left: -31%;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  /* border: clamp(3px, 0.8vw, 6px) solid #333; */
  position: absolute;
  transition: transform 4s cubic-bezier(0.25, 0.1, 0.25, 1);
  cursor: pointer;
  user-select: none;
  box-sizing: border-box;
  background-color: #fff;
  z-index: 1;
}

/* labels-overlay removed: icons are now inside the rotating .ruleta */

.pointer {
  position: absolute;
  top: clamp(-10px, -2.5vw, -25px);
  left: 41.7%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: clamp(15px, 2vw, 25px) solid transparent;
  border-right: clamp(15px, 2vw, 25px) solid transparent;
  border-bottom: clamp(20px, 3vw, 35px) solid #222;
  filter: drop-shadow(0 4px 4px rgba(0,0,0,0.2));
  z-index: 5;
  rotate: 180deg;
}

.label {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: 0 0;
  pointer-events: none;
  width: 0;
  height: 0;
}

.sector-icon {
  display: block;
  width: clamp(44px, 6vw, 72px);
  height: clamp(44px, 6vw, 72px);
  object-fit: contain;
  filter: drop-shadow(0 6px 10px rgba(0,0,0,0.32));
  transform: translate(-50%, -200%);
  /* allow icons to rotate with the wheel; no counter-rotation */
}

@media (max-width: 480px) {
  .sector-icon {
    width: clamp(30px, 12vw, 44px);
    height: clamp(30px, 12vw, 44px);
  }
}

@media (min-width: 1600px) {
  .sector-icon {
    width: 96px;
    height: 96px;
  }
}

.touch-hint {
  position: absolute;
  top: 180%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  padding: 12px 24px;
  border-radius: 20px;
  font-size: clamp(16px, 2.5vw, 24px);
  z-index: 2;
  pointer-events: none;
  animation: fadeInOut 1.5s ease-in-out infinite;
  white-space: nowrap;
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}
</style>
