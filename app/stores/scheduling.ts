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

  interface Slot {
    id: number
    value: string
  }
  const formData = reactive<{
    service: string
    doctor: string
    date: string
    slot: Slot
  }>({
    service: '',
    doctor: '',
    date: '',
    slot: undefined,
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
