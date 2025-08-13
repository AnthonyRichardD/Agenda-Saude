export const useNavStore = defineStore('nav', () => {
  const disabledRoutes = ref([
    '/inicio',
    '/login',
    '/cadastro',
    '/recuperar-senha',
    '/recuperar-senha-code',
    '/recuperar-senha-nova',
  ])

  return { disabledRoutes }
})
