import { useReducer } from "react";

interface State {
  isDown: boolean;
  x: number | null;
  y: number | null;
}

const initialState: State = {
  isDown: false,
  x: null,
  y: null
};

type Action =
  | {
      type: "reset";
    }
  | {
      type: "set-is-down";
      x: number;
      y: number;
    };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "reset":
      return initialState;

    case "set-is-down":
      return {
        ...state,
        isDown: true,
        x: action.x,
        y: action.y
      };

    default:
      return state;
  }
};

interface MouseEventHandler {
  (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
interface TouchEventHandler {
  (event: React.TouchEvent<HTMLDivElement>): void;
}

interface UseSlide {
  (callback?: (diffX: number, diffY: number) => void, halt?: boolean): {
    onMouseDown: null | MouseEventHandler;
    onMouseUp: null | MouseEventHandler;
    onMouseLeave: null | MouseEventHandler;
    onTouchStart: null | TouchEventHandler;
    onTouchEnd: null | TouchEventHandler;
  };
}
const useSlide: UseSlide = (callback, halt = false) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onMouseStart: MouseEventHandler = event => {
    event.preventDefault();
    dispatch({ type: "set-is-down", x: event.screenX, y: event.screenY });
  };

  const onMouseEnd: MouseEventHandler = event => {
    event.preventDefault();
    if (state.isDown) {
      const diffX = event.screenX - state.x,
        diffY = event.screenY - state.y;
      dispatch({ type: "reset" });
      callback(diffX, diffY);
    }
  };

  const onTouchStart: TouchEventHandler = event => {
    event.preventDefault();
    const touch = event.touches[0];
    if (touch) {
      dispatch({ type: "set-is-down", x: touch.screenX, y: touch.screenY });
    }
  };

  const onTouchEnd: TouchEventHandler = event => {
    event.preventDefault();
    if (state.isDown) {
      const touch = event.changedTouches[0];
      if (touch) {
        const diffX = touch.screenX - state.x,
          diffY = touch.screenY - state.y;
        callback(diffX, diffY);
      }
      dispatch({ type: "reset" });
    }
  };

  return {
    onMouseDown: halt ? null : onMouseStart,
    onMouseUp: halt ? null : onMouseEnd,
    onMouseLeave: halt ? null : onMouseEnd,
    onTouchStart: halt ? null : onTouchStart,
    onTouchEnd: halt ? null : onTouchEnd
  };
};

export default useSlide;
