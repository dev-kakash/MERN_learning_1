import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);
  console.log(users);

  const handleDelete = (id) => {
    console.log(id);
    const url = `http://localhost:5000/users/${id}`;

    const proceed = window.confirm("Are you want to delete?");

    if (proceed) {
      fetch(url, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("deleted successfully");
            const remainingUsers = users.filter((user) => user._id !== id);
            setUsers(remainingUsers);
          }
        });
    }
  };
  return (
    <div>
      <h2>This is Users {users.length}</h2>
      <ul>
        {users?.map((user) => (
          <li>
            {user.name} ,{user.email}{" "}
            <Link to={`users/update/${user._id}`}>
              <button>Update</button>
            </Link>
            <button onClick={() => handleDelete(user._id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
