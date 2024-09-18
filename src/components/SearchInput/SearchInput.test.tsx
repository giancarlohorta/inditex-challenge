import { render, screen, fireEvent } from "@testing-library/react";
import * as stories from "./SearchInput.stories";
import { composeStories } from "@storybook/react";

const { Default } = composeStories(stories);

describe("SearchInput component", () => {
  test("should render the search input and display the correct podcast count", () => {
    render(<Default />);

    const podcastCountElement = screen.getByText(/42/i);
    expect(podcastCountElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText(/Filter Podcasts.../i);
    expect(inputElement).toBeInTheDocument();
  });

  test("should call onKeywordChange when input value changes", () => {
    render(<Default />);

    const inputElement = screen.getByPlaceholderText(/Filter Podcasts.../i) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "new keyword" } });

    expect(inputElement.value).toBe("new keyword");
  });
});
