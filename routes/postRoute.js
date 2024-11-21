import express from 'express'
import { protectedRoute } from '../middleware/authMiddleware.js';
const router = express.Router()


router.get('/posts', protectedRoute,(req,res)=>{
    return res.render('posts/index',{title: 'Post Page', active: 'Post'})
});

//route for table new posts page
router.get('/create-posts', protectedRoute,(req,res)=>{
    return res.render('posts/create-post',{title:"Create Post", active:'Create_post'})
})


//route for edit posts
router.get('edit-post/:id',protectedRoute,(req,res)=>{
    return res.render('posts/edit-post',{title:'Edit Post', active: 'edit_post'})
})
 
//route for view posts
router.get('post/:id',(req,res)=>{
    return res.render('posts/view-post',{title:'View Post', active: 'view_post'})
})

export default router