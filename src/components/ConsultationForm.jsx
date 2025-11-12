import { useState } from 'react'

export default function ConsultationForm() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [form, setForm] = useState({ name: '', email: '', phone: '', doctor: 'General Physician', date: '', time: '', notes: '' })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/consultations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setResult({ error: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Book a Doctor Consultation</h2>
      <form onSubmit={submit} className="bg-white p-4 rounded-lg shadow-sm border space-y-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="border rounded p-2" placeholder="Name" value={form.name} onChange={e=>setForm({ ...form, name: e.target.value })} required />
          <input className="border rounded p-2" placeholder="Email" value={form.email} onChange={e=>setForm({ ...form, email: e.target.value })} required />
          <input className="border rounded p-2" placeholder="Phone" value={form.phone} onChange={e=>setForm({ ...form, phone: e.target.value })} />
          <select className="border rounded p-2" value={form.doctor} onChange={e=>setForm({ ...form, doctor: e.target.value })}>
            <option>General Physician</option>
            <option>Dermatologist</option>
            <option>Cardiologist</option>
          </select>
          <input type="date" className="border rounded p-2" value={form.date} onChange={e=>setForm({ ...form, date: e.target.value })} required />
          <input type="time" className="border rounded p-2" value={form.time} onChange={e=>setForm({ ...form, time: e.target.value })} required />
        </div>
        <textarea className="border rounded p-2 w-full" rows="3" placeholder="Notes (optional)" value={form.notes} onChange={e=>setForm({ ...form, notes: e.target.value })}></textarea>
        <button disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">{loading ? 'Booking...' : 'Book Consultation'}</button>
      </form>
      {result && (
        <div className="mt-4 bg-green-50 border border-green-200 text-green-700 p-3 rounded">
          {result.error ? `Error: ${result.error}` : `Booked! Reference: ${result.id}`}
        </div>
      )}
    </div>
  )
}
