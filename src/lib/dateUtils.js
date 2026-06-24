export function getTodayIST() {
  return new Date().toLocaleDateString('en-CA', {
    timeZone: 'Asia/Kolkata'
  })
}

export function getWeekRange(offsetWeeks = 0) {
  const now = new Date()
  const day = now.getDay()
  const diff = now.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(now.setDate(diff + offsetWeeks * 7))
  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)

  const fmt = d => d.toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short'
  })

  return {
    start: monday.toISOString().split('T')[0],
    end: sunday.toISOString().split('T')[0],
    label: `${fmt(monday)} – ${fmt(sunday)}`
  }
}

export function formatRelativeDate(dateStr) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diff = Math.floor((now - date) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Yesterday'
  if (diff < 7) return `${diff}d ago`
  return date.toLocaleDateString('en-IN', { 
    day: '2-digit', month: 'short' 
  })
}
