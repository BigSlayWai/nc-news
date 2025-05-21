import { ChatBubbleLeftRightIcon, HandThumbUpIcon, TrashIcon } from '@heroicons/react/24/outline'

function CommentCard({ comment, currentUsername, onDelete, deleting }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 shadow mb-3 relative">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800 dark:text-gray-100">{comment.author}</span>
        <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
      </div>
      <p className="text-gray-800 dark:text-gray-100 mb-3">{comment.body}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <HandThumbUpIcon className="w-4 h-4 inline-block mr-1" />
        <span>{comment.votes} votes</span>
        <ChatBubbleLeftRightIcon className="w-4 h-4 inline-block ml-4 mr-1" />
        <span>Comment ID: {comment.comment_id}</span>
      </div>
      {currentUsername === comment.author && (
        <button
          className="absolute top-2 right-2 text-red-500 hover:text-red-700 disabled:opacity-50"
          onClick={() => onDelete(comment.comment_id)}
          disabled={deleting}
          aria-label="Delete comment"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      )}
      {deleting && (
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70 flex items-center justify-center rounded">
          <span className="text-pink-600 font-semibold">Deleting...</span>
        </div>
      )}
    </div>
  )
}

export default CommentCard