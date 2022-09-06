import React, { memo, useState } from "react";
import "./modal.css"
const Table = ({ item , handleDelete , handleEditPost }) => {
  const [modal , setModal] = useState(false);
  const handleModal = (onOff) =>{
    setModal(onOff);
  }
  return (
    <>
      <td>{item.id}</td>
      <td>{item.userId}</td>
      <td>{item.title}</td>
      <td>{item.body}</td>
      <td><button onClick={()=> handleModal(true)}>edit</button><button onClick={() => handleDelete(item.id)}>delete</button></td>

      { modal && <Modal item={item} handleEditPost={handleEditPost} handleModal={handleModal}/>}
    </>
  );
};

const Modal = ({item , handleEditPost, handleModal}) =>{
  const [post, setItem] = useState({
    id : item.id,
    userId: item.userId,
    title: item.title,
    body: item.body
  })
 return(
 <div className="modal">
    <input value={post.userId} onChange={(e)=> setItem({...post,userId : e.target.value})}/>
    <input value={post.title} onChange={(e)=> setItem({...post,title : e.target.value})} />
    <input value={post.body} onChange={(e)=> setItem({...post,body : e.target.value})} />
    <div>
      <button onClick={()=>{handleEditPost(post); handleModal(false)}} >edit</button>
      <button onClick={()=>{ handleModal(false)}} >cancel</button>
    </div>
  </div>
 )
}

export default memo(Table);
