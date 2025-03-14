import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './comments.css';  
import { v4 as uuidv4 } from 'uuid';

const Comment = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [updatedText, setUpdatedText] = useState('');

    // Fetch comments 
    useEffect(() => {
        fetchComments();
    }, []);

    // Get all comments
    const fetchComments = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/comments/');
            setComments(response.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Add a new comment
    const addComment = async () => {
        if (!newComment) {
            alert("Comment is required!");
            return;
        }
    
        const data = {
            id: uuidv4(),  
            text: newComment,
            author: "Admin",
            date: new Date().toISOString(),  // current time
            likes: 0,  // default to 0
            image_url: image ? URL.createObjectURL(image) : null,  
        };
    
        try {
            const response = await axios.post('http://localhost:8000/api/comments/', data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setComments([...comments, response.data]);
            setNewComment('');
            setAuthor('');
            setImage(null);
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };
    
    // Delete a comment
    const deleteComment = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/comments/${id}/`);
            setComments(comments.filter(comment => comment.id !== id));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    // Update an existing comment
    const updateComment = async (id) => {
        if (!updatedText) return;
        try {
            const commentToUpdate = comments.find(comment => comment.id === id);
            const updatedComment = {
                ...commentToUpdate,
                text: updatedText
            };
            const response = await axios.put(`http://localhost:8000/api/comments/${id}/`, updatedComment);
            setComments(comments.map(comment => (comment.id === id ? response.data : comment)));
            setEditingComment(null);
            setUpdatedText('');
        } catch (error) {
            console.error('Error updating comment:', error);
        }
    };

    return (
        <div className="comment-container">
            <h2>Comments</h2>
            
            {/* Add new comment */}
            {/* <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
                className="input-field"
            /> */}
            <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="input-field"
            />
            {/* <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="input-field"
            /> */}
            <button onClick={addComment} className="btn">Add Comment</button>
            
            <div className="comments-list">
                {/* Display all comments */}
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        {editingComment === comment.id ? (
                            // Editing mode (display input for editing)
                            <div className="edit-mode">
                                <textarea
                                    value={updatedText}
                                    onChange={(e) => setUpdatedText(e.target.value)}
                                    placeholder="Edit your comment"
                                />
                                <button onClick={() => updateComment(comment.id)} className="btn">Save</button>
                                <button onClick={() => setEditingComment(null)} className="btn cancel">Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p><strong>{comment.author || 'Admin'}</strong>: {comment.text}</p>
                                <p>Likes: {comment.likes || 0}</p>
                                <p>Posted on: {new Date(comment.date).toLocaleString()}</p>
                                {comment.image && <img src={comment.image} alt="comment" />}
                               <br/>
                                <button onClick={() => { setEditingComment(comment.id); setUpdatedText(comment.text); }} className="btn">Edit</button>
                                <button onClick={() => deleteComment(comment.id)} className="btn">Delete</button>
                            </div>
                        )}
                        <hr />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comment;
