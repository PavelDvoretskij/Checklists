import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const CustomTextFieldChecklist = ({
  titleError,
  label,
  value,
  onChange,
  multiline,
  rows,
}) => {
  return (
    <TextField
      label={label}
      sx={titleError ? { border: "3px solid red" } : {}}
      margin="normal"
      variant="outlined"
      value={value}
      multiline={multiline}
      rows={rows}
      InputLabelProps={{ style: { fontSize: 13, color: "#000" } }}
      inputProps={{ style: { fontSize: 25, textAlign: "center" } }}
      onChange={onChange}
    />
  );
};

CustomTextFieldChecklist.propTypes = {
  titleError: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  multiline: PropTypes.bool.isRequired,
  rows: PropTypes.number.isRequired,
};
export default CustomTextFieldChecklist;
