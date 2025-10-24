<template>
  <div class="pregunta-container">
    <h2 class="question-title">{{ question.question }}</h2>
    <ul class="options-list">
      <li v-for="(option, index) in question.options" :key="index">
        <button 
          :class="['option-button', 
                  answered && index === selectedIndex ? (
                    index === question.correctIndex ? 'correct' : 'incorrect'
                  ) : '']"
          @click="seleccionar(index)"
          :disabled="answered"
        >
          {{ option }}
        </button>
      </li>
    </ul>
    <div v-if="answered" class="feedback">
      {{ selectedIndex === question.correctIndex ? '¡Correcto!' : 'Incorrecto. Intenta de nuevo.' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { Question } from '../../interfaces/interfaces';

const props = defineProps<{ question: Question }>()
const emits = defineEmits<{ (e: 'answered', answerIndex: number): void }>()

const answered = ref(false)
const selectedIndex = ref(-1)

function seleccionar(index: number) {
  if (answered.value) return
  selectedIndex.value = index
  answered.value = true
  emits('answered', index)
  // Show feedback for 2 seconds, then clear question
  setTimeout(() => {
    answered.value = false
    selectedIndex.value = -1
    emits('answered', -1) // signal to parent to clear question
  }, 2000)
}
</script>

<style scoped>
.pregunta-container {
  background: white;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 430px;
  width: 100%;
}

.question-title {
  color: #2c3e50;
  font-size: clamp(1.2rem, 2.5vw, 1.8rem);
  margin-bottom: clamp(1rem, 2vw, 1.5rem);
  text-align: center;
  line-height: 1.4;
}

.options-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.8rem, 1.5vw, 1.2rem);
}

.option-button {
  width: 100%;
  padding: clamp(0.8rem, 1.5vw, 1.2rem);
  border: clamp(1px, 0.3vw, 2px) solid #e0e0e0;
  border-radius: 0.5rem;
  background: white;
  font-size: clamp(0.9rem, 1.8vw, 1.2rem);
  cursor: pointer;
  transition: all 0.3s ease;
  line-height: 1.4;
  text-align: left;
}

.option-button:hover:not(:disabled) {
  background: #f5f5f5;
  transform: translateY(-2px);
}

.option-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.option-button.correct {
  background: #4caf50;
  color: white;
  border-color: #45a049;
}

.option-button.incorrect {
  background: #f44336;
  color: white;
  border-color: #da190b;
}

.feedback {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: bold;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
