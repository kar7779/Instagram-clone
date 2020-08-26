import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { db, storage } from "../firebase";
import { firestore } from "firebase";

function ImageUpload({ username }) {
  const [image, setImage] = useState(null);
  const [progress, setprogress] = useState(0);
  const [caption, setcaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    //we should use storage().ref
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogress(progress);
      },
      //error handleing
      (error) => {
        console.log(error);
        alert(error.message());
      },
      //complete function it's imp this will ref to upload task storage.ref().put()
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firestore.FieldValue.serverTimestamp(),

              caption: caption,
              imageUrl: url,
              username: username,
            });

            setImage("");
            setcaption(null);
            setprogress(0);
          });
      }
    );
  };
  return (
    <div className="upload">
      <progress value={progress} max="100"></progress>
      <input
        type="text"
        placeholder="enter caption...."
        name=""
        onChange={(event) => setcaption(event.target.value)}
      />
      <input type="file" onChange={handleChange} />
      <Button onClick={handleUpload} className="uploadbtn">
        Upload
      </Button>
    </div>
  );
}

export default ImageUpload;

//i have made mistake that i get storage direct from base so  it's not showing then i import firebase.js which intialized in locall folder then it worked perfectly
