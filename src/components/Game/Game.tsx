import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import Board from "../Board";
import { Cell, CellNew, CellMove, CellMerge } from "../Cell";

import NewGameButton from "./NewGameButton";
import Header from "./Header";
import DoneCover from "./DoneCover";

import useGame from "./useGame";

import useSlide from "../../hooks/useSlide";

const useStyles = makeStyles<Theme>(theme => {
  return createStyles({
    root: {
      display: "flex",
      justifyContent: "center",

      "& > div": {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }
    },
    controller: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    }
  });
});

const Game: React.FC = () => {
  const {
    grid,
    score,
    bestScore,
    step,
    isDone,
    changing,
    onNewGame,
    slideTo
  } = useGame();
  const classes = useStyles({});

  const slideHandlers = useSlide(slideTo, changing);

  return (
    <div className={classes.root}>
      <div>
        <Header step={step} score={score} bestScore={bestScore} />
        <NewGameButton onNewGame={onNewGame} />
        <Board {...slideHandlers}>
          {grid !== null &&
            grid.map(row => {
              return row.map(cell => {
                if (cell === null) return null;
                // stay:  from === null && to === null
                // new:   from === null && to !== null
                // move:  from !== null && to === null
                // merge: from !== null && to !== null
                const { id, from, to, final } = cell;
                const key = `grid-cell-${final.x}-${final.y}-${
                  final.value
                }-${id}`;
                // new
                if (from === null && to !== null) {
                  return <CellNew key={key} final={final} />;
                }
                // move
                if (from !== null && to === null) {
                  return <CellMove key={key} from={from} final={final} />;
                }
                // merge
                if (from !== null && to !== null) {
                  return (
                    <CellMerge key={key} from={from} to={to} final={final} />
                  );
                }
                // stay
                return <Cell key={key} {...final} />;
              });
            })}
          <DoneCover isDone={isDone} />
        </Board>
      </div>
    </div>
  );
};

export default Game;
