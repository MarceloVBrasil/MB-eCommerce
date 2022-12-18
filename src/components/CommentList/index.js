import Comment from '../Comment'
import "./CommentList.scss"

export default function CommentList({ comments }) {
    
  return (
    <div className='comment-list'>
          {comments?.map(comment => <Comment key={comment.id} comment={comment} />)}
    </div>
    )
}
