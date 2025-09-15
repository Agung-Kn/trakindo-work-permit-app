import dayjs from "dayjs"
import "dayjs/locale/id"

export function formatDate(dateStr) {
  return dayjs(dateStr).locale("id").format("DD MMM YYYY")
}

export function formatSemiFullDate(dateStr) {
  return dayjs(dateStr).locale("id").format("DD MMM YY")
}

export function formatFullDate(dateStr) {
  return dayjs(dateStr).locale("id").format("DD MMMM YYYY")
}

export function calculateDuration(startDate, endDate) {
  return dayjs(endDate).diff(startDate, "day") + 1
}
