import { useEffect, useState } from "react";
import { FiMail, FiPhone, FiGlobe, FiHeart, FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import "./App.css";


const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState({});
 


 
  async function getUsersDetails() {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/himanshu7377/products_data/main/products.json"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getUsersDetails();
  }, []);

  const handleHeartClick = (id) => {
    const updatedUsers = users.map((user) => {
      if (user.id === id) {
        return { ...user, liked: !user.liked };
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditMode(true);
    setEditedUser(user);
  };

  const handleDeleteClick = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleSaveEdit = () => {
    const updatedUsers = users.map((user) => {
      if (user.id === editedUser.id) {
        return editedUser;
      }
      return user;
    });
    setUsers(updatedUsers);
    setEditMode(false);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setEditedUser({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="user-grid">
      {users.map((user) => (
        <div key={user.id} className="user-box">
          <div className="upperbox">
          <div className="container">
            <div className="square">
              <div className="circle"></div>
              <div className="half-rectangle">
                <p className="half-rectangle-text">you are using an outdated API endpoint</p>
              </div>
            </div>
          </div>
          </div>
          
          <div className="user-details">
            <h3>{user.name}</h3>
            <p>
              <FiMail />  {user.email}
            </p>
            <p>
              <FiPhone /> {user.phone}
            </p>
            <p>
              <FiGlobe /> {user.website}
            </p>
          </div>
          <hr className="hr" />
          <div className="button-container">
            <div onClick={() => handleHeartClick(user.id)}>
              <FiHeart fill={user.liked ? "red" : "none"} stroke="red" size={20} />
            </div >
            <div className="divider">|</div>
            <div onClick={() => handleEditClick(user)} className="edit-button">
              <FiEdit size={20} />
            </div>
            <div className="divider">|</div>
            <div onClick={() => handleDeleteClick(user.id)} className="delete-button">
              <FaTrash fill={"grey"} size={20} />
            </div>
          </div>
        </div>
      ))}
      {editMode && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Basic Modal</h2>
              <span onClick={handleCancelEdit}>&times;</span>
            </div>
            <hr />
            <div className="form-group">
              <label><span className="required-field"> Name:</span></label>
              <input type="text" name="name" value={editedUser.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><span className="required-field"> Email:</span></label>
              <input type="text" name="email" value={editedUser.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><span className="required-field"> Phone:</span></label>
              <input type="text" name="phone" value={editedUser.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label><span className="required-field"> Website:</span></label>
              <input type="text" name="website" value={editedUser.website} onChange={handleChange} />
            </div>
            <div className="modal-buttons">
              <button onClick={handleCancelEdit}>Cancel</button>
              <button onClick={handleSaveEdit}>OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
