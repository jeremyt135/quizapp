export const dateToLongLocaleString = (date: Date | string) => {
  let dateToFormat: Date
  if (typeof date === 'string') {
    dateToFormat = new Date(date)
  } else {
    dateToFormat = date
  }

  return dateToFormat.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
