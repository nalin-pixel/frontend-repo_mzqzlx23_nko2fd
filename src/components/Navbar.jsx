import { Link, NavLink } from 'react-router-dom'

export default function Navbar({ cartCount = 0 }) {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">ShopEZ</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/shop" className={navLinkClass}>Store</NavLink>
            <NavLink to="/blogs" className={navLinkClass}>Blogs</NavLink>
            <NavLink to="/consultation" className={navLinkClass}>Dr Consultation</NavLink>
          </nav>
          <div className="flex items-center gap-3">
            <NavLink to="/cart" className={({isActive}) => `relative px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-blue-50'}`}>
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full grid place-items-center">
                  {cartCount}
                </span>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  )
}
