import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const UpdateUser = () => {
  const [user, setUser] = useState({});
  const nameRef = useRef();
  const emailRef = useRef();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:5000/users/${id}`)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }, []);
  const handleUpdatedUser = (e) => {
    e.preventDefault();
    console.log("aaa");
  };
  return (
    <div>
      <h2>This is Update User {user._id}</h2>
      <form onSubmit={handleUpdatedUser}>
        <input type="text" ref={nameRef} />
        <input type="email" name="" id="" ref={emailRef} />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default UpdateUser;
