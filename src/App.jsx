import { useRef, useState } from 'react'
import './App.css'
import Comment from './recursive-comment';

/* 
{
  comment: 'this is primary',
  id: 0,
  parentId: null,
  }
*/

function App() {
  const textRef = useRef();
  const [comments, setComments] = useState([]);
  const [counter, setCounter] = useState(1);

  const addComment = async (e, textRef, parentId = null) => {
    e?.preventDefault();
    if (textRef.current.value === '') return

    // it does impact
    setComments(prev => {

      const updatedComments = [...prev,
      {
        id: counter,
        text: textRef.current.value,
        parentId: parentId

      }
      ]
      console.log(updatedComments)
      textRef.current.value = ''
      return updatedComments
    })
    setCounter(prev => prev + 1)
  }

  return (
    <>
      <div className='ourComponent'>
        <div className='allTheComments'>
          {
            comments.map(x => <Comment key={ x._id } comment={ x } addComment={ addComment } />)
          }
        </div>
        <div className='WhereWeComment'>
          <form onSubmit={ (e) => addComment(e, textRef) }>
            <textarea
              onKeyDown={ (e) => {
                if (e.code === 'Enter') addComment(e, textRef)
              } }
              ref={ textRef }
            />  <button type='submit'>Go</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
