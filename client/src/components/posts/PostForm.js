import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from '../../actions/post';


const PostForm = ({ addPost }) => {
    const [text ,setText] =useState('');        // here we are pulling text & setText as the method and set that to useState
                                            //and this is just going to be string '' since we don't means we only have one field 
                                            //for this form so i'm not going to use formData object 

  return (
    <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form className="form my-1" onSubmit={e => {
            e.preventDefault();
            addPost({text});    //we are passing our {text} as an object , this is going to be the formData within the action addPost funtion
            setText('');        //also want to clear the form , set that to empty string
        }}>
          <textarea
            name="text"
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={text}            //for textarea i'm going to add value of text from our component state
            onChange={e => setText(e.target.value)}     //let's also add onChange here, we are passing string here which is going to be the value of the input [i.e., e.target.value] this is pretty simply 
            required
          ></textarea>
          <input type="submit" className="btn btn-dark my-1" value="Submit" />
        </form>
    </div>
  );
};

PostForm.propTypes = {
    addPost: PropTypes.func.isRequired
};

export default connect(null,{addPost}) (PostForm)