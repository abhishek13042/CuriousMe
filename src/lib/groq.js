const GROQ_BASE = '/api/groq'

export async function callGroq({
  messages,
  model = 'llama-3.3-70b-versatile',
  max_tokens = 1000,
  temperature = 0.7,
  stream = false
}) {
  try {
    const response = await fetch(
      `${GROQ_BASE}/openai/v1/chat/completions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${
            import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens,
          temperature,
          stream
        })
      }
    )

    if (stream) return response

    const data = await response.json()
    const text = data.choices?.[0]?.message?.content || ''
    return { text, error: null }
  } catch (err) {
    console.error('callGroq error:', err)
    return { text: '', error: err.message }
  }
}

export async function streamGroq({
  messages,
  model = 'llama-3.3-70b-versatile',
  max_tokens = 1000,
  temperature = 0.7,
  onChunk,
  onDone
}) {
  try {
    const response = await callGroq({
      messages, model, max_tokens, temperature, stream: true
    })

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let fullText = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split('\n')
        .filter(l => l.startsWith('data: '))
        .map(l => l.slice(6))
        .filter(l => l !== '[DONE]')

      for (const line of lines) {
        try {
          const data = JSON.parse(line)
          const token = data.choices?.[0]?.delta?.content || ''
          if (token) {
            fullText += token
            onChunk?.(token, fullText)
          }
        } catch {}
      }
    }

    onDone?.(fullText)
    return fullText
  } catch (err) {
    console.error('streamGroq error:', err)
    onDone?.('')
    return ''
  }
}

export const generateText = callGroq
