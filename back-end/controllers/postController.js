import { Post } from "../models/post.models.js"
import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { v2 as cloudinary } from "cloudinary"




const createPost = asyncHandler(async (req, res) => {
    console.log(req.body, "------------------------------------------------");

    const { postedBy, text } = req.body
    let { img } = req.body
    console.log(req.body, "here1");
    if (!postedBy || !text) {
        throw new ApiError(400, { error: 'PostedBy and text is required' })
    }
    console.log("here1");

    const user = await User.findById(postedBy);
    if (!user) {
        throw new ApiError(400, { error: 'User is not found' })
    }
    console.log(req.user._id.toString());
    // console.log(user._id.toString())
    console.log(postedBy)
    if (user._id.toString() !== postedBy) {
        throw new ApiError(400, { error: 'You are not authorized to create post for others' })
    }
    console.log("here2");

    const maxLength = 500;
    if (text.length > maxLength) {
        throw new ApiError(400, `text must be less than ${maxLength} characters`)
    }
    console.log("here3");
    // if (img) {
    //     const uploadedResponse = await cloudinary.uploader.upload(img);
    //     img = uploadedResponse.secure_url;
    // }
    const newPost = new Post({ postedBy, text, img })
    await newPost.save()
    const populatedPost = await newPost.populate('postedBy', 'username email');
    return res.status(201).json(new ApiResponse(200, populatedPost, 'Post created Successfully'))


})



const getPost = asyncHandler(async (req, res) => {
    // console.log('123k12;3lld;gmjlkfdgjmlkfdgjlkfdjglkfds', req.params._id);
    const { id: postId } = req.params
    console.log(postId);
    const post = await Post.findById(postId).populate('postedBy', 'username profilePic')
    console.log(req.params._id);
    console.log('post', post);

    if (!post) {
        throw new ApiError(400, 'Post not found')
    }
    return res.status(201).json(new ApiResponse(200, post))

})


const deletePost = asyncHandler(async (req, res) => {
    const { id: postId } = req.params
    const post = await Post.findById(postId);
    console.log(post);

    if (!post) {
        throw new ApiError(400, "Post not found")
    }
    if (post.postedBy.toString() !== req.user._id.toString(

    )) {
        throw new ApiError(400, 'You are not authorized to delete post')
    }
    await Post.findByIdAndDelete(req.params.id)
    return res.status(201).json(new ApiResponse(200, "Post deleted"))
})



const likeUnlikePost = asyncHandler(async (req, res) => {
    const { id: postId } = req.params
    const userId = req.user._id;
    const post = await Post.findById(postId)

    if (!post) {
        throw new ApiError(400, 'Post not found')
    }
    const userLikedPost = post.likes.includes(userId)

    if (userLikedPost) {
        await Post.updateOne({ _id: postId }, { $pull: { likes: req.user._id } })
        return res.status(201).json(new ApiResponse(401, post, 'Post unliked'))
        // await User.findByIdAndUpdate(req.user._id, {$pull:{likes: req.user._id}})
    }
    if (!userLikedPost) {
        await Post.updateOne({ _id: postId }, { $push: { likes: req.user._id } })
        return res.status(201).json(new ApiResponse(200, post, 'Post liked'))
    }
})



const replyToPost = asyncHandler(async (req, res) => {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;
    console.log(userId)
    const username = req.user.username;
    const profilePic = req.user.profilePic;

    if (!text) {
        throw new ApiError(400, 'Text field is required')
    }
    const post = await Post.findById(postId)
    if (!post) {
        throw new ApiError(400, 'Post not found')
    }
    const reply = { userId, username, profilePic, text }
    console.log(reply);
    post.replies.push(reply);
    await post.save()
    return res.status(201).json(new ApiResponse(200, post, 'Replied successfully'))


})


const getFeedPosts = asyncHandler(async (req, res) => {
    const { postedBy } = req.body

    const userId = req.user._id;
    console.log(userId);

    const user = await User.findById(userId)
    console.log('123');


    if (!user) {
        throw new ApiError(400, 'User is not found')
    }
    const following = user.following;
    console.log('asdsad');


    // const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 })
    const feedPosts = await Post.find().sort({ createdAt: -1 }).populate('postedBy', 'username');
    console.log('feedPosts', feedPosts)

    return res.status(201).json(new ApiResponse(200, feedPosts, 'Your feed is ready'))
})


const getUserPosts = asyncHandler(async (req, res) => {
    const { username } = req.params

    const user = await User.findOne({ username })
    if (!user) {
        throw new ApiError(400, "User is not found")
    }
    const posts = await Post.find({ postedBy: user._id }).populate('postedBy', 'username');
    return res.status(201).json(new ApiResponse(200, posts, 'User post is ready'))

})

export { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts } 