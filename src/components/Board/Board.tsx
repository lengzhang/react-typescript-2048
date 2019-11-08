import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import BoardCell from "../BoardCell";

const useStyles = makeStyles<Theme>(theme => {
  return createStyles({
    root: {
      position: "relative",
      width: "50vw",
      maxWidth: 640,
      height: "50vw",
      maxHeight: 640,

      [theme.breakpoints.down("xs")]: {
        width: "90vw",
        height: "90vw"
      },

      backgroundColor: "#a1887f",
      borderRadius: 4
    }
  });
});

interface MouseEventHandler {
  (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
interface TouchEventHandler {
  (event: React.TouchEvent<HTMLDivElement>): void;
}
interface BoardProps {
  onMouseDown?: null | MouseEventHandler;
  onMouseUp?: null | MouseEventHandler;
  onMouseLeave?: null | MouseEventHandler;
  onTouchStart?: null | TouchEventHandler;
  onTouchEnd?: null | TouchEventHandler;
}
const Board: React.FC<BoardProps> = ({ children, ...slideHandlers }) => {
  const classes = useStyles({});
  const cells: any[][] = Array(4).fill(Array(4).fill(null));

  return (
    <div className={classes.root} {...slideHandlers}>
      {cells.map((row, x) => {
        return row.map((cell, y) => {
          return <BoardCell key={`board-cell-${x}-${y}`} x={x} y={y} />;
        });
      })}
      {children}
    </div>
  );
};

export default Board;
