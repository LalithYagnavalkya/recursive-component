import { useRef, useState } from 'react';
import './r-com.css'
const Comment = ({ comment, addComment, comments }) => {

    const [collapse, toggleCollapse] = useState(true)
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
                    <div onClick={ () => toggleReplyTxtBtn(prev => !prev) }>reply</div>
                    { comments.find(x => x.parentId === comment.id) &&
                        <div onClick={ () => toggleCollapse(prev => !prev) }>{ !collapse ? 'expand' : 'collapse' } </div>
                    }
                </div>
                { showReplyTxtBtn && <div className='reply-box'>
                    <form onSubmit={ (e) => {
                        addComment(e, replyRef, comment.id);
                        toggleReplyTxtBtn(false)
                    } }>
                        <textarea
                            autoFocus
                            onKeyDown={ (e) => {
                                if (e.code === 'Enter') {
                                    addComment(e, replyRef, comment.id)
                                    toggleReplyTxtBtn(false)
                                }
                            } }
                            ref={ replyRef }
                        />  <button type='submit'>Go</button>
                    </form>
                </div> }
                { collapse && <>
                    { comments.filter(x => x.parentId === comment.id).map(x => {
                        return <Comment key={ x._id } comment={ x } addComment={ addComment } comments={ comments } />
                    }) }
                </> }
            </div>
        </div>
    )
}

export default Comment;