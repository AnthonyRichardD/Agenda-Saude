<script setup lang="ts">
import IconLogo from '~/assets/icons/logo.svg?component'
</script>

<template>
  <div
    class="flex flex-col justify-between h-full items-center w-full min-h-dvh bg-[#EAFDF9] p-[20px] py-8"
  >
    <div class="flex flex-col items-center mt-[100px]">
      <div
        class="bg-[white] rounded-[30px] w-[142px] h-[142px] flex items-center justify-center shadow-2xl shadow-[#CCFBF1]"
      >
        <IconLogo class="mr-[-3px]" width="110px" />
      </div>
      <h1 class="text-[#042F2E] font-semibold text-[40px]">Agenda Saúde</h1>
      <p class="text-[#0F766E] text-[17px] font-medium text-center">
        Cuidando da sua saúde com praticidade
      </p>
    </div>

    <div class="flex flex-col gap-4 w-full pr-4">
      <NuxtLink to="/login">
        <button
          class="bg-[#134E4A] text-white font-extrabold text-[16px] w-full h-[50px] active:scale-95 rounded-[15px] transition-colors duration-150 ease-in-out"
        >
          Entrar
        </button>
      </NuxtLink>
      <NuxtLink to="/cadastro">
        <button
          class="bg-[#CCFBF1] text-[#0F766E] border-2 border-[#134E4A] font-extrabold text-[16px] w-full h-[50px] active:scale-95 rounded-[15px] transition-colors duration-150 ease-in-out"
        >
          Criar Conta
        </button>
      </NuxtLink>
      <div class="mt-7">
        <p class="text-[#115E59] text-[15px] font-medium text-center">
          Ao continuar, você concorda com nossos
          <NuxtLink class="font-bold underline">Termos de Uso</NuxtLink>
          e
          <NuxtLink class="font-bold underline"
            >Política de Privacidade</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>
