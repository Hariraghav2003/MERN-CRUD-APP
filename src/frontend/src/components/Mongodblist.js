/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";
import { toast } from "react-toastify";
import { Table, Space, Input, Empty } from "antd";
import { ImCross } from "react-icons/im";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Loading from "./Loading";
import "react-toastify/dist/ReactToastify.css";

function Mongodblist({ refreshKey }) {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
  });
  const [users, setUsers] = useState([]);
  const [filteredusers, setFiltereduserdata] = useState([]);
  const [errors, setErrors] = useState({});
  const [selectedId, setSelectedId] = useState(null);

  const handleClickOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setFormData({ Name: "", Email: "", Phone: "", Address: "" });
    setErrors({});
    setSelectedId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const { Name, Email, Phone, Address } = formData;
    const newErrors = {};
    if (!Name.trim()) newErrors.Name = "Name is required";
    if (!Email.trim()) newErrors.Email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email))
      newErrors.Email = "Enter a valid email";
    if (!Phone.trim()) newErrors.Phone = "Phone is required";
    else if (!/^\d{7,15}$/.test(Phone))
      newErrors.Phone = "Phone must be 7-15 digits only";
    if (!Address.trim()) newErrors.Address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSearch = (value) => setSearchText(value);

  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/mongo/getallusers`
      );
      const data = await res.json();
      setUsers(data || []);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshKey]);

  useEffect(() => {
    const filtered = users.filter((u) =>
      Object.values(u).some((field) =>
        String(field).toLowerCase().includes(searchText.toLowerCase())
      )
    );
    setFiltereduserdata(filtered);
  }, [searchText, users]);

  const getvaluetoupdate = (id) => {
    const selected = users.find(
      (item) => item._id === id || item.ID === id
    );
    if (selected) {
      setFormData({
        Name: selected.Name || "",
        Email: selected.Email || "",
        Phone: selected.Phone || "",
        Address: selected.Address || "",
      });
      setSelectedId(id);
      setOpen(true);
    }
  };

  const Update = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    const id=selectedId
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/mongo/updateuser/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData }),
        }
      );
      console.log(res);
      
      if (res.ok) {
        toast.success("User details updated successfully!");
        fetchData();
        handleClose();
      } else if (res.status === 409) {
        toast.warning("User already exists!");
      }
    } catch (err) {
      toast.error("Error occurred while updating!");
    }
  };

  const Delete = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/mongo/deleteuser/${id}`,
        { method: "DELETE" }
      );
      if (res.ok) {
        toast.success("User deleted successfully!");
        fetchData();
      } else {
        toast.error("Failed to delete user.");
      }
    } catch (err) {
      toast.error("Error occurred while deleting!");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "Name",
      key: "Name",
      sorter: (a, b) => a.Name.localeCompare(b.Name),
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      sorter: (a, b) => a.Email.localeCompare(b.Email),
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
      sorter: (a, b) => a.Address.localeCompare(b.Address),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        const userId = record._id || record.ID;
        return (
          <Space>
            <p
              onClick={() => getvaluetoupdate(userId)}
              style={{ cursor: "pointer" }}
            >
              <MdEdit />
            </p>
            <p
              onClick={() => Delete(userId)}
              style={{ cursor: "pointer", color: "red" }}
            >
              <FaTrashCan />
            </p>
          </Space>
        );
      },
    },
  ];

  if (loading) return <Loading />;

  return (
    <div>
      <div className="w-100 d-flex justify-content-end">
        <Input.Search
          placeholder="Search User"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}
          enterButton
          style={{ marginBottom: "16px", width: "300px", zIndex: "2" }}
        />
      </div>

      {filteredusers.length === 0 ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "50vh" }}
        >
          <Empty description="No user data available" />
        </div>
      ) : (
        <Table
          dataSource={filteredusers}
          columns={columns}
          rowKey={(record) => record._id || record.ID}
        />
      )}

      {/* Update Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Update User</span>
            <ImCross style={{ cursor: "pointer" }} onClick={handleClose} />
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            variant="standard"
            value={formData.Name}
            onChange={handleChange}
            error={!!errors.Name}
            helperText={errors.Name}
          />
          <TextField
            required
            margin="dense"
            id="Email"
            name="Email"
            label="Email"
            fullWidth
            variant="standard"
            value={formData.Email}
            onChange={handleChange}
            error={!!errors.Email}
            helperText={errors.Email}
          />
          <TextField
            required
            margin="dense"
            id="Phone"
            name="Phone"
            label="Phone"
            fullWidth
            variant="standard"
            value={formData.Phone}
            onChange={handleChange}
            error={!!errors.Phone}
            helperText={errors.Phone}
          />
          <TextField
            required
            margin="dense"
            id="Address"
            name="Address"
            label="Address"
            fullWidth
            variant="standard"
            value={formData.Address}
            onChange={handleChange}
            error={!!errors.Address}
            helperText={errors.Address}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={Update}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Mongodblist;
