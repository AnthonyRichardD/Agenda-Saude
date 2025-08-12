export const useSchedulingStore = defineStore('scheduling', () => {
  interface ISlot {
    slot_id: number
    start_time: string
    end_time: string
  }

  interface IProfessional {
    label: string
    value: string
    description: string
  }
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

  const formData = reactive<{
    service: string
    doctor: string
    date: string
    slot: ISlot
  }>({
    service: '',
    doctor: '',
    date: '',
    slot: undefined,
  })

  const availableDates = ref([])

  const services = ref<{ label: string; value: string }[]>([])

  const doctors = ref<IProfessional[]>([])

  const slots = ref<ISlot[]>([])

  return {
    step,
    formData,
    services,
    doctors,
    slots,
    availableDates,
    nextStep,
    prevStep,
  }
})
