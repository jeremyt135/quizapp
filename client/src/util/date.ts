import moment from 'moment'

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

export const isDateInFuture = (date: Date | string) =>
  moment(date).diff(moment()) >= 0

export const isDateInPast = (date: Date | string) =>
  moment(date).diff(moment()) < 0
