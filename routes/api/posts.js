const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator')

const User = require('../../models/User');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');


// @route  POST api/posts
// @desc   Create a post
// @access Private
router.post('/',[auth, [
    check('text','Text is required')
    .not()
    .isEmpty()
    ]], 
    async(req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }


        try {
            
            const user = await User.findById(req.user.id).select('-password');          //heremade changes findById and object
            console.log(user);
            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id

            });

            const post = await newPost.save();

            res.json(post);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
            
        }
});


// @route  GET api/posts
// @desc   Get all post
// @access Private  bcoz unless we logged in we can't see the post

router.get('/',auth,async (req,res) => {
    try {
        const posts = await Post.find().sort({ date: -1});
        res.json(posts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route  GET api/posts/:id
// @desc   Get post by ID
// @access Private  bcoz unless we logged in we can't see the post

router.get('/:id',auth,async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(!post) {
            return res.status(400).json({msg: 'Post Not Found'});
        }
        res.json(post);
        
    } catch (err) {
        console.error(err.message);
        if(err.kind ==='ObjectId') {
            return res.status(400).json({msg: 'Post Not Found'});
        }
        res.status(500).send('Server Error');
    }
});


// @route  DELETE api/posts/:id
// @desc   Delete a post
// @access Private  

router.delete('/:id',auth,async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        //if post doesn't exist 
        if(!post) {
            return res.status(400).json({msg: 'Post Not Found'});
        }
        //Check On user that the user which is logged in can only delete their posts not other user
        if(post.user.toString()!== req.user.id) {
            return res.status(401).json({msg:'User not authorized'});
        }
        //else part 
        await post.remove();
        res.json({msg: 'Post Removed'});

    } catch (err) {
        console.error(err.message);
        if(err.kind ==='ObjectId') {
            return res.status(400).json({msg: 'Post Not Found'});
        }
        res.status(500).send('Server Error');
    }
});


// @route  PUT api/posts/like/:id       (updating a post thats why PUT rqst, id of a post that has to be like)
// @desc   Like a post
// @access Private  
router.put('/like/:id',auth,async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if the post has already been liked by the user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({msg:'Post already liked'});
        }

        post.likes.unshift({user : req.user.id});

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route  PUT api/posts/unlike/:id       (updating a post thats why PUT rqst)
// @desc   Unike a post
// @access Private  
router.put('/unlike/:id',auth,async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Check if the post has already been liked by the user
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {          //eql to 0 it means haven't liked yet
            return res.status(400).json({msg:'Post has not been liked yet'});
        }

        //Get remove index
        const removeIndex = post.likes.map(like => like.user.toString().indexOf(req.user.id));
        
        post.likes.splice(removeIndex,1);

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route  POST api/posts/comment/:id              (id of the post to be comment on)
// @desc   Comment on a post
// @access Private
router.post('/comment/:id',[auth, [
    check('text','Text is required')
    .not()
    .isEmpty()
    ]], 
    async(req,res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }


        try {
            
            const user = await User.findById(req.user.id).select('-password');          //heremade changes findById and object
            //need to get a post not creating new post
            const post = await Post.findById(req.params.id);

            const newComment = {
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            };

            post.comments.unshift(newComment);
            await post.save();

            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
            
        }
});


// @route  DELETE api/posts/comment/:id/:comment_id             (find the post by id & to need to know which comment to delete by comment_id )
// @desc   Delete a comment
// @access Private
router.delete('/comment/:id/:comment_id', auth , async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        //Pull out the comment from the post
        const comment = post.comments.find(comment => comment.id === req.params.comment_id);

        //Make sure comment exists
        if(!comment) {
            return res.status(404).json({msg: 'Comment does not exist'});
        }

        //Check user (that user who is deleting the comment is actually who made the comment earlier)
        if(comment.user.toString()!== req.user.id) {
            return res.status(404).json({msg: 'User not authorized'});
        }

        //Get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString().indexOf(req.user.id));
        
        post.comments.splice(removeIndex,1);

        await post.save();
        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;