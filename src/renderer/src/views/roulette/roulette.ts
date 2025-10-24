// import { computed, defineEmits, defineProps, ref } from 'vue'

// const props = defineProps<{ areas: string[] }>()
// const emits = defineEmits<{ (e: 'selected', index: number): void }>()

// const rotation = ref(0)
// const spinning = ref(false)

// const angle = computed(() => (props.areas.length ? 360 / props.areas.length : 360))

// const colors = [
//   '#f94144',
//   '#f3722c',
//   '#f9c74f',
//   '#90be6d',
//   '#43aa8b',
//   '#577590',
// ]

// const gradient = computed(() => {
//   if (!props.areas.length) return ''
//   const stops = props.areas.map((_, i) => {
//     const from = i * angle.value
//     const to = (i + 1) * angle.value
//     const color = colors[i % colors.length]
//     return `${color} ${from}deg ${to}deg`
//   })
//   return `conic-gradient(${stops.join(', ')})`
// })

// function labelStyle(i: number) {
//   const mid = angle.value * i + angle.value / 2
//   return {
//     transform: `rotate(${mid}deg) translateY(-140px) rotate(${-mid}deg)`,
//   }
// }

// function girar() {
//   if (spinning.value) return
//   spinning.value = true
//   const randomSpin = 360 * 5 + Math.floor(Math.random() * 360)
//   rotation.value += randomSpin
// }

// function onTransitionEnd() {
//   if (!spinning.value) return
//   const normalized = ((rotation.value % 360) + 360) % 360
//   const idx = Math.floor(((360 - normalized) % 360) / angle.value)
//   spinning.value = false
//   emits('selected', idx)
// }

