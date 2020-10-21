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

export type TimeDifference = {
  days: number
  months: number
  years: number
}

/**
 * Calculates the difference of two Moments as `{days, months, years}`
 */
export const calculateTimeDifference = (
  now: moment.Moment,
  then: moment.Moment
): TimeDifference => {
  const diff = moment.duration(now.diff(moment(then)))
  return { days: diff.days(), months: diff.months(), years: diff.years() }
}

/**
 * Returns a string timestamp like `\d+ (years|months|days) ago`
 */
export const createTimestamp = ({ days, months, years }: TimeDifference) => {
  if (years > 0) {
    return `${years} years ago`
  }
  if (months > 0) {
    return `${months} months ago`
  }
  if (days > 0) {
    return `${days} days ago`
  }
  return 'Today'
}
