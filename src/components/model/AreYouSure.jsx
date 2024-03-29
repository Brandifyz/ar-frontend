import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
const AreYouSure = ({ open, handleClose, style, message = "delete" }) => {
  useEffect(() => {
    console.log(open);
  }, [open]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="row">
            <h5>
              <b>Are you sure you want to {message}</b>
            </h5>
          </div>
          <div className="row my-2">
            <div className="col-sm-6">
              <button className="w-100 btn btn-dark" onClick={handleClose}>
                No
              </button>
            </div>
            <div className="col-sm-6">
              <button className="w-100 btn btn-dark">Yes</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AreYouSure;
