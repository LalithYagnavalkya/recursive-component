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
  const [comments, setComments] = useState([
    {
      "id": 1,
      "text": "This is a recursion component",
      "parentId": null
    },
    {
      "id": 2,
      "text": "Where we can maintain threads of conversations",
      "parentId": 1
    },
    {
      "id": 3,
      "text": "hide replis at any level!",
      "parentId": null
    },
    {
      "id": 4,
      "text": "this is first level",
      "parentId": 3
    },
    {
      "id": 5,
      "text": "second",
      "parentId": 4
    },
    {
      "id": 6,
      "text": "third",
      "parentId": 5
    },
    {
      "id": 7,
      "text": "I didn't spend time on mobile view css",
      "parentId": null
    }
  ]);
  const [counter, setCounter] = useState(8);

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

    <div className='ourComponent'>
      <div className='allTheComments'>
        {
          comments.filter(x => x.parentId === null).map(x => <Comment
            key={ x._id }
            comment={ x }
            addComment={ addComment }
            comments={ comments }
          />)
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

  )
}

export default App
