export default function ProductCard({ item, onAdd }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition overflow-hidden">
      <img src={item.image} alt={item.title} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-blue-600">₹{item.price}</span>
          <button onClick={() => onAdd(item)} className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700">Add</button>
        </div>
      </div>
    </div>
  )
}
