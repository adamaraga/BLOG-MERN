import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import "./write.css";
import { store } from 'react-notifications-component';

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useContext(Context);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories,
      profilePic: user.profilePic
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = "http://localhost:5000/images/" + filename;

      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.post("/posts", newPost);
      setLoading(false);
      store.addNotification({
        title: "success",
        message: "Your post has been published successfully!!!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true
        }
      });
      setTimeout(() => {
        window.location.replace("/posts/" + res.data._id);
      }, 2000);
      
      
     
      
      
    } catch (err) {
      setLoading(false);

    }
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src={
          file
            ? URL.createObjectURL(file)
            : "https://res.cloudinary.com/adamworkimages/image/upload/v1630925270/Blog%20images/travels_2_ka9ll5.jpg"
        }
        alt=""
      /> 
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeBtnCon">
          <select name="categories" onChange={e => setCategories([`${e.target.value}`])} >
            <option value="">Selete category</option>
            <option value="music">music</option>
            <option value="tech">tech</option>
            <option value="travels">travels</option>
            <option value="fashion">fashion</option>
            <option value="sport">sport</option>
            <option value="cinema">cinema</option>
          </select>

          <button className="writeSubmit btn" type="submit">
            {loading ? 'Publishing...': 'Publish'}
          </button>
        </div>

        <div className="writeFormGroup">
          <label htmlFor="fileInput" className='writeIconWrapper' >
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
}
