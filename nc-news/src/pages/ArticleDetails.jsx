import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CommentCard from '../components/CommentCard'
import CommentForm from '../components/CommentForm'

function ArticleDetails() {
  const { article_id } = useParams()
  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [voteChange, setVoteChange] = useState(0)
  const [voting, setVoting] = useState(false)
  const [voteError, setVoteError] = useState(null)

  useEffect(() => {
    // Fetch article and comments in parallel
    const fetchData = async () => {
      try {
        const [articleRes, commentsRes] = await Promise.all([
          axios.get(`https://be-nc-news-example-46vu.onrender.com/api/articles/${article_id}`),
          axios.get(`https://be-nc-news-example-46vu.onrender.com/api/articles/${article_id}/comments`)
        ])
        setArticle(articleRes.data.article)
        setComments(commentsRes.data.comments)
        setVoteChange(0)
        setVoteError(null)
      } catch (err) {
        throw new Error('Error fetching article, votes or comments')
      }
    }
    fetchData()
  }, [article_id])

  const handleVote = async (increment) => {
    setVoting(true)
    setVoteChange((curr) => curr + increment)
    setVoteError(null)
    try {
      await axios.patch(`https://be-nc-news-example-46vu.onrender.com/api/articles/${article_id}`, {
        inc_votes: increment,
      })
    } catch (err) {
      setVoteChange((curr) => curr - increment) // reverting back the vote change
      setVoteError('Failed to update vote. Please try again.')
    } finally {
      setVoting(false)
    }
  }

  if (!article) return <p className="text-center mt-10 text-lg">Loading...</p>

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-2xl w-full bg-black rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-2 text-white">{article.title}</h2>
        <div className="flex items-center text-gray-300 mb-4 text-sm">
          <span className="mr-4">By <span className="font-semibold">{article.author}</span></span>
          <span className="mr-4">| Topic: <span className="font-semibold">{article.topic}</span></span>
          <span>| {new Date(article.created_at).toLocaleDateString()}</span>
        </div>
        <img
          src={article.article_img_url}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
        <p className="mb-4 text-gray-100">{article.body}</p>
        <div className="flex items-center gap-6 text-gray-400 text-sm mb-6">
          <span>
            Votes: <span className="font-semibold text-white">{article.votes + voteChange}</span>
          </span>
          <button
            className="ml-2 px-3 py-1 bg-pink-600 text-pink rounded hover:bg-pink-700 disabled:opacity-50"
            onClick={() => handleVote(1)}
            disabled={voting}
            aria-label="Upvote"
          >
            +
          </button>
          <button
            className="ml-2 px-3 py-1 bg-pink-600 text-pink rounded hover:bg-pink-700 disabled:opacity-50"
            onClick={() => handleVote(-1)}
            disabled={voting}
            aria-label="Downvote"
          >
            -
          </button>
          <span>Comments: <span className="font-semibold text-white">{article.comment_count}</span></span>
        </div>
        {voteError && (
          <div className="mb-4 text-red-600 bg-red-100 dark:bg-red-900 rounded p-2">{voteError}</div>
        )}
        <h3 className="text-xl font-semibold mb-4 text-white">Comments</h3>
        <CommentForm
        article_id={article.article_id}
        onCommentPosted={comment => setComments(curr => [comment, ...curr])}
      />
        <div>
          {comments.length === 0 ? (
            <p className="text-gray-400">No comments yet.</p>
          ) : (
            comments.map(comment => (
              <CommentCard key={comment.comment_id} comment={comment} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleDetails