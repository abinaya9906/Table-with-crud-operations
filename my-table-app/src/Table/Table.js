import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const Table = () => {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    Experience: "",
    skills: "",
  });
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://crudcrud.com/api/d04cd813c3e24e008e10ca9fbec63bea/Abinaya")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item._id === id);
    setEditItemId(id);
    // Set the form data for editing separately
    setFormData({ ...itemToEdit });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://crudcrud.com/api/d04cd813c3e24e008e10ca9fbec63bea/Abinaya/${id}`
      )
      .then((response) => {
        console.log("Data deleted successfully:", response.data);
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if any of the input fields are empty
    if (
      !formData.name ||
      !formData.role ||
      !formData.Experience ||
      !formData.skills
    ) {
      alert("Please fill in all the fields");
      return; // Exit the function if any field is empty
    }
    if (editItemId) {
      delete formData["_id"];
      axios
        .put(
          `https://crudcrud.com/api/d04cd813c3e24e008e10ca9fbec63bea/Abinaya/${editItemId}`,
          formData
        )
        .then((response) => {
          console.log("Data updated successfully:", response.data);
          fetchData();
          setEditItemId(null);
          setFormData({ name: "", role: "", Experience: "", skills: "" });
        })
        .catch((error) => {
          console.error("Error updating data: ", error);
        });
    } else {
      // Add new data
      axios
        .post(
          "https://crudcrud.com/api/d04cd813c3e24e008e10ca9fbec63bea/Abinaya",
          formData
        )
        .then((response) => {
          console.log("Data added successfully:", response.data);
          fetchData();
          setFormData({ name: "", role: "", Experience: "", skills: "" });
        })
        .catch((error) => {
          console.error("Error adding data: ", error);
        });
    }
  };

  const sortData = (criteria) => {
    if (sortCriteria === criteria) {
      // If same criteria is clicked again, reverse the sorting direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // If sorting criteria changed, set it and default to ascending direction
      setSortCriteria(criteria);
      setSortDirection("asc");
    }
  };

  // Function to sort data based on the sorting criteria and direction
  const sortedData = [...data].sort((a, b) => {
    if (!sortCriteria) return 0; // If no sorting criteria, maintain original order
    const aValue = a[sortCriteria];
    const bValue = b[sortCriteria];
    if (sortDirection === "asc") {
      if (aValue < bValue) return -1;
      if (aValue > bValue) return 1;
      return 0;
    } else {
      if (aValue > bValue) return -1;
      if (aValue < bValue) return 1;
      return 0;
    }
  });

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="card mt-4">
            <div className="p-2 d-flex justify-content-between">
              <div className="text-white bg-primary font-weight-bold col-md-2 rounded shadow">
                Employee DataTable
              </div>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Role"
                />
                <input
                  type="number"
                  name="Experience"
                  value={formData.Experience}
                  onChange={handleChange}
                  placeholder="Experience"
                />
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="Skills"
                />
                {/* <button type="submit">{editItemId ? "Save" : "Add"}</button> */}
                <Button type="submit" className="info custom-button py-1">
                  {" "}
                  {editItemId ? "Save" : "Add"}
                </Button>
              </form>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered mt-4 shadow p-3 mb-5 bg-white rounded">
                  <thead>
                    <tr>
                      <th onClick={() => sortData("name")}>
                        Employee Name{" "}
                        {sortCriteria === "name" && (
                          <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                      </th>
                      <th onClick={() => sortData("role")}>
                        Role{" "}
                        {sortCriteria === "role" && (
                          <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                      </th>
                      <th onClick={() => sortData("Experience")}>
                        Experience(in years){" "}
                        {sortCriteria === "Experience" && (
                          <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                      </th>
                      <th onClick={() => sortData("skills")}>
                        Skills{" "}
                        {sortCriteria === "skills" && (
                          <span>{sortDirection === "asc" ? "▲" : "▼"}</span>
                        )}
                      </th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((item) => (
                      <tr key={item._id}>
                        <td>
                          {editItemId === item._id ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          ) : (
                            item.name
                          )}
                        </td>
                        <td>
                          {editItemId === item._id ? (
                            <input
                              type="text"
                              name="role"
                              value={formData.role}
                              onChange={handleChange}
                            />
                          ) : (
                            item.role
                          )}
                        </td>
                        <td>
                          {editItemId === item._id ? (
                            <input
                              type="number"
                              name="Experience"
                              value={formData.Experience}
                              onChange={handleChange}
                            />
                          ) : (
                            item.Experience
                          )}
                        </td>
                        <td>
                          {editItemId === item._id ? (
                            <input
                              type="text"
                              name="skills"
                              value={formData.skills}
                              onChange={handleChange}
                            />
                          ) : (
                            item.skills
                          )}
                        </td>
                        <td>
                          {editItemId === item._id ? (
                            <>
                              <Button
                                type="submit"
                                className="info custom-button"
                                onClick={handleSubmit}
                              >
                                Save
                              </Button>{" "}
                              <Button
                                type="submit"
                                className="info custom-button"
                                onClick={() => {
                                  setEditItemId(null);
                                  setFormData({
                                    name: "",
                                    role: "",
                                    Experience: "",
                                    skills: "",
                                  }); // Clear form fields
                                }}
                              >
                                Close
                              </Button>
                            </>
                          ) : (
                            <>
                              <Button
                                type="submit"
                                className="info custom-button"
                                onClick={() => handleEdit(item._id)}
                              >
                                Edit
                              </Button>{" "}
                              <Button
                                type="submit"
                                className="info custom-button"
                                onClick={() => handleDelete(item._id)}
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
