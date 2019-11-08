import * as React from "react";
import cx from "classnames";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import MuiTypography from "@material-ui/core/Typography";

import { CellProps } from "./types";

const colors = {
  "color-2": "#ffb74d",
  "color-4": "#ff8a65",
  "color-8": "#ffa726",
  "color-16": "#ff7043",
  "color-32": "#ff9800",
  "color-64": "#ff5722",
  "color-128": "#fb8c00",
  "color-256": "#f4511e",
  "color-512": "#f57c00",
  "color-1024": "#e64a19",
  "color-2048": "#ef6c00",
  "color-4096": "#d84315",
  "color-8192": "#e65100"
};

const useStyles = makeStyles<Theme, Omit<CellProps, "className">>(theme => {
  const width = "(100% - 5 * 10px) / 4";
  return createStyles({
    root: ({ x, y, value }) => {
      return {
        position: "absolute",
        top: `calc(${width}  * ${y} + 10px * ${y + 1})`,
        left: `calc(${width} * ${x} + 10px * ${x + 1})`,

        width: `calc(${width})`,
        height: `calc(${width})`,

        backgroundColor: colors[`color-${value}`],
        borderRadius: 4,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "& > *": {
          color: "white",
          userSelect: "none"
        }
      };
    }
  });
});

// new:   from === null && to !== null
// move:  from !== null && to === null
// merge: from !== null && to !== null
// stay:  from === null && to === null
const Cell: React.FC<CellProps> = ({ className = "", x, y, value }) => {
  const classes = useStyles({ x, y, value });

  return (
    <div className={cx(classes.root, className)}>
      <MuiTypography variant="h5">{value}</MuiTypography>
    </div>
  );
};

export default Cell;
