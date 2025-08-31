import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { ImCross } from "react-icons/im";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Dynamodbcreatebutton({ onCreated }) {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    Name: "",
    Email: "",
    Phone: "",
    Address: "",
  });

  // New: state for errors
  const [errors, setErrors] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({
      Name: "",
      Email: "",
      Phone: "",
      Address: "",
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for the field as user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validate and set errors if any
  const validate = () => {
    const { Name, Email, Phone, Address } = formData;
    const newErrors = {};

    if (!Name.trim()) newErrors.Name = "Name is required";
    if (!Email.trim()) newErrors.Email = "Email is required";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(Email)) newErrors.Email = "Enter a valid email";
    }
    if (!Phone.trim()) newErrors.Phone = "Phone is required";
    else {
      const phoneRegex = /^\d{7,15}$/;
      if (!phoneRegex.test(Phone))
        newErrors.Phone = "Phone must be 7-15 digits only";
    }
    if (!Address.trim()) newErrors.Address = "Address is required";

    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const payload=formData
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/dynamo/createuser`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
          credentials: "include",
        }
      );

      if (res.status===201) {
        toast.success("New user added");
        handleClose();
        onCreated();
      } else if (res.status === 409) {
        toast.warning("User already exists");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="float-end pb-3">
        <Button
          onClick={handleClickOpen}
          style={{
            textTransform: "capitalize",
            fontSize: "15px",
            zIndex: 2,
            backgroundColor: "#1677FF",
            color: "white",
            padding: "5px 20px",
            borderRadius: "8px",
          }}
        >
          Add User &nbsp;
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Add New User</span>
            <span style={{ cursor: "pointer" }} onClick={handleClose}>
              <ImCross />
            </span>
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
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
