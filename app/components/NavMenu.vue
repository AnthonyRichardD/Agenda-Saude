<script setup lang="ts">
import { Home, Bell, Calendar, User } from 'lucide-vue-next'
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 right-0 z-50 max-w-md mx-auto bg-[#CCFBF1] border-t border-gray-200"
  >
    <div class="flex justify-around items-center h-[60px]">
      <div class="flex-1 h-full">
        <NuxtLink
          class="flex flex-col justify-center items-center h-full w-full text-[#0F766E] hover:text-[#115E59] active:text-[#0D4F47] hover:bg-[#99f6e4] active:bg-[#5eead4] transition-all duration-200"
        >
          <Home :size="20" />
          <span class="text-xs">Início</span>
        </NuxtLink>
      </div>

      <div class="flex-1 h-full">
        <NuxtLink
          to="/consultas"
          class="flex flex-col justify-center items-center h-full w-full text-[#0F766E] hover:text-[#115E59] active:text-[#0D4F47] hover:bg-[#99f6e4] active:bg-[#5eead4] transition-all duration-200"
        >
          <Calendar :size="20" />
          <span class="text-xs">Consultas</span>
        </NuxtLink>
      </div>

      <div class="flex-1 h-full">
        <NuxtLink
          class="flex flex-col justify-center items-center h-full w-full text-[#0F766E] hover:text-[#115E59] active:text-[#0D4F47] hover:bg-[#99f6e4] active:bg-[#5eead4] transition-all duration-200"
        >
          <Bell :size="20" />
          <span class="text-xs">Notificações</span>
        </NuxtLink>
      </div>

      <div class="flex-1 h-full">
        <NuxtLink
          to="/perfil"
          class="flex flex-col justify-center items-center h-full w-full text-[#0F766E] hover:text-[#115E59] active:text-[#0D4F47] hover:bg-[#99f6e4] active:bg-[#5eead4] transition-all duration-200"
        >
          <User :size="20" />
          <span class="text-xs">Perfil</span>
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>
