import { useEffect, useRef, useState } from 'react'
import './App.css'
import Comment from './recursive-comment';
import { io } from 'socket.io-client';


function App() {
  const textRef = useRef();
  const [comments, setComments] = useState([
    // {
    //   "id": 1,
    //   "text": "This is a recursion component",
    //   "parentId": null
    // },
    // {
    //   "id": 2,
    //   "text": "Where we can maintain threads of conversations",
    //   "parentId": 1
    // },
    // {
    //   "id": 3,
    //   "text": "hide replies at any level!",
    //   "parentId": null
    // },
    // {
    //   "id": 4,
    //   "text": "this is first level",
    //   "parentId": 3
    // },
    // {
    //   "id": 5,
    //   "text": "second",
    //   "parentId": 4
    // },
    // {
    //   "id": 6,
    //   "text": "third",
    //   "parentId": 5
    // },
    // {
    //   "id": 7,
    //   "text": "I didn't spend time on mobile view css",
    //   "parentId": null
    // }
  ]);
  const [counter, setCounter] = useState(8);
  const [username, setUsername] = useState();
  const socket = useRef();

  const addComment = async (e, textRef, parentId = null) => {
    e?.preventDefault();
    if (textRef.current.value === '') return

    // it does impact
    // setComments(prev => {

    //   const updatedComments = [...prev,
    //   {
    //     id: counter,
    //     text: textRef.current.value,
    //     parentId: parentId

    //   }
    //   ]
    //   console.log(updatedComments)
    //   textRef.current.value = ''
    //   return updatedComments
    // })
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
    const newSocket = io('http://localhost:3000')

    newSocket.emit('add-user', name);

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
