import { fireEvent, render, screen } from "@testing-library/react";
import Square from "./Square";
import userEvent from "@testing-library/user-event";

describe("<Square />", () => {
  let onSquareClickHandler;
  async function clickSquare() {
    onSquareClickHandler = jest.fn().mockName("onSquareClick");
    render(<Square onSquareClick={onSquareClickHandler} />);
    userEvent.click(screen.getByTestId("square-button"));
  }

  it("Rendering the correct value recieved as props", () => {
    render(<Square value="X" />);
    expect(screen.getByTestId("square-button").textContent).toEqual("X");
  });

  it("Checking, the associated function for the Square button called or not", async () => {
    await clickSquare();
    expect(onSquareClickHandler).toHaveBeenCalled();
    expect(onSquareClickHandler).toHaveBeenCalledTimes(1);
  });

  it("Calls onSquareClick with 0 when clicked the button", () => {
    let onSquareClick = jest.fn();
    let squares = Array(9).fill(null);
    render(
      <Square value={squares[0]} onSquareClick={() => onSquareClick(0)} />
    );

    fireEvent.click(screen.getByTestId("square-button"));

    expect(onSquareClick).toHaveBeenCalledWith(0);
  });
});
