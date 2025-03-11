import { useRef, useState } from 'react';
import './r-com.css'
const Comment = ({ comment, addComment }) => {

    const [replie, setReplie] = useState('')
    const [showReplyTxtBtn, toggleReplyTxtBtn] = useState(false)
    const replyRef = useRef();
    return (
        <div className='container-rs'>
            <div className='comment-top'>
                <div className="profile">
                    <div className="pic"></div>
                    <div className="name">yuiu_01</div>
                </div>
            </div>
            <div className='comment-bottom'>
                <div className='actual-comment'>
                    { comment.text }
                </div>
                <div className="action-buttons">
                    <div onClick={ () => toggleReplyTxtBtn(prev => !prev)}>reply</div>
                </div>
               { showReplyTxtBtn && <div className='WhereWeComment'>
                    <form onSubmit={ (e) => addComment(e, replyRef, comment.id) }>
                        <textarea
                            onKeyDown={ (e) => {
                                if (e.code === 'Enter') addComment(e, replyRef, comment.id)

                            } }
                            ref={ replyRef }
                        />  <button type='submit'>Go</button>
                    </form>
                </div>}
            </div>
        </div>
    )
}

export default Comment;