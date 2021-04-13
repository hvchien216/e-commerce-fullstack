import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import { Box } from "@material-ui/core";

const Copyright: FC = () => {
  return (
    <Box style={{ margin: "40px 0 30px" }}>
      <Typography variant="body2" color="textSecondary" align="center">
        Hình ảnh thuộc bản quyền của{" "}
        <MuiLink color="inherit" href="https://bossgiay.vn/">
          Boss giày
        </MuiLink>
        {" | "}
        {"Copyright © "}
        <MuiLink color="inherit" href="/">
          Chiến Anubis
        </MuiLink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        Website chỉ dành cho mục đích học tập ( Phi thương mại )
      </Typography>
    </Box>
  );
};
export default Copyright;
