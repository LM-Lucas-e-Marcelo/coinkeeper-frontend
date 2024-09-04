export function generateLabel(value: string) {
  return (
    '<div class="p-2 flex gap-2">' +
    '<strong>' +
    'Recebidos:' +
    '</strong>' +
    '<strong>' +
    value +
    '</strong>' +
    '</div>'
  )
}
