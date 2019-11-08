import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import { CellNewProps } from "./types";

import Cell from "./Cell";

const useStyles = makeStyles<Theme>(theme => {
  return createStyles({
    root: {
      transform: "scale(0)",
      animationFillMode: "forwards",
      animationTimingFunction: "cubic-bezier(0.25, 0, 0.5, 1)",
      animationName: "$zoomIn",
      animationDelay: "0.25s",
      animationDuration: "0.25s"
    },
    "@keyframes zoomIn": {
      from: { transform: "scale(0)" },
      to: { transform: "scale(1)" }
    }
  });
});

const CellNew: React.FC<CellNewProps> = ({ final }) => {
  const classes = useStyles({});
  return (
    <Cell
      className={classes.root}
      x={final.x}
      y={final.y}
      value={final.value}
    />
  );
};

export default CellNew;
