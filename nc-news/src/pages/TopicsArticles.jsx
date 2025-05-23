import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'

function TopicsArticles() {
  const { topic_slug } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    axios.get(`https://be-nc-news-example-46vu.onrender.com/api/articles?topic=${topic_slug}`)
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-600 dark:text-gray-300 animate-pulse">Loading articles...</span>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 capitalize">{topic_slug} Articles</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {articles.map(article => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default TopicsArticles