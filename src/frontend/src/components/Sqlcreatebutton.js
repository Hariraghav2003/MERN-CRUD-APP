import { ToastContainer, toast } from "react-toastify";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import { ImCross } from "react-icons/im";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import "react-toastify/dist/ReactToastify.css";
import { FaTrashCan } from "react-icons/fa6";
export default function Sqlcreatebutton() {
  const [open, setOpen] = React.useState(false);
  const [formData,setFormData]=React.useState({
    Name:"",
    Email :"",
    Phone: "",
    Address :""
  })
  // Open dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Close dialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleChange =()=>{

  }

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {};

    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/coursedetails`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload }),
          credentials: "include",
        }
      );

      if (res.ok) {
        toast.success("New user added");
        handleClose();
      } else if (res.status === 409) {
        toast.warning("User already exists");
      } else {
        toast.error("Failed to add user");
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
            <span>Data</span>
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
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="Email"
            name="Email"
            label="Email"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="Phone"
            name="Phone"
            label="Phone"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="Address"
            name="Address"
            label="Address"
            fullWidth
            variant="standard"
            onChange={handleChange}
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
