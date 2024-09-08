import { render, screen, fireEvent } from "@testing-library/react";
import { Default } from "./SearchInput.stories";

describe("SearchInput component", () => {
  test("should render the search input and display the correct podcast count", () => {
    render(<Default {...Default.args} />);

    const podcastCountElement = screen.getByText(/42/i);
    expect(podcastCountElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(/Filter Podcasts.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test("should call onKeywordChange when input value changes", () => {
    render(<Default {...Default.args} />);

    const inputElement = screen.getByPlaceholderText(/Filter Podcasts.../i);
    fireEvent.change(inputElement, { target: { value: "new keyword" } });

    expect(inputElement.value).toBe("new keyword");
  });
});
