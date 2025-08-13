<script setup>
const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mb-8 mt-4 flex items-center justify-between">
    <button
      type="button"
      @click="navigateTo(props.link)"
      class="flex items-center justify-start gap-4 cursor-pointer"
    >
      <LucideArrowLeft class="text-[#0D9488]" :size="20" />
      <h1 class="text-[#042F2E] font-bold text-[20px]">{{ props.title }}</h1>
    </button>

    <slot />
  </div>
</template>
