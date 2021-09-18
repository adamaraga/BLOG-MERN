import "./settings.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";
import DeleteWarning from "../../components/deleteWarning/DeleteWarning";
import { store } from "react-notifications-component";


export default function Settings() {
  const [update, setUpdate] = useState(false);

  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  const { user, dispatch, isFetching } = useContext(Context);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: "UPDATE_START" });


    const userUpdate = {
      userID: user._id,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      userUpdate.profilePic = "http://localhost:5000/images/" + filename;

      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }

    try {
      const res = await axios.put("/users/" + user._id, userUpdate);
      store.addNotification({
        title: "success",
        message: "Your profile has been updated successfully!!!",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });

    
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setUpdate(false)
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
    }
  };

  const deleteWarning = () => {
    setShowDeleteWarning(true);

    setTimeout(() => {
      setShowDeleteWarning(false);
    }, 10000);
  };

  console.log(user._id)

  const handleDelete = async () => {
   setDeleteLoading(true);
    try {
      await axios.delete("/users/" + user._id, {
        data: {
          userID: user._id,
          username: user.username,
        },
      });
      setDeleteLoading(false);
      
      dispatch({ type: "LOGOUT" });
      window.location.replace("/");
    } catch (error) {
      setDeleteLoading(false);
    }
  
  };
 
  return (
    <div className="settings">
    <DeleteWarning
        title="Delete Account"
        desc="your account and all the posts you created"
        show={showDeleteWarning}
        handleDelete={handleDelete}
        setShowDeleteWarning={() => setShowDeleteWarning(false)}
        loading={deleteLoading}
      />
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete" onClick={deleteWarning}>Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>
            Profile Picture{" "}
            {!update ? (
              <i
                onClick={() => setUpdate(true)}
                className="updateIcon far fa-edit"
              ></i>
            ) : (
              <p onClick={() => setUpdate(false)} className="cancleBtn">
                cancle
              </p>
            )}{" "}
          </label>

          <div className="settingsPP">
            <img
              src={
                file
                  ? URL.createObjectURL(file) 
                  : user.profilePic || "https://res.cloudinary.com/adamworkimages/image/upload/v1631283952/Blog%20images/blank-profile-picture-973460_1280_h8j5nq.png"
              }
              alt=""
            />
            {update && (
              <>
                <label htmlFor="fileInput">
                  <i className="settingsPPIcon far fa-user-circle"></i>{" "}
                </label>

                <input
                  id="fileInput"
                  type="file"
                  style={{ display: "none" }}
                  className="settingsPPInput"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </>
            )}
          </div>

          <label>Username</label>
          {!update ? (
            <p className="profileDesc"> {user.username} </p>
          ) : (
            <input
              type="text"
              placeholder={user.username}
              name="name"
              className="mb1"
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <label>Email</label>
          {!update ? (
            <p className="profileDesc">{user.email}</p>
          ) : (
            <input
              type="email"
              placeholder={user.email}
              name="email"
              className="mb1"
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          {update && (
            <>
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="mb2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={ isFetching ? 'btn btnCenter disabled' : 'btn btnCenter'} type="submit">
              { isFetching ? 'Updating...' : 'Update'}
              </button>
            </>
          )}
         
        </form>
      </div>
    </div>
  );
}

