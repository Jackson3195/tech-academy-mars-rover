import { executeCommand } from "../main";

describe("Mars Rover", () => {
  it("should not move given empty string", () => {
    const command = "";
    const result = executeCommand(command);
    expect(result).toBe("0:0:N");
  });

  it.each([
    ["M", "0:1:N"],
    ["MM", "0:2:N"],
    ["MMM", "0:3:N"],
  ])(
    'should move forward given the command "%s"',
    (command, expectedResult) => {
      const result = executeCommand(command);
      expect(result).toBe(expectedResult);
    }
  );

  it.each([
    ["R", "0:0:E"],
    ["RR", "0:0:S"],
    ["RRR", "0:0:W"],
    ["RRRR", "0:0:N"],
    ["L", "0:0:W"],
    ["LL", "0:0:S"],
    ["LLL", "0:0:E"],
    ["LLLL", "0:0:N"],
  ])(
    'should rotate to the correct direction given the command "%s"',
    (command, expectedResult) => {
      const result = executeCommand(command);
      expect(result).toBe(expectedResult);
    }
  );

  it.each([
    ["RM", "1:0:E"],
    ["MRRM", "0:0:S"],
    ["RMRRM", "0:0:W"],
  ])(
    'should move to the correct point given the command "%s"',
    (command, expectedResult) => {
      const result = executeCommand(command);
      expect(result).toBe(expectedResult);
    }
  );

  it.each([
    ["RRM", "0:9:S"],
    ["M".repeat(10), "0:0:N"],
    ["LM", "9:0:W"],
    ["R" + "M".repeat(10), "0:0:E"],
  ])(
    'should wrap when moving out of bounds given the command "%s"',
    (command, expectedResult) => {
      const result = executeCommand(command);
      expect(result).toBe(expectedResult);
    }
  );

  it.each([
    ["MMRMMLM", "2:3:N"],
  ])(
    'should out the correct state given the command "%s"',
    (command, expectedResult) => {
      const result = executeCommand(command);
      expect(result).toBe(expectedResult);
    }
  );
});
