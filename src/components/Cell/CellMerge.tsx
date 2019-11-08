import * as React from "react";

import { CellMergeProps } from "./types";

import CellMove from "./CellMove";
import CellNew from "./CellNew";

const CellMerge: React.FC<CellMergeProps> = ({ from, to, final }) => {
  return (
    <>
      <CellMove from={to} final={{ ...final, value: to.value }} hideAfterMove />
      <CellMove
        from={from}
        final={{ ...final, value: from.value }}
        hideAfterMove
      />
      <CellNew final={final} />
    </>
  );
};

export default CellMerge;
