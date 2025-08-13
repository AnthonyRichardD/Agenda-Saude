export const formatCpf = (cpf: string | null | undefined): string => {
  if (!cpf) {
    return ''
  }

  // 1. Remove todos os caracteres que não são dígitos
  const numericCpf = cpf.replace(/\D/g, '')

  // 2. Limita a 11 caracteres para evitar entradas maiores que um CPF
  const truncatedCpf = numericCpf.slice(0, 11)

  // 3. Aplica a máscara de forma progressiva
  let formatted = truncatedCpf
  formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2')
  formatted = formatted.replace(/(\d{3})(\d)/, '$1.$2') // Note que esta é a mesma, mas se aplica ao próximo grupo
  formatted = formatted.replace(/(\d{3})(\d{1,2})$/, '$1-$2')

  return formatted
}
