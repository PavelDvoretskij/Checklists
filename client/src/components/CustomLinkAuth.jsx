import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const CustomLinkAuth = ({ to, children }) => {
  return (
    <Link
      underline="none"
      component={NavLink}
      color="#000"
      fontSize={{ xs: "15px", md: "17px" }}
      fontFamily={["Open Sans", "sans-serif"].join(",")}
      to={to}
    >
      {children}
    </Link>
  );
};

CustomLinkAuth.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};
export default CustomLinkAuth;
