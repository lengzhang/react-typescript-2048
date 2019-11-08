import * as React from "react";
import cx from "classnames";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import MuiTypography from "@material-ui/core/Typography";

const useStyles = makeStyles<Theme>(theme => {
  return createStyles({
    root: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",

      backgroundColor: "rgba(0,0,0,0.3)",

      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "& > h4": {
        color: "white"
      }
    },
    animation: {
      transformOrigin: "center",
      animationFillMode: "forwards",
      animationTimingFunction: "ease-in-out",
      animationName: "$zoomIn",
      animationDelay: "0s",
      animationDuration: "0.55s"
    },
    "@keyframes zoomIn": {
      "0%": {
        transform: "scale(0)",
        borderRadius: "50%"
      },
      "50%": {
        borderRadius: "50%"
      },
      "100%": {
        transform: "scale(1)",
        borderRadius: "0%"
      }
    }
    // "@keyframes radius": {
    //   from: {
    //     borderRadius: "50%"
    //   },
    //   to: {
    //     borderRadius: "0%"
    //   }
    // }
  });
});

const DoneCover: React.FC<{ isDone: boolean }> = ({ isDone }) => {
  const classes = useStyles({});

  if (!isDone) return null;

  return (
    <div className={cx(classes.root, classes.animation)}>
      <MuiTypography variant="h4">Thanks for Playing</MuiTypography>
    </div>
  );
};

export default DoneCover;
