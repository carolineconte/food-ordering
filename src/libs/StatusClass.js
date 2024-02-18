export function statusClassFunc(status) {
  const statusClass =
    status === 'non-iniziato' ? 'text-red-600' :
      status === 'in-elaborazione' ? 'text-orange-600' :
        'text-green-600';
  return statusClass
}