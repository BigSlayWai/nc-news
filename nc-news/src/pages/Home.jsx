import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ArticleCard from '../components/ArticleCard'

function Home() {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('https://be-nc-news-example-46vu.onrender.com/api/articles')
      .then(res => res.json())
      .then(data => setArticles(data.articles))
  }, [])

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