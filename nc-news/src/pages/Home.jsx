import { useEffect, useState } from 'react'
import axios from 'axios'
import ArticleCard from '../components/ArticleCard'

function Home() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get('https://be-nc-news-example-46vu.onrender.com/api/articles')
      .then(res => {
        setArticles(res.data.articles)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {articles.map(article => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  )
}

export default Home