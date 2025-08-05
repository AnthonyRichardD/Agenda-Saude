<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
const count = ref(0)
</script>

<template>
  <p>Home pageas</p>
  <button @click="count++">count is: {{ count }}</button>

  <div>
    <UButton label="Botão de Teste" />

    <div class="p-8 mt-4 text-white bg-red-500 rounded-lg">
      Este bloco deveria ter um fundo vermelhawo.
    </div>
  </div>
</template>
