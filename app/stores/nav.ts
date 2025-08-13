export const useNavStore = defineStore('nav', () => {
  const disabledRoutes = ref([
    '/login',
    '/cadastro',
    '/recuperar-senha',
    '/recuperar-senha-code',
    '/recuperar-senha-nova',
  ])

  return { disabledRoutes }
})
