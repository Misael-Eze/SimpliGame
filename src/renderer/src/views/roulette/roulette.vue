<template>
  <div class="wheel-wrap">
    <div class="pointer"></div>
    <div
      class="ruleta"
      :style="{ transform: `rotate(${rotation}deg)`, background: gradient }
      "
      @click="girar"
      @transitionend="onTransitionEnd"
    >
      <div
        v-for="(area, i) in areas"
        :key="i"
        class="label"
        :style="labelStyle(i)"
      >
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, ref } from 'vue'


const props = defineProps<{ areas: string[] }>()
const emits = defineEmits<{ (e: 'selected', index: number): void }>()

const rotation = ref(0)
const spinning = ref(false)

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
  // place label outward from center
  return {
    transform: `rotate(${mid}deg) translateY(-140px) rotate(${-mid}deg)`,
  }
}

function girar() {
  if (spinning.value) return
  spinning.value = true
  const randomSpin = 360 * 5 + Math.floor(Math.random() * 360)
  rotation.value += randomSpin
}

function onTransitionEnd() {
  // only handle when we were spinning
  if (!spinning.value) return
  const normalized = ((rotation.value % 360) + 360) % 360
  const idx = Math.floor(((360 - normalized) % 360) / angle.value)
  spinning.value = false
  emits('selected', idx)
}

</script>

<style scoped>
.wheel-wrap {
  position: relative;
  width: min(90vw, 500px);
  height: min(90vw, 500px);
  filter: drop-shadow(0 0 10px rgba(0,0,0,0.3));
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
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: clamp(3px, 0.8vw, 6px) solid #333;
  position: relative;
  transition: transform 4s cubic-bezier(0.25, 0.1, 0.25, 1);
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background-color: #fff;
}

.pointer {
  position: absolute;
  top: clamp(-10px, -2.5vw, -25px);
  left: 41.7%;
  transform: translateX(-60%);
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
}

.label-pill {
  display: inline-block;
  font-weight: bold;
  font-size: clamp(1rem, 2.5vw, 1.6rem);
  color: #fff;
  background: rgba(0,0,0,0.45);
  border-radius: 2rem;
  padding: 0.25em 1em;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  white-space: nowrap;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
  letter-spacing: 0.04em;
}

@media (max-width: 480px) {
  .label-pill {
    font-size: 0.9rem;
    padding: 0.15em 0.6em;
  }
}

@media (min-width: 1600px) {
  .label-pill {
    font-size: 2.2rem;
    padding: 0.4em 1.5em;
  }
}
</style>
