<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const auth = useAuthStore()
const user = ref(auth.getUser())
</script>

<template>
  <div class="w-full bg-[#EAFDF9] min-h-full p-[20px]">
    <UIHeaderBack title="Meus Perfil" link="/home" />
    <div class="w-full flex flex-col items-center justify-center">
      <PerfilPhoto />
      <h1 class="text-[#042F2E] text-[20px] font-medium">
        {{ user?.full_name }}
      </h1>
      <p class="text-[#3F3F46CC] text-[14px] font-medium mb-4">
        {{ formatCpf(user?.cpf) }}
      </p>
    </div>

    <PerfilFormDados />
  </div>
</template>
