import React, { useEffect, useState } from "react";
import { Box, Button, TextField, Typography, Modal, InputAdornment } from "@mui/material";
import { VacationType } from "../../Models/VacationModel";
import { convertDateFormat, getTodayDate } from "../../utils/utils";
import { appConfig } from "../../utils/appConfig";
import { createFileFromLocalImage } from "../../utils/fileCreateUtils";

interface EditVacationProps {
  vacation: VacationType;
  open: boolean;
  onClose: () => void;
  onSave: (vacation: VacationType) => void;
  isEditPopup: boolean; // true for Edit, false for Add
}

export const EditVacation = ({ vacation, open, onClose, onSave, isEditPopup }: EditVacationProps) => {
  const [editedVacation, setEditedVacation] = useState<VacationType>(vacation);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [files, setFiles] = useState<File | string>("");

  useEffect(() => {
    setImagePreview(appConfig.imagesFolder + (vacation.image ? vacation.image : "NoImage.jpg"));
  }, [vacation]);

  const handleChange = async (e: any) => {
    const { name, value, files } = e.target;

    if (name === "image" && files.length > 0) {
      const file = files[0];
      setEditedVacation((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
      setFiles(file);
    } else {
      setEditedVacation((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    editedVacation.start_date = convertDateFormat(editedVacation.start_date);
    editedVacation.end_date = convertDateFormat(editedVacation.end_date);

    if (files === "") {
      const lastModifiedDate = new Date();
      const lastModified = lastModifiedDate.getTime();
      const file = await createFileFromLocalImage(imagePreview, String(vacation.image), lastModified);
      setFiles(file);
      editedVacation.image = file;
    }

    onSave(editedVacation);
    onClose();
  };

  const handleError = (e: any) => {
    e.target.src = appConfig.imagesFolder + "NoImage.jpg";
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: "80vh", // Set max height to 80% of the viewport height
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto", // Add vertical scroll bar if content overflows
        }}
      >
        <Typography variant="h6" component="h2">
          {isEditPopup ? "Edit Vacation" : "Add Vacation"}
        </Typography>
        <TextField
          fullWidth
          label="Destination"
          name="destination"
          value={editedVacation.destination}
          onChange={handleChange}
          margin="normal"
          inputProps={{
            maxLength: 255,
          }}
        />
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={editedVacation.description}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={3}
        />
        <TextField
          fullWidth
          label="Price"
          name="price"
          value={editedVacation.price}
          onChange={handleChange}
          margin="normal"
          type="number"
          inputProps={{
            min: 0,
          }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          fullWidth
          label="Start Date"
          name="start_date"
          type="date"
          value={convertDateFormat(editedVacation.start_date)}
          inputProps={{
            min: !isEditPopup ? getTodayDate() : undefined,
          }}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="End Date"
          name="end_date"
          type="date"
          value={convertDateFormat(editedVacation.end_date)}
          inputProps={{
            min: convertDateFormat(editedVacation.start_date),
          }}
          onChange={handleChange}
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
        >
          Upload Image
          <input
            type="file"
            accept="image/*"
            name="image"
            hidden
            onChange={handleChange}
          />
        </Button>
        {imagePreview && (
          <Box
            component="img"
            src={imagePreview}
            onError={handleError}
            alt="Preview"
            sx={{ mt: 2, width: '100%', maxHeight: 200, objectFit: 'cover' }}
          />
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button onClick={onClose} color="warning" sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            {isEditPopup ? "Update" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
