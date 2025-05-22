import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Topics() {
  const [topics, setTopics] = useState([])

  useEffect(() => {
    axios.get('https://be-nc-news-example-46vu.onrender.com/api/topics')
      .then(res => setTopics(res.data.topics))
  }, [])

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Topics</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {topics.map(topic => (
          <Link
            key={topic.slug}
            to={`/topics/${topic.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg p-6 transition border border-gray-200 dark:border-gray-700 hover:bg-pink-50 dark:hover:bg-pink-900"
          >
            <h2 className="text-xl font-semibold mb-2 text-pink-700 dark:text-pink-300 capitalize">{topic.slug}</h2>
            <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Topics