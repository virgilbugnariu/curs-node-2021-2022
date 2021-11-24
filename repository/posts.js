const db = require('../models');

module.exports.getAllPosts = async () => {
  try {
    const allPosts = await db.Post.findAll();
    return allPosts;
  } catch (error) {
    console.error('Something went wrong');
    return null;
  }
}

module.exports.getPostById = async (id) => {
  const postId = parseInt(id);
  
  try {
    const post = await db.Post.findByPk(postId);
    return post;
  } catch (error) {
    console.error('Something went wrong');
    return null;
  }
}

module.exports.createPost = async (req, res) => {
  const userId = req.params.id;

  const {
    title,
    body,
  } = req.body

  try {
    const user = await db.User.findByPk(userId);
    
    if(!user) {
      throw new Error('User not found');
    }

    const newPost = {
      title,
      body,
    };

    const createdPost = await user.createPost(newPost); 

    res.status(201).send(createdPost);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }
}

module.exports.addTagToPost = async (req, res) => {
  const postId = req.params.postId;
  const tagId = req.params.tagId;

  try {
    const post = await db.Post.findByPk(postId);
    const tag = await db.Tag.findByPk(tagId);

    if(!post) {
      throw new Error("Post not found");
    }

    if(!tag) {
      throw new Error("Tag not found");
    }

    await post.setTags(tag);

    const updatedPost = await db.Post.findByPk(postId);
    const updatedPostsTags = await updatedPost.getTags();

    const response = {
      ...updatedPost.toJSON(),
      tags: updatedPostsTags,
    }
    res.status(201).send(response);
  } catch (error) {
    console.error(error);
    res.send({
      error: "Something went wrong",
    });
  }




}

module.exports.updatePost = (req, res) => {
  
}


module.exports.deletePost = (req, res) => {
  
}
