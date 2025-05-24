import React, { useEffect, useState } from "react";
import axios from "axios";
import TopNavBar from "../ui/TopNavBar/TopNavBar";
import Footer from "../ui/Footer/Footer";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ f_name: "", l_name: "", email: "", password: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios
      .get("http://localhost:5000/manageusers/getAll")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      axios
        .put(`http://localhost:5000/manageusers/update/${editUserId}`, formData)
        .then(() => {
          fetchUsers();
          setFormData({ f_name: "", l_name: "", email: "", password: "" });
          setIsEditing(false);
          setEditUserId(null);
        })
        .catch((err) => console.error("Error updating user:", err));
    } else {
      axios
        .post("http://localhost:5000/manageusers/create", formData)
        .then(() => {
          fetchUsers();
          setFormData({ f_name: "", l_name: "", email: "", password: "" });
        })
        .catch((err) => console.error("Error creating user:", err));
    }
  };

  const handleEdit = (user) => {
    setFormData({
      f_name: user.f_name,
      l_name: user.l_name,
      email: user.email,
      password: "", // Leave empty for security
    });
    setIsEditing(true);
    setEditUserId(user._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:5000/manageusers/delete/${id}`)
        .then(() => fetchUsers())
        .catch((err) => console.error("Error deleting user:", err));
    }
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "40px auto",
      padding: "20px",
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "20px",
    },
    form: {
      marginBottom: "30px",
    },
    input: {
      padding: "8px",
      margin: "5px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    submitBtn: {
      padding: "10px 16px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginTop: "10px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#333",
      color: "white",
      padding: "12px 15px",
      textAlign: "left",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid #ccc",
    },
    editBtn: {
      backgroundColor: "#007bff",
      color: "white",
      padding: "6px 10px",
      marginRight: "8px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    deleteBtn: {
      backgroundColor: "#dc3545",
      color: "white",
      padding: "6px 10px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <>
    <TopNavBar/>
    <div style={styles.container}>
        
      <h2 style={styles.header}>{isEditing ? "Edit User" : "Add New User"}</h2>

      <form style={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="f_name"
          placeholder="First Name"
          value={formData.f_name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="l_name"
          placeholder="Last Name"
          value={formData.l_name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
          required={!isEditing} // Only required when creating
        />
        <br />
        <button type="submit" style={styles.submitBtn}>
          {isEditing ? "Update User" : "Create User"}
        </button>
      </form>

      <h2 style={styles.header}>All Registered Users</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={styles.td}>
                {user.f_name} {user.l_name}
              </td>
              <td style={styles.td}>{user.email}</td>
              <td style={styles.td}>
                <button style={styles.editBtn} onClick={() => handleEdit(user)}>Edit</button>
                <button style={styles.deleteBtn} onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
<Footer/>
    </>
      );
};

export default Users;
