export const useAlertStore = defineStore('alert', () => {
  const isOpen = ref(false)
  const title = ref('Atenção!')
  const message = ref('')

  function showAlert(alertTitle: string, alertMessage: string) {
    title.value = alertTitle
    message.value = alertMessage
    isOpen.value = true
  }

  function hideAlert() {
    isOpen.value = false
  }

  return {
    isOpen,
    title,
    message,
    showAlert,
    hideAlert,
  }
})
