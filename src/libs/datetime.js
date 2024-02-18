export function formatTime(str) {

  const dateTime = new Date(str);

  const day = String(dateTime.getDate()).padStart(2, '0');
  const month = String(dateTime.getMonth() + 1).padStart(2, '0');
  const year = dateTime.getFullYear().toString().substr(-2);
  const hour = String(dateTime.getHours()).padStart(2, '0');
  const min = String(dateTime.getMinutes()).padStart(2, '0');

  const formatDate = `${day}/${month}/${year} ${hour}:${min}`;

  return formatDate
}