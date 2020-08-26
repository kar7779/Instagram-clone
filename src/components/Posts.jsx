import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@material-ui/core";
import { db } from "../firebase";
import "./Posts.css";
import { firestore } from "firebase";

function Posts({ user, username, caption, imageUrl, postId }) {
  const [comments, setComments] = useState([]);
  //here we [] bec it comments are list so use that
  const [comment, setComment] = useState("");
  useEffect(() => {
    //so here we define uncomment so it will refer to db and then it will get info about comments on particluar posst whenenve a xomment posted on particular post then it will get upadaetd through snapshot and we know that useEffect only run once the component get updated
    // when the uncomment complete its function we can return the uncomment so below we use retuen functoion to callback the uncomment and the comment get upadted in our post

    let uncomment;
    if (postId) {
      uncomment = db;
      db.collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setComments(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      uncomment();
    };
  }, [postId]); //here we pass the value what we are updating and it will get updated every time when new commment get poseted

  const postcomment = (event) => {
    event.preventDefault();

    db.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user.displayName,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    setComment("");
  };
  return (
    <div className="posts">
      <div className="postheader">
        <Avatar src="#" alt="Karthik" />
        <h4>{username}</h4>
      </div>
      <img src={imageUrl} alt="kk" />
      <h3>
        <strong>{username}</strong> {caption}
      </h3>
      <div className="post_comments">
        {comments.map((comment) => (
          <h4>
            <strong>{comment.username}</strong> {comment.text}
          </h4>
        ))}
      </div>
      {/* //basically {user ()} will make comment box disable when there is no user */}
      {user && (
        <form className="post_commentsBox">
          <input
            className="comment_text"
            type="text"
            placeholder="addcomment....."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button type="submit" disabled={!comment} onClick={postcomment}>
            post
          </Button>
        </form>
      )}
    </div>
  );
}

export default Posts;
