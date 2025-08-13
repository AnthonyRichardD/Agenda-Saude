<script setup lang="ts"></script>

<template>
  <div class="w-full bg-[#EAFDF9] min-h-full p-[20px]">
    <UIHeaderBack title="Meus Enderecos" link="/home">
      <button
        @click="navigateTo('/enderecos/novo')"
        type="button"
        class="flex items-center gap-2 bg-[#0D9488] text-white font-bold text-[18px] py-1 px-2 rounded-[10px]"
      >
        <LucidePlus :size="24" stroke-width="2" />
        Adicionar
      </button>
    </UIHeaderBack>

    <div class="w-full flex flex-col items-center justify-center">
      <EnderecoCard />
    </div>
  </div>
</template>
