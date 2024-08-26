import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const CustomTextFieldAuth = ({ label, value, type, onChange }) => {
  return (
    <TextField
      label={label}
      margin="normal"
      variant="outlined"
      type={type}
      autoComplete="current-password"
      value={value}
      onChange={onChange}
      InputLabelProps={{ style: { fontSize: 13, color: "#000" } }}
      inputProps={{ style: { fontSize: 17, padding: 10 } }}
    />
  );
};

CustomTextFieldAuth.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default CustomTextFieldAuth;
