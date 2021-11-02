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
    console.log(user);
    const url = `http://localhost:5000/users/${id}`;

    const proceed = window.confirm("Are you want to update?");
    if (proceed) {
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    }
  };
  const handleName = (e) => {
    const updatedName = e.target.value;
    const updatedUser = { ...user };
    updatedUser.name = updatedName;
    setUser(updatedUser);
  };
  const handleEmail = (e) => {
    const updatedEmail = e.target.value;
    const updatedUser = { ...user };
    updatedUser.email = updatedEmail;
    setUser(updatedUser);
  };
  return (
    <div>
      <h2>This is Update User {user._id}</h2>
      <form onSubmit={handleUpdatedUser}>
        <input type="text" value={user.name || ""} onChange={handleName} />
        <input type="email" value={user.email || ""} onChange={handleEmail} />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};

export default UpdateUser;
