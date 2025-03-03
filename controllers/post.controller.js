import { Post } from "../models/Post.Schema.js";
import { User } from "../models/User.Schema.js"; // Import User model
// Import authentication middleware

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("user", "username email"); // Populate user details
    res.json({ posts, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a post (User must be authenticated)
export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({
          message: "must provide title and description",
          success: false,
        });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const post = new Post({
      title,
      description,
      user: req.user.userId, // Associate post with authenticated user
    });

    await post.save();
    res
      .status(201)
      .json({ post, success: true, message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post (Only the owner can update)
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    if(!title || !description) {
      return res
        .status(400)
        .json({
          message: "must provide title and description",
          success: false,
        });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const post = await Post.findById(id);
   
    
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    
    if (post.user.toString() !== req.user.userId) {
      return res
        .status(403)
        .json({ message: " You are not the owner",success: false });
    }

    post.title = title;
    post.description = description;
    await post.save();

    res.json({ message: "Post updated successfully", post, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user) {
      return res.status(401).json({ message: "Login to get access", success: false });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    
    if (post.user.toString() !== req.user.userId) {
      return res.status(403).json({
        message: " You can only delete your own post",
        success: false,
      });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully", success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getpostbyid = async (req, res) => {
  try {
    const { id } = req.params;
    

    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    

    res.status(200).json({ post, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
