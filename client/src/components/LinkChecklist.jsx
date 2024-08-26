import { Link as RouterLink } from "react-router-dom";
import { Link, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

const LinkChecklist = ({ to, title, description, user }) => {
  const theme = useTheme();
  const userId = useSelector((state) => state.user.userId);
  const myChecklist = userId == user;

  return (
    <Link
      component={RouterLink}
      underline="none"
      to={to}
      p="0 10px"
      bgcolor={theme.palette.primary.main}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
        borderRadius: "10px",
        fontSize: { xs: "13px", md: "17px" },
      }}
    >
      {myChecklist && (
        <Typography
          variant="caption"
          color="#1FF778"
          sx={{ fontSize: { xs: "14px", md: "17px" } }}
        >
          Это ваш чеклист
        </Typography>
      )}
      <Typography
        lineHeight={1.3}
        variant="caption"
        color="secondary"
        sx={{ fontSize: { xs: "17px", md: "21px" } }}
      >
        {title}
      </Typography>
      <Typography
        variant="caption"
        color="white"
        sx={{ fontSize: { xs: "15px", md: "17px" } }}
      >
        {description}
      </Typography>
    </Link>
  );
};

LinkChecklist.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.string,
};
export default LinkChecklist;
