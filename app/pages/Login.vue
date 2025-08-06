<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Sucesso!',
    description: 'O formulário foi enviado.',
    color: 'success',
  })
  console.log(event.data)
}
</script>

<template>
  <div class="p-8">
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="Email" name="email" v-slot="{ error }">
        <CustomInput
          v-model="state.email"
          placeholder="seu@email.com"
          :error="!!error"
        />
      </UFormField>

      <UFormField label="Password" name="password" v-slot="{ error }">
        <CustomInput
          v-model="state.password"
          type="password"
          placeholder="Senha"
          :error="!!error"
        />
      </UFormField>

      <UButton type="submit"> Enviar </UButton>
    </UForm>
  </div>
</template>
