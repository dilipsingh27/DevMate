import React,{useState} from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';


const CommentForm = ({ postId, addComment }) => {
    const [text, setText] = useState('');

  return (
    <div className="post-form">
    <div className="bg-primary p">
      <h3>Leave a Comment...</h3>
    </div>
    <form className="form my-1" onSubmit={e => {
        e.preventDefault();
        addComment(postId, {text});    //we are passing our {text} as an object , this is going to be the formData within the action addPost funtion
        setText('');        //also want to clear the form , set that to empty string
    }}>
      <textarea
        name="text"
        cols="30"
        rows="5"
        placeholder="Comment the  post"
        value={text}            //for textarea i'm going to add value of text from our component state
        onChange={e => setText(e.target.value)}     //let's also add onChange here, we are passing string here which is going to be the value of the input [i.e., e.target.value] this is pretty simply 
        required
      ></textarea>
      <input type="submit" className="btn btn-dark my-1" value="Submit" />
    </form>
</div>
  )
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired
}

export default connect(null, {addComment}) (CommentForm)