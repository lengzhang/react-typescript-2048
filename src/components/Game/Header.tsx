import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import MuiTypography from "@material-ui/core/Typography";
import MuiGrid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";

const useStyles = makeStyles<Theme>(theme => {
  return createStyles({
    root: {
      display: "flex",
      justify: "space-between",
      alignItems: "center",
      flexWrap: "wrap"
    },
    header: {
      marginBottom: theme.spacing(2)
    },
    block: {
      minWidth: 64,
      padding: 8,
      backgroundColor: "#bcaaa4",
      borderRadius: 4,

      display: "flex",
      flexDirection: "column",
      justify: "center",
      alignItems: "center",

      "& > span": {
        color: "#efebe9"
      },
      "& > h6": {
        color: "white"
      }
    }
  });
});

interface HeaderProps {
  step: number;
  score: number;
  bestScore: number;
}
const Header: React.FC<HeaderProps> = ({ step, score, bestScore }) => {
  const classes = useStyles({});

  const Block = React.memo(
    ({ title, value }: { title: string; value: number }) => {
      return (
        <div className={classes.block}>
          <MuiTypography variant="caption">{title}</MuiTypography>
          <MuiTypography variant="h6">{value}</MuiTypography>
        </div>
      );
    }
  );

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <MuiTypography variant="h3" display="inline">
          2048{" "}
        </MuiTypography>
        <MuiTypography variant="h6" display="inline">
          by{" "}
          <MuiLink
            color="inherit"
            underline="always"
            href="https://github.com/lengzhang"
          >
            Leng
          </MuiLink>
        </MuiTypography>
      </div>
      <MuiGrid container justify="flex-end" spacing={2} wrap="nowrap">
        <MuiGrid item>
          <Block title="Step" value={step} />
        </MuiGrid>
        <MuiGrid item>
          <Block title="Score" value={score} />
        </MuiGrid>
        <MuiGrid item>
          <Block title="Best" value={bestScore} />
        </MuiGrid>
      </MuiGrid>
    </div>
  );
};

export default React.memo(Header);
