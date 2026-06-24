import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client = null

const isValidUrl = (str) => {
  try {
    return str && (str.startsWith('http://') || str.startsWith('https://'))
  } catch {
    return false
  }
}

const isPlaceholder = (str) => {
  if (!str) return true
  const lower = str.toLowerCase()
  return (
    lower.includes('your_new') || 
    lower.includes('placeholder') || 
    lower.includes('your_supabase') ||
    lower.includes('anon_key')
  )
}

if (isValidUrl(url) && !isPlaceholder(anonKey)) {
  try {
    client = createClient(url, anonKey)
  } catch (e) {
    console.error('Failed to initialize Supabase client:', e)
  }
}

if (!client) {
  console.warn('⚠️ Supabase credentials are empty or placeholders. Using mock client for preview.')
  
  // Resilient mock chainable database proxy to support local preview without a database
  const mockPromise = {
    select: () => mockPromise,
    insert: () => mockPromise,
    update: () => mockPromise,
    delete: () => mockPromise,
    order: () => mockPromise,
    limit: () => mockPromise,
    eq: () => mockPromise,
    gte: () => mockPromise,
    single: () => Promise.resolve({ data: null, error: null }),
    then: (resolve) => resolve({ data: [], error: null, count: 0 })
  }

  client = {
    from: () => mockPromise,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
    }
  }
}

export const supabase = client
