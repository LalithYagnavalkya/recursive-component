import { useEffect, useRef, useState } from 'react'
import './App.css'
import Comment from './recursive-comment';
import { io } from 'socket.io-client';


function App() {
  const textRef = useRef();
  const [comments, setComments] = useState([]);
  const [counter, setCounter] = useState(8);
  const [username, setUsername] = useState();
  const socket = useRef();

  const addComment = async (e, textRef, parentId = null) => {
    e?.preventDefault();
    if (textRef.current.value === '') return

    socket.current.emit('comment', {
      username,
      text: textRef.current.value,
      parentId: parentId
    })
    textRef.current.value = ''
  }

  useEffect(() => {
    const name = prompt("enter your name");
    setUsername(name);
    const newSocket = io('https://snfrh097-3000.inc1.devtunnels.ms/') //replace your url

    newSocket.emit('add-user', name);

    newSocket.on('messages', (chats) =>{
      setComments(chats)
    })

    socket.current = newSocket;

    socket.current.on('newComment', (data) => {
      console.log(data)
      setComments((prev) => [...prev, data])
    })

    return () => {
      socket.current.disconnect();
    }
  }, [])


  return (

    <div className='ourComponent'>
      <div key={'thisisnothing'} className='allTheComments'>
        {
          comments.filter(x => x.parentId === null).map(x => <Comment
            key={x.id}
            comment={x}
            addComment={addComment}
            comments={comments}
          />)
        }
      </div>
      <div className='WhereWeComment'>
        <form onSubmit={(e) => addComment(e, textRef)}>
          <textarea
            onKeyDown={(e) => {
              if (e.code === 'Enter') addComment(e, textRef)
            }}
            ref={textRef}
          />  <button type='submit'>Go</button>
        </form>
      </div>
    </div>

  )
}

export default App
