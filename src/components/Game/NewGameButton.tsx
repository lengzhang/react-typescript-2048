import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import MuiButton from "@material-ui/core/Button";

const useStyles = makeStyles<Theme>(theme => {
  const unit = theme.spacing();
  return createStyles({
    contained: {
      margin: unit * 2,
      marginLeft: "auto",
      backgroundColor: "#ffa726",
      "&:hover": {
        backgroundColor: "#fb8c00"
      }
    }
  });
});
interface NewGameButtonProps {
  onNewGame: () => void;
}
const NewGameButton: React.FC<NewGameButtonProps> = ({ onNewGame }) => {
  const classes = useStyles({});
  return (
    <MuiButton
      classes={{
        contained: classes.contained
      }}
      variant="contained"
      color="primary"
      onClick={onNewGame}
    >
      New Game
    </MuiButton>
  );
};

export default React.memo(NewGameButton);
