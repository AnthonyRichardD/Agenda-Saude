<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})
</script>

<template>
  <div class="w-full bg-[#EAFDF9] min-h-full p-[20px]">
    <UIHeaderBack title="Meus Perfil" link="/home" />
    <PerfilFormDados />
  </div>
</template>
