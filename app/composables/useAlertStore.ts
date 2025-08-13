export type AlertStatus = 'success' | 'error' | 'default'

export const useAlertStore = defineStore('alert', () => {
  const isOpen = ref(false)
  const title = ref('Atenção!')
  const message = ref('')
  const type = ref<AlertStatus>('default')

  function showAlert(
    alertTitle: string,
    alertMessage: string,
    alertType: AlertStatus = 'default'
  ) {
    title.value = alertTitle
    message.value = alertMessage
    isOpen.value = true
    type.value = alertType
  }

  function hideAlert() {
    isOpen.value = false
  }

  return {
    isOpen,
    title,
    message,
    type,
    showAlert,
    hideAlert,
  }
})
