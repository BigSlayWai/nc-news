import { useState, useEffect } from 'react'
import axios from 'axios'

function Login({ onLogin }) {
  const [users, setUsers] = useState([])
  const [selected, setSelected] = useState('')

  useEffect(() => {
    axios.get('https://be-nc-news-example-46vu.onrender.com/api/users')
      .then(res => setUsers(res.data.users))
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (selected) onLogin(selected)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-black">Sign In</h2>
        <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
          Select your user:
        </label>
        <select
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          value={selected}
          onChange={e => setSelected(e.target.value)}
        >
          <option value="">-- Choose a user --</option>
          {users.map(user => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-pink-600 text-black rounded hover:bg-pink-700 transition disabled:opacity-50"
          disabled={!selected}
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login