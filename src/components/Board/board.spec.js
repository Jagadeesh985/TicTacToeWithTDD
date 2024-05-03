import { fireEvent, render, screen } from "@testing-library/react";
import Board from "./Board";

describe("<Board />", () => {
  describe("Checking the tic tac toe board properties", () => {
    const { getAllByTestId } = render(<Board />);
    const squares = getAllByTestId("square-button");

    it("Board should have 9 square buttons.", () => {
      expect(squares).toHaveLength(9);
    });

    it("Square should contain the initial value as null", () => {
      squares.forEach((square) => {
        expect(square.textContent).toBe("");
      });
    });
  });

  describe("Checking the tic tac toe square button functionalites", () => {
    it("When first time square clicked should render the X", () => {
      const { getAllByTestId } = render(<Board />);
      const squares = getAllByTestId("square-button");
      fireEvent.click(squares[0]);
      expect(squares[0].textContent).toBe("X");
    });
    it("When second time sqaure clicked should render the O", () => {
      const { getAllByTestId } = render(<Board />);
      const squares = getAllByTestId("square-button");
      fireEvent.click(squares[0]);
      fireEvent.click(squares[1]);
      expect(squares[0].textContent).toBe("X");
      expect(squares[1].textContent).toBe("O");
    });

    it("When clicking same square more than one time the value should not change", () => {
      const { getAllByTestId } = render(<Board />);
      const squares = getAllByTestId("square-button");

      fireEvent.click(squares[0]);
      fireEvent.click(squares[0]);
      expect(squares[0].textContent).toBe("X");
    });
  });
  describe("Next player status checking", () => {
    it("Initially should display the Next player is X", () => {
      render(<Board />);
      expect(screen.getByTestId("status").textContent).toBe("Next Player: X");
    });

    it("Should display the next player after some clicks", () => {
      const { getAllByTestId } = render(<Board />);
      const squares = getAllByTestId("square-button");

      expect(screen.getByTestId("status").textContent).toBe("Next Player: X");
      fireEvent.click(squares[0]);
      expect(screen.getByTestId("status").textContent).toBe("Next Player: O");
      fireEvent.click(squares[1]);
      expect(screen.getByTestId("status").textContent).toBe("Next Player: X");
      fireEvent.click(squares[2]);
      expect(screen.getByTestId("status").textContent).toBe("Next Player: O");
    });
  });

  describe("Winner of the player checking", () => {
    it("Should display the winner-for player X", () => {
      const { getAllByTestId, getByTestId } = render(<Board />);
      const squares = getAllByTestId("square-button");
      fireEvent.click(squares[4]);
      fireEvent.click(squares[2]);
      fireEvent.click(squares[1]);
      fireEvent.click(squares[0]);
      fireEvent.click(squares[7]);

      expect(getByTestId("status").textContent).toBe("Winner: X");
    });

    it("Should display the winner-for player O", () => {
      const { getAllByTestId, getByTestId } = render(<Board />);
      const squares = getAllByTestId("square-button");
      fireEvent.click(squares[2]);
      fireEvent.click(squares[4]);
      fireEvent.click(squares[5]);
      fireEvent.click(squares[8]);
      fireEvent.click(squares[1]);
      fireEvent.click(squares[0]);

      expect(getByTestId("status").textContent).toBe("Winner: O");
    });

    it("Sqaure buttons cannot be clickable after declaring the winner", () => {
      const { getAllByTestId, getByTestId } = render(<Board />);
      const squares = getAllByTestId("square-button");
      fireEvent.click(squares[4]);
      fireEvent.click(squares[2]);
      fireEvent.click(squares[1]);
      fireEvent.click(squares[0]);
      fireEvent.click(squares[7]);

      expect(getByTestId("status").textContent).toBe("Winner: X");

      fireEvent.click(squares[3]);
      expect(squares[3].textContent).toBe("");
    });
  });
});
