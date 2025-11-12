import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import BlogList from './components/BlogList'
import ConsultationForm from './components/ConsultationForm'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Store({ onAdd }) {
  const [items, setItems] = useState([])
  useEffect(() => {
    (async () => {
      const res = await fetch(`${baseUrl}/api/products`)
      const data = await res.json()
      if (!data.items || data.items.length === 0) {
        await fetch(`${baseUrl}/api/products/seed`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ force: true }) })
        const res2 = await fetch(`${baseUrl}/api/products`)
        const data2 = await res2.json()
        setItems(data2.items || [])
      } else {
        setItems(data.items)
      }
    })()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} onAdd={onAdd} />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === item.id)
      if (exists) {
        return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p)
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }
  const inc = (id) => setCart(prev => prev.map(p => p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
  const dec = (id) => setCart(prev => prev.flatMap(p => p.id === id ? (p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : []) : p))
  const removeItem = (id) => setCart(prev => prev.filter(p => p.id !== id))

  const checkout = async ({ total }) => {
    const payload = {
      items: cart.map(({ id, title, price, quantity, image }) => ({ product_id: id, title, price, quantity, image })),
      customer_name: 'Guest',
      customer_email: 'guest@example.com',
      customer_address: 'Address line, City, Country'
    }
    const res = await fetch(`${baseUrl}/api/checkout/create-order`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (data.payment_url) {
      // For mock, just call confirm endpoint
      const confirm = await fetch(`${baseUrl}${data.payment_url}`)
      const cdata = await confirm.json()
      alert(`Payment ${cdata.payment_status}. Order ID: ${cdata.order_id}`)
      if (cdata.payment_status === 'paid') setCart([])
      navigate('/')
    }
  }

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.quantity, 0), [cart])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Store onAdd={addToCart} />} />
        <Route path="/shop" element={<Store onAdd={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onInc={inc} onDec={dec} onRemove={removeItem} onCheckout={checkout} />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/consultation" element={<ConsultationForm />} />
      </Routes>
    </div>
  )
}
