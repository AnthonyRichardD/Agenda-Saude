export const useNavStore = defineStore('nav', () => {
  const navIsActive = ref(true)

  return { navIsActive }
})
