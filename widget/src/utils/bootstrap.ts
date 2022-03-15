
// No ts, quando vamos tipar as funções, tipamos como interfaces
interface SetupPayload {
  onProduction: () => void,
  onDevelopment: () => void,
}

// Em dev, renderiza o componente Playground para visualização do widget
// Em produção renderiza o componente principal App.vue
export function setup ({ onProduction, onDevelopment }: SetupPayload): void {
  if (process.env.NODE_ENV !== 'production') {
    onDevelopment()
    return
  }

  onProduction()
}
