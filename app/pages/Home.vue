<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
    const count = ref(0)
</script>

<template>
    <h1 class="text-[2px]">Home</h1>
    <p>Home page</p>
    <button @click="count++">count is: {{ count }}</button>

    <div>
    <UButton label="Botão de Teste" />

    <div class="p-8 mt-4 text-white bg-red-500 rounded-lg">
      Este bloco deveria ter um fundo vermelho.
    </div>
  </div>

</template>