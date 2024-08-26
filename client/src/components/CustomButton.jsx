import { Button } from "@mui/material";
import PropTypes from "prop-types";

const CustomButton = ({ onClick, children }) => {
  return (
    <Button
      sx={{
        display: "block",
        color: "black",
        fontSize: { xs: "15px", md: "17px" },
        margin: "0 auto",
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
export default CustomButton;
