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
    <div class="w-full space-y-[26px]">
      <PerfilFormDados />

      <PerfilFormNotification />

      <div class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1]">
        <button
          class="flex justify-start items-center gap-2 w-full py-2 px-5 cursor-pointer"
          type="button"
        >
          <LucideMapPin :size="24" color="#042F2E" />
          <span class="text-[#042F2E] text-[16px] font-medium">
            Meus Endereços
          </span>
        </button>
        <button
          class="flex justify-start items-center gap-2 border w-full py-2 px-5 cursor-pointer border-y border-x-0 border-[#99F6E4]"
          type="button"
        >
          <LucideUser :size="24" color="#042F2E" />
          <span class="text-[#042F2E] text-[16px] font-medium">
            Alterar Senha
          </span>
        </button>
        <button
          type="button"
          class="flex justify-start items-center gap-2 w-full py-2 px-5 cursor-pointer"
          @click="auth.logout()"
        >
          <LucideLogOut :size="24" color="#B91C1C" />
          <span class="text-[#B91C1C] text-[16px] font-medium">
            Sair da Conta
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
