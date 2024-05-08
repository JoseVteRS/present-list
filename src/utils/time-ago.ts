import TimeAgo from "javascript-time-ago"
import es from "javascript-time-ago/locale/es"

TimeAgo.addDefaultLocale(es)
const timeago = new TimeAgo('es-ES')


export const timeAgo = (date: Date) => {
  if (!(date instanceof Date)) {
    return ["`date` must be an instance of `Date`", null]
  }
  const time = timeago.format(new Date(date).getTime(), 'mini-now')
  return [null, time]
}