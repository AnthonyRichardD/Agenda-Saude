<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
})
    const count = ref(0)
</script>

<template>
    <h1>Home</h1>
    <p>Home page</p>
    <button @click="count++">count is: {{ count }}</button>

</template>