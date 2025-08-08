export const useSchedulingStore = defineStore('scheduling', () => {
  const step = ref(1)
  const maxStep = ref(4)

  const nextStep = () => {
    if (step.value >= maxStep.value) return
    step.value++
  }

  const prevStep = () => {
    if (step.value <= 1) return
    step.value--
  }

  const formData = reactive({
    service: '',
    doctor: '',
    date: '',
    time: '',
  })

  const services = ref([
    {
      value: '1',
      label: 'Dermatologia',
    },
    {
      value: '2',
      label: 'Cardiologia',
    },
    {
      value: '3',
      label: 'Traumatologia',
    },
    {
      value: '4',
      label: 'Ginecologia',
    },
  ])

  return {
    step,
    services,
    formData,
    nextStep,
    prevStep,
  }
})
