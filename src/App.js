import React, { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import Formtable from './components/Formtable.jsx';

axios.defaults.baseURL = "https://curd-backend-naxl.onrender.com/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    id: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    id: ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;

    // Check if the input is a number and is at most 10 digits long
    if (name === "mobile" && !/^\d{0,10}$/.test(value)) {
      // If not at most 10 digits, do not update the state
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/create", formData);
      if (response.data.success) {
        setAddSection(false);
        alert(response.data.message);
        fetchData(); // Fetch data after successful submission
        setFormData({
          name: "",
          email: "",
          mobile: ""
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("/users");
      if (response.data.success) {
        setDataList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`);
      alert(response.data.message);
      fetchData(); // Fetch data after successful deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEdit = (el) => {
    setFormDataEdit({
      name: el.name,
      email: el.email,
      mobile: el.mobile,
      id: el._id
    });
    setEditSection(true);
  };

  const handleEditChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/users/${formDataEdit.id}`, formDataEdit);
      if (response.data.success) {
        setEditSection(false);
        alert(response.data.message);
        fetchData(); // Fetch data after successful update
        setFormDataEdit({
          name: "",
          email: "",
          mobile: "",
          id: ""
        });
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleclose = () => {
    setAddSection(false);
    setEditSection(false); // Close edit section if open
  };

  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>
      {addSection && (
        <Formtable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={handleclose}
          formData={formData}
          isEdit={false}
        />
      )}
      {editSection && (
        <Formtable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditChange}
          handleclose={handleclose}
          formData={formDataEdit}
          isEdit={true}
        />
      )}
      <div className="tablecontainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                    <button className='btn btn-delete' onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">
                  <p>No Data</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
