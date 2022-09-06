import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { POSTS_URL } from "../../constants/constants";
import { addPost, deletePost, saveApiData, updatePost } from "../../redux/jsonApi/jsonApi.actions";
import { deleteUserDataFromMemory } from "../../utils/session-storage";
import Table from "../table/table.component";
import "./home.css"
const Home = (props) => {
  const navigate= useNavigate();
  const [username , setUserName] = useState("");
  const [addModal , setAddModal] = useState(false);
  const [post, setItem] = useState({
    userId: "userId",
    title: "title",
    body: "body"
  })
  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("userData")).username);
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  const fetchData = () =>{
     axios
      .get(POSTS_URL)
      .then(function (response) {
        props.saveApiData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const handleDeletePost = (id) =>{

    // We can perform delete task using calling delete request and fetching data again but dummy api dont support this
    // axios.delete(POSTS_URL+"/"+id).then((res) => console.log(res));
    // fetchData()
    
    props.deletePost(id);
  }

  const handleUpdatePost = (post) =>{

    // We can perform delete task using calling delete request and fetching data again but dummy api dont support this
    // axios.put(POSTS_URL+"/"+id, post).then((res) => console.log(res));
    // fetchData()
    
    props.updatePostData(post);
  }

  const handleAddPost = (post) =>{

    // We can perform delete task using calling delete request and fetching data again but dummy api dont support this
    // axios.post(POSTS_URL, post).then((res) => console.log(res));
    // fetchData()
    props.addPostData(post);
    handleAddModal(false);
  }

  const handleLogout = (event) =>{
    event.preventDefault();
    deleteUserDataFromMemory();
    navigate("/");
  }

 
  const handleAddModal = (onOff) =>{
    setAddModal(onOff)
  }
  return (
    <div className="home">
      <div className="user-data-bar">
        <div>
          {username}
        </div>
        <button onClick={() => handleAddModal(true)}>Add Post</button>
        <button onClick={ (event) => handleLogout(event)}> Logout </button>
      </div>


      {addModal && (
        <div className="add-post">
          <table>
          <tr>
              <td>userID</td>
              <td><input value={post.userId} onChange={(e)=> setItem({...post , userId: e.target.value})} /></td>
          </tr>
          <tr>
              <td>Title</td>
              <td><input value={post.title} onChange={(e)=> setItem({...post , title: e.target.value})} /></td>
          </tr>
          <tr>
              <td>Body</td>
              <td><input value={post.body} onChange={(e)=> setItem({...post , body: e.target.value})} /></td>
          </tr>
          </table>
          <div>
          <button onClick={()=> handleAddPost(post)} > Save </button>
          <button onClick={()=> handleAddModal(false)} > cancel </button>
          </div>
        </div>
      )}


      {props.jsonData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th >PostID</th>
              <th >UserID</th>
              <th >Title</th>
              <th >Body</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.jsonData.slice(0,15).map((item) => (
              <tr key={item.id}>
                <Table item={item} handleDelete={handleDeletePost} handleEditPost={handleUpdatePost}/>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    jsonData: state.jsonApi.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveApiData: (props) => dispatch(saveApiData(props)),
    deletePost: (id) => dispatch(deletePost({id : id})),
    updatePostData: (props) => dispatch(updatePost(props)),
    addPostData: (props) => dispatch(addPost(props)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
