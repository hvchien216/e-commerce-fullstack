import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";

interface Props {
  color?: string;
  label?: string;
}

const useStyles = makeStyles({
  root: {
    display: "inline-block",
    height: "auto",
    margin: " 0 8px 0 0",
    padding: "0 7px",
    fontSize: "12px",
    lineHeight: "20px",
    whiteSpace: "nowrap",
    background: (props: Props) => (props.color ? props.color : "#fafafa"),
    // border: "1px solid #d9d9d9",
    borderRadius: "2px",
    opacity: "1",
    transition: "all .3s",
  },
});

const Tag: FC<Props> = (props) => {
  const classes = useStyles(props);
  return <span className={classes.root}>{props.label}</span>;
};

export default Tag;
