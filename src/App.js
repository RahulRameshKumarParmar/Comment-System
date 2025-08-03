import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { comments } from './Data/Comments';

function App() {

  let [reply, setReply] = useState("");
  let [commentsList, setCommentsList] = useState(comments);
  let [username, setUsername] = useState("rahulparmar");
  let [userReply, setUserReply] = useState("");
  let [replyToId, setReplyToId] = useState(null);

  let addData = () => {
    if (reply.trim() === "") return;

    const newComment = {
      id: commentsList.length + 1,
      user: username,
      body: reply
    }

    setCommentsList([...commentsList, newComment]);
    setReply("");
  }

  let handleReplySubmit = (id) => {

    if (userReply.trim() === "") return;

    const newReplyComment = {
      id: Date.now(),
      user: username,
      body: userReply
    }

    const updatedComments = commentsList.map((comment) => {
      if (comment.id === id) {
        return {
          ...comment,
          reply: [...(comment.reply || []), newReplyComment]
        };
      }
      return comment;
    })

    setCommentsList(updatedComments);
    setUserReply("");
    setReplyToId(null);
  }

  return (
    <div className="App">
      <div>
        <h1>Nested Comments System</h1>
        <p>Create a comment section where users can add comments and reply to each other's comments (nested comments). Display the replies under the corresponding comment, and allow the user to add a reply to any comment.</p>
      </div>

      <div>
        <input type='text' value={reply} onChange={(event) => setReply(event.target.value)} />
        <button onClick={addData}> Comment </button>
      </div>

      <div>
        {commentsList.map((value, index) => {
          return (
            <div key={value.id}>
              <div className='allComments'>
                {value.body}
              </div>
              <div className='userSpace'>
                user: {value.user}

                {replyToId === value.id ?
                  (<div>
                    <input type='text' value={userReply} onChange={(event) => setUserReply(event.target.value)} />
                    <button onClick={() => handleReplySubmit(value.id)}>Reply</button>
                  </div>)
                  :
                  <button onClick={() => setReplyToId(value.id)} className='replyBtn'> Reply </button>
                }
              </div>
              {value.reply.map((value) => {
                return (
                  <div key={value.id}>
                    <div className='allReplyComments'>
                      {value.body}
                    </div>
                    <div className='replyUserSpace'>
                      user: {value.user}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
