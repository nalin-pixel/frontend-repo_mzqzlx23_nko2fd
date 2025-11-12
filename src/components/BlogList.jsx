import { useEffect, useState } from 'react'

export default function BlogList() {
  const [items, setItems] = useState([])
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    fetch(`${baseUrl}/api/blogs`).then(r => r.json()).then(d => setItems(d.items || []))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Blogs</h2>
      {items.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map(p => (
            <article key={p.id} className="bg-white p-4 rounded-lg shadow-sm border">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-sm text-gray-600">{p.excerpt || p.content?.slice(0,120)}...</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
