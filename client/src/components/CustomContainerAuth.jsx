import { Container } from "@mui/material";
import PropTypes from "prop-types";

const CustomContainerAuth = ({ children }) => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "50%",
        right: "50%",
        transform: "translate(50%, -50%)",
      }}
    >
      {children}
    </Container>
  );
};

CustomContainerAuth.propTypes = {
  children: PropTypes.array.isRequired,
};
export default CustomContainerAuth;
