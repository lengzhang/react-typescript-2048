import { Grid, GridCell, Cell } from "./types";

const SIZE = 4;

function generateMatrix(size: number) {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => null)
  );
}

export function generateGrid(grid?: (number | null)[][]): Grid {
  if (grid === undefined) return generateMatrix(SIZE);
  return grid.map((row, y) => {
    return row.map((value, x) => {
      if (value === null) return null;
      const cell: Cell = { x, y, value };
      const id = new Date().getTime();
      return { id, from: null, to: null, final: cell };
    });
  });
}

export function converGrid(grid: Grid): (number | null)[][] {
  return grid.map(row => {
    return row.map(cell => {
      if (cell === null) return null;
      return cell.final.value;
    });
  });
}

function getEmptyCoords(grid: Grid): [number, number][] {
  const list = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === null) list.push([x, y]);
    }
  }
  return list;
}

export function randomSetCell(_grid: Grid, numOfCells: number = 1) {
  const grid = _grid.map<(GridCell | null)[]>(row =>
    row.map<GridCell | null>((cell: GridCell | null) => cell)
  );
  const list = getEmptyCoords(grid);
  if (list.length < numOfCells) return grid;
  for (let i = 0; i < numOfCells; i++) {
    const index = Math.floor(Math.random() * list.length);
    const [x, y] = list[index];
    const cell: Cell = { x, y, value: 2 };
    const id = new Date().getTime();
    grid[y][x] = { id, from: null, to: cell, final: cell };
    list.splice(index, 1);
  }
  return grid;
}

export function move(_grid: Grid, type: "up" | "down" | "left" | "right") {
  const grid = _grid.map<(GridCell | null)[]>(row =>
    row.map<GridCell | null>((cell: GridCell | null) => cell)
  );
  let score = 0,
    changed = false;
  for (let i = 0; i < SIZE; i++) {
    let j = 0,
      k = 0;
    while (k < SIZE) {
      const [x1, y1, x2, y2] =
        type === "up"
          ? [i, j, i, k]
          : type === "down"
          ? [i, SIZE - 1 - j, i, SIZE - 1 - k]
          : type === "left"
          ? [j, i, k, i]
          : [SIZE - 1 - j, i, SIZE - 1 - k, i];
      const from = grid[y2][x2];
      const to = grid[y1][x1];
      if (from === null) {
        k++;
        continue;
      }
      // Stay
      if (j === k) {
        const id = new Date().getTime();
        const final = { x: x1, y: y1, value: from.final.value };
        grid[y1][x1] = { id, from: null, to: null, final };
        k++;
        continue;
      }
      // Move
      if (to === null) {
        if (!changed) changed = true;
        const id = new Date().getTime();
        const final = { x: x1, y: y1, value: from.final.value };
        console.log("move", from, to, final);
        grid[y1][x1] = { id, from: { ...from.final }, to: null, final };
        grid[y2][x2] = null;
        k++;
        continue;
      }
      // Merge
      if (from.final.value === to.final.value) {
        if (!changed) changed = true;
        const value = from.final.value + to.final.value;
        console.log(
          `merge value: ${from.final.value} + ${to.final.value} = ${value}`
        );

        score += value;
        const id = new Date().getTime();
        const final = { x: x1, y: y1, value };
        grid[y1][x1] = {
          id,
          from: { ...from.final },
          to: { ...to.final },
          final
        };
        grid[y2][x2] = null;
        j++;
        k++;
        continue;
      }
      j++;
    }
  }
  return { score, changed, grid };
}

export function removeAnimation(grid: Grid) {
  return grid.map<(GridCell | null)[]>(row => {
    return row.map<GridCell | null>((cell: GridCell | null) => {
      if (cell === null) return null;
      const id = new Date().getTime();
      console.log("clear", {
        id,
        from: null,
        to: null,
        final: { ...cell.final }
      });

      return { id, from: null, to: null, final: { ...cell.final } };
    });
  });
}

export function isDone(grid: Grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const cur = grid[y][x];
      if (cur === null) return false;
      const left = y - 1 < 0 ? undefined : grid[y - 1][x],
        up = x - 1 < 0 ? undefined : grid[y][x - 1];
      if (left === undefined && up === undefined) continue;
      if (left !== undefined && left.final.value === cur.final.value)
        return false;
      if (up !== undefined && up.final.value === cur.final.value) return false;
    }
  }
  return true;
}
