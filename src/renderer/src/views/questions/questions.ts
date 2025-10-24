// import { defineProps, defineEmits, ref } from 'vue'
// import { Question } from '../../interfaces/interfaces';

// const props = defineProps<{ question: Question }>()
// const emits = defineEmits<{ (e: 'answered', answerIndex: number): void }>()

// const answered = ref(false)
// const selectedIndex = ref(-1)

// function seleccionar(index: number) {
//   if (answered.value) return
//   selectedIndex.value = index
//   answered.value = true
//   emits('answered', index)
//   // Show feedback for 2 seconds, then clear question
//   setTimeout(() => {
//     answered.value = false
//     selectedIndex.value = -1
//     emits('answered', -1) // signal to parent to clear question
//   }, 2000)
// }
