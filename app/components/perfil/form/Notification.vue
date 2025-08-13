<script setup lang="ts">
const emailNotificationsEnabled = ref(true)

async function updateNotificationSettings(newValue: boolean) {
  try {
    console.log('Requisição enviada com sucesso! Email')
  } catch (error) {
    console.error('Falha ao atualizar configuração:', error)
    emailNotificationsEnabled.value = !newValue
  }
}

watch(emailNotificationsEnabled, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    updateNotificationSettings(newValue)
  }
})

const smsNotificationsEnabled = ref(false)

async function updateSmsNotificationSettings(newValue: boolean) {
  try {
    console.log('Requisição enviada com sucesso! SMS')
  } catch (error) {
    console.error('Falha ao atualizar configuração:', error)
    smsNotificationsEnabled.value = !newValue
  }
}

watch(smsNotificationsEnabled, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    updateSmsNotificationSettings(newValue)
  }
})

const pushNotificationsEnabled = ref(false)

async function updatePushNotificationSettings(newValue: boolean) {
  try {
    console.log('Requisição enviada com sucesso! Push Notification')
  } catch (error) {
    console.error('Falha ao atualizar configuração:', error)
    pushNotificationsEnabled.value = !newValue
  }
}

watch(pushNotificationsEnabled, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    updatePushNotificationSettings(newValue)
  }
})
</script>

<template>
  <div
    class="w-full bg-[#FCFFFE] rounded-[15px] border-2 border-[#CCFBF1] p-[20px] space-y-6"
  >
    <div class="w-full flex justify-between items-center mb-8">
      <h1 class="text-[#134E4A] text-[18px] font-semibold">
        Configurações de Notificação
      </h1>
      <LucideBell color="#042F2E" :size="16" :stroke-width="2" />
    </div>

    <SettingsToggle
      title="Notificações por Email"
      description="Receber lembretes sobre suas consultas"
      v-model="emailNotificationsEnabled"
    />

    <hr class="border-[#99F6E4]" />

    <SettingsToggle
      title="Notificações por SMS"
      description="Receber lembretes por sms"
      v-model="smsNotificationsEnabled"
    />

    <hr class="border-[#99F6E4]" />

    <SettingsToggle
      title="Lembretes de Consulta"
      description="Receber lembretes antes das colsultas   "
      v-model="pushNotificationsEnabled"
    />
  </div>
</template>
