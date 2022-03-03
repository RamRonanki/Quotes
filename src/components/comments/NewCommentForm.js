import { useEffect, useRef } from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from '../../hooks/use-http';
import { addComment } from '../../lib/api';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const {sendRequest, status, error} = useHttp(addComment);

  const {onAddedComment} = props;
  const {quoteId} = props;
  useEffect(()=>{
    if(status ==='completed' && !error){
      onAddedComment();
    }
  },[status, error, onAddedComment]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const enteredComment = commentTextRef.current.value;
    // optional: Could validate here

    sendRequest({commentData : {text: enteredComment }, quoteId: quoteId})
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
