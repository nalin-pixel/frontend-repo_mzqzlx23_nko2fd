import { useMemo } from 'react'

export default function Cart({ cart, onInc, onDec, onRemove, onCheckout }) {
  const { subtotal, tax, shipping, total } = useMemo(() => {
    const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const tax = +(subtotal * 0.18).toFixed(2)
    const shipping = subtotal < 999 && subtotal > 0 ? 49 : 0
    const total = +(subtotal + tax + shipping).toFixed(2)
    return { subtotal, tax, shipping, total }
  }, [cart])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-600">Cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm border">
                <img src={item.image} alt={item.title} className="w-20 h-20 rounded object-cover" />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => onDec(item.id)} className="px-2 py-1 bg-gray-100 rounded">-</button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button onClick={() => onInc(item.id)} className="px-2 py-1 bg-gray-100 rounded">+</button>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-red-600 text-sm">Remove</button>
              </div>
            ))}
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border h-fit">
            <h3 className="font-semibold mb-2">Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Tax (18%)</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="flex justify-between"><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
              <div className="flex justify-between font-bold text-blue-600"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            </div>
            <button onClick={() => onCheckout({ subtotal, tax, shipping, total })} className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">Checkout</button>
          </div>
        </div>
      )}
    </div>
  )
}
