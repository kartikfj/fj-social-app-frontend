// Post1.js
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../post/PostItem';
import { getPost, addLike, removeLike, deletePost } from '../../store/action/post'; // Import all necessary actions
import CommentForm from './CommentForm';
import CommentItems from './CommentItems';

const Post1 = ({ getPost, post: { post, loading }, addLike, removeLike, deletePost }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <section className="container">
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem 
        post={post} 
        addLike={addLike} 
        removeLike={removeLike} 
        deletePost={deletePost} // Pass the deletePost action
        showActions={true} 
      />
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItems key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </section>
  );
};

Post1.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost, addLike, removeLike, deletePost })(Post1);
