export const useLoadingStore = defineStore('loading', () => {
  const loading = ref(false)

  return { loading }
})
