import SearchField from "./search-field";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const placeholderText = "Movies, shows and more";

describe("Search Field", () => {
  describe("View", () => {
    describe("should render an html input", () => {
      render(<SearchField value="" />);

      const input = screen.getByRole("textbox");

      expect(input).toBeInTheDocument();
    });

    describe("should render an html input with correct placeholder", () => {
      render(<SearchField value="" placeholder={placeholderText} />);

      const placeholder = screen.getByPlaceholderText(placeholderText);

      expect(placeholder).toBeInTheDocument();
    });
  });

  describe("Interaction & Logic", () => {
    it("should hide reset button when value is empty", async () => {
      render(<SearchField value="" placeholder={placeholderText} />);

      const clearButton = screen.queryByTestId("clear-button");

      expect(clearButton).not.toBeInTheDocument();
    });

    it("should display reset button when value is not empty", async () => {
      render(<SearchField value="value" placeholder={placeholderText} />);

      const clearButton = screen.getByTestId("clear-button");

      expect(clearButton).toBeInTheDocument();
    });

    it("should trigger on change if user types", async () => {
      const onChange = jest.fn();

      render(
        <SearchField
          value=""
          placeholder={placeholderText}
          onChange={onChange}
        />
      );

      const input = screen.getByRole("textbox");

      await userEvent.clear(input);

      await userEvent.type(input, "test");

      expect(onChange).toHaveBeenCalledTimes(4); // due to it is set for every word
    });

    it("should trigger clear properly if user click the clear button", async () => {
      const onChange = jest.fn();

      render(
        <SearchField
          value="value"
          placeholder={placeholderText}
          onChange={onChange}
        />
      );

      const clearButton = screen.getByTestId("clear-button");

      await userEvent.click(clearButton);

      expect(onChange).toHaveBeenCalledWith(""); // ? empty string
    });
  });
});
