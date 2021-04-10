import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import { Box } from "@material-ui/core";

const Copyright: FC = () => {
  return (
    <Box style={{ margin: "40px 0 30px" }}>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Copyright © "}
        <MuiLink color="inherit" href="/">
          Chiến Anubis
        </MuiLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};
export default Copyright;
