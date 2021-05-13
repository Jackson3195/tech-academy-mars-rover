const MIN_BOUNDARY = 0;
const MAX_BOUNDARY = 9;

type Direction = "N" | "S" | "E" | "W";
type Instruction = "M" | "L" | "R";

interface Rover {
  y: number;
  x: number;
  direction: Direction;
}

type Command = (rover: Rover) => Rover;

export function executeCommand(command: string): string {
  let rover: Rover = {
    direction: "N",
    x: 0,
    y: 0,
  };

  for (let i = 0; i < command.length; i++) {
    rover = applyTransformation(command[i] as Instruction, rover);
  }
  return `${rover.x}:${rover.y}:${rover.direction}`;
}

function applyTransformation(instruction: Instruction, rover: Rover): Rover {
  if (instruction === "M") return move(rover);
  if (instruction === "R") return turnRight(rover);
  if (instruction === "L") return turnLeft(rover);
  return rover;
}

const turnLeft: Command = (rover) => {
  let direction: Direction = "N";
  if (rover.direction === "N") direction = "W";
  if (rover.direction === "W") direction = "S";
  if (rover.direction === "S") direction = "E";

  return {
    ...rover,
    direction,
  };
};

const turnRight: Command = (rover) => {
  let direction: Direction = "N";
  if (rover.direction === "N") direction = "E";
  if (rover.direction === "E") direction = "S";
  if (rover.direction === "S") direction = "W";
  return {
    ...rover,
    direction,
  };
};

const move: Command = (rover) => {
  let x: number = rover.x;
  let y: number = rover.y;
  if (rover.direction === "N") y++;
  else if (rover.direction === "E") x++;
  else if (rover.direction === "S") y--;
  else x--;

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
