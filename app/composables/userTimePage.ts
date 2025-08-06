export const useTimerPage = () => {
  const timerStart = useCookie<number | null>('timerStart', {
    default: () => null,
    maxAge: 3600 
  })

  const remainingTime = ref(0)

  const updateRemainingTime = () => {
    if (!timerStart.value) {
      remainingTime.value = 0
      return
    }
    
    const elapsedSeconds = Math.floor((Date.now() - timerStart.value) / 1000)
    remainingTime.value = Math.max(0, 300 - elapsedSeconds) 
  }

  const startTimer = () => {
    timerStart.value = Date.now()
    remainingTime.value = 300
  }

//   const clearTimer = () => {
//     timerStart.value = null
//     remainingTime.value = 0
//   }

  return {
    remainingTime,
    startTimer,
    // clearTimer,
    updateRemainingTime
  }
}