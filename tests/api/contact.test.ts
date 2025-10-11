import { describe, it, expect } from 'vitest'
import { POST } from '../../app/api/contact/route'

// Helper to call the handler with a JSON body
function makeRequest(body: unknown) {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('/api/contact', () => {
  it('returns 200 for valid payload', async () => {
    const req = makeRequest({ name: 'Test', email: 'test@example.com', message: 'Hola' })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
  })

  it('returns 400 for invalid payload', async () => {
    const req = makeRequest({ name: '', email: 'not-an-email', message: '' })
    const res = await POST(req)
    expect(res.status).toBe(400)
    const json = await res.json()
    expect(json.error).toBeDefined()
  })
})
