import { Link } from 'react-router-dom'

function ArticleCard({ article }) {
  return (
    <Link to={`/articles/${article.article_id}`} className="block h-full">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col h-full transition hover:shadow-lg">
        <img
          src={article.article_img_url}
          alt={article.title}
          className="w-full h-48 object-cover rounded mb-3"
        />
        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{article.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-1">
          <span className="font-semibold">By:</span> {article.author}
        </p>
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          <span className="font-semibold">Topic:</span> {article.topic}
        </p>
        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-auto">
          <span>Votes: {article.votes}</span>
          <span>Comments: {article.comment_count}</span>
          <span>{new Date(article.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard