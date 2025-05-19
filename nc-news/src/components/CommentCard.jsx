import { ChatBubbleLeftRightIcon, HandThumbUpIcon } from '@heroicons/react/24/outline'


function CommentCard({ comment }) {
    return (
      <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 shadow mb-3">
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
      </div>
    )
  }
  
  export default CommentCard