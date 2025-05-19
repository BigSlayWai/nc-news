import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow mb-8 p-4 flex justify-between items-center sticky top-0 z-50">
      <div className="text-xl font-bold text-gray-900 dark:text-white">NC News</div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline text-gray-700 dark:text-gray-200">Home</Link>
        <Link to="/topics" className="hover:underline text-gray-700 dark:text-gray-200">Topics</Link>
        <Link to="/users" className="hover:underline text-gray-700 dark:text-gray-200">Users</Link>
      </div>
    </nav>
  )
}

export default Navbar