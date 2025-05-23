import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'

function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()
  const [error, setError] = useState(null)

  // Default sort values
  const sort_by = searchParams.get('sort_by') || 'created_at'
  const order = searchParams.get('order') || 'desc'

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios.get('https://be-nc-news-example-46vu.onrender.com/api/articles', {
      params: { sort_by, order }
    })
      .then(res => {
        setArticles(res.data.articles)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load articles. Please try again.')
        setLoading(false)
      })
  }, [sort_by, order])

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>
  }

  const handleSortChange = (e) => {
    setSearchParams({
      sort_by: e.target.form.sort_by.value,
      order: e.target.form.order.value,
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">Loading articles...</span>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">NC News Articles</h1>
      <form className="flex gap-4 mb-6" onChange={handleSortChange}>
        <label>
          Sort by:
          <select name="sort_by" defaultValue={sort_by} className="ml-2 p-1 rounded border">
            <option value="created_at">Date</option>
            <option value="comment_count">Comments</option>
            <option value="votes">Votes</option>
          </select>
        </label>
        <label>
          Order:
          <select name="order" defaultValue={order} className="ml-2 p-1 rounded border">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
      </form>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {articles.map(article => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Home