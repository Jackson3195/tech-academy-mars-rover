const MIN_BOUNDARY = 0;
const MAX_BOUNDARY = 9;

type Direction = "N" | "S" | "E" | "W";
type Instruction = "M" | "L" | "R" | "U";
interface Rover {
  y: number;
  x: number;
  direction: Direction;
}

type Operation = (rover: Rover) => Rover;

export function executeCommand(command: string): string {
  let rover: Rover = {
    direction: "N",
    x: 0,
    y: 0,
  };

  for (let operation of getOperations(command)) {
    rover = operation(rover);
  }

  return `${rover.x}:${rover.y}:${rover.direction}`;
}

function* getOperations(command: string) {
  for (let i = 0; i < command.length; i++) {

    switch (command[i]) {
      case "M":
        yield move;
        break;
      case "L":
        yield turnLeft;
        break;
      case "R":
        yield turnRight;
        break;
      case "U":
        yield undo(command[i - 1] as Instruction);
        break;
    }
  }
}

const turnLeft: Operation = (rover) => {
  let direction: Direction = navigator[rover.direction].leftOf;
  return {
    ...rover,
    direction,
  };
};

const turnRight: Operation = (rover) => {
  const direction = navigator[rover.direction].rightOf;
  return {
    ...rover,
    direction,
  };
};

const undo = (lastInstruction: Instruction) => {

  if (lastInstruction === "L") return turnRight;
  if (lastInstruction === "R") return turnLeft;
  if (lastInstruction === "M") {
    return (rover: Rover) => 
      [turnRight, turnRight, move, turnLeft, turnLeft].reduce((accumilator, op) => {
        return op(accumilator);
      }, rover); 
  }

  return noop;
}

const noop: Operation = (rover) => rover;

const move: Operation = (rover) => {
  const movement = navigator[rover.direction].move
  let x = rover.x + movement.x;
  let y = rover.y + movement.y;

  if (x < MIN_BOUNDARY) x = MAX_BOUNDARY;
  if (y < MIN_BOUNDARY) y = MAX_BOUNDARY;

  if (x > MAX_BOUNDARY) x = MIN_BOUNDARY;
  if (y > MAX_BOUNDARY) y = MIN_BOUNDARY;

  return {
    x,
    y,
    direction: rover.direction,
  };
};

const navigator: {
  [key: string]: {
    leftOf: Direction;
    rightOf: Direction;
    move: { x: number; y: number };
  };
} = {
  N: {
    leftOf: "W",
    rightOf: "E",
    move: { x: 0, y: 1 },
  },
  E: {
    leftOf: "N",
    rightOf: "S",
    move: { x: 1, y: 0 },
  },
  S: {
    leftOf: "E",
    rightOf: "W",
    move: { x: 0, y: -1 },
  },
  W: {
    leftOf: "S",
    rightOf: "N",
    move: { x: -1, y: 0 },
  },
};
