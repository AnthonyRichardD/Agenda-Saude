<script setup lang="ts"></script>

<template>
  <div
    class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-3.5 space-y-2.5"
  >
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <LucideMapPin :size="24" color="#115E59" />
        <span class="text-[#042F2E] text-[16px] font-medium"> Casa </span>

        <div
          class="flex items-center gap-1 bg-[#99F6E480] rounded-[60px] px-2 py-0.5 font-medium text-[#115E59]"
        >
          <LucideStar :size="12" />
          <span class="text-[10px]">Principal</span>
        </div>
      </div>

      <div class="flex items-center justify-center gap-3">
        <LucideSquarePen
          @click="console.log('editar')"
          class="cursor-pointer"
          :size="19"
          :stroke-width="2.5"
          color="#042F2E"
        />
        <LucideTrash2
          class="cursor-pointer"
          :size="19"
          :stroke-width="2"
          color="#B91C1C"
        />
      </div>
    </div>

    <div class="w-full gap-1.5">
      <p class="text-[#3F3F46B2] text-[13px] font-normal">Av. Paulista, 1234</p>
      <p class="text-[#3F3F46B2] text-[13px] font-normal">Centro - Recife/PE</p>
      <p class="text-[#3F3F46B2] text-[13px] font-normal">CEP: 91234-567</p>
    </div>

    <button
      class="flex justify-center items-center gap-2 border-2 border-[#99F6E4] rounded-[10px] py-1 px-2"
    >
      <LucideStar :size="14" />
      <span class="text-[13px] font-medium text-[#115E59]">
        Definir como Principal
      </span>
    </button>
  </div>
</template>
