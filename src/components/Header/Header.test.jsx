import { render, screen } from "@testing-library/react";
import * as stories from "./Header.stories";
import { composeStories } from "@storybook/react";

const { Loading, NotLoading } = composeStories(stories);

describe("Header component", () => {
  test("should render the header when loading is true", () => {
    render(<Loading />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByText("Podcaster")).toHaveAttribute("href", "/");
  });
  test("should render the header when loading is false", () => {
    render(<NotLoading />);

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    expect(screen.getByText("Podcaster")).toHaveAttribute("href", "/");
  });
});
