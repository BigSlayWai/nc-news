import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function ArticleDetails() {
  const { article_id } = useParams()
  const [article, setArticle] = useState(null)

  useEffect(() => {
    fetch(`https://be-nc-news-example-46vu.onrender.com/api/articles/${article_id}`)
      .then(res => res.json())
      .then(data => setArticle(data.article))
  }, [article_id])

  if (!article) return <p className="text-center mt-10 text-lg">Loading...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h2>
        <div className="flex items-center text-gray-600 dark:text-gray-300 mb-4 text-sm">
          <span className="mr-4">By <span className="font-semibold">{article.author}</span></span>
          <span className="mr-4">| Topic: <span className="font-semibold">{article.topic}</span></span>
          <span>| {new Date(article.created_at).toLocaleDateString()}</span>
        </div>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p className="mb-4 text-gray-800 dark:text-gray-100">{article.body}</p>
        <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm">
          <span>Votes: <span className="font-semibold">{article.votes}</span></span>
          <span>Comments: <span className="font-semibold">{article.comment_count}</span></span>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetails