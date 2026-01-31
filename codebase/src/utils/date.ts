export const toDateKey = (value: Date) => value.toISOString().split('T')[0]

export const parseDateKey = (value: string) => new Date(`${value}T00:00:00`)

export const isSameDay = (a: Date, b: Date) => toDateKey(a) === toDateKey(b)

export const startOfWeek = (date: Date) => {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1)
  return new Date(date.getFullYear(), date.getMonth(), diff)
}

export const endOfWeek = (date: Date) => {
  const start = startOfWeek(date)
  return new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6)
}

export const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)

export const endOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0)

export const startOfYear = (date: Date) => new Date(date.getFullYear(), 0, 1)

export const endOfYear = (date: Date) => new Date(date.getFullYear(), 11, 31)

export const isWithinRange = (date: Date, start: Date, end: Date) => {
  const time = date.getTime()
  return time >= start.getTime() && time <= end.getTime()
}

export const formatShortDate = (value: string) => {
  const date = parseDateKey(value)
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

export const formatFullDate = (value: string) => {
  const date = parseDateKey(value)
  return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
}

export const getMonthMatrix = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1)
  const startDay = startOfWeek(firstDay)
  const weeks: Date[][] = []
  let current = new Date(startDay)

  for (let week = 0; week < 6; week += 1) {
    const days: Date[] = []
    for (let day = 0; day < 7; day += 1) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    weeks.push(days)
  }

  return weeks
}
