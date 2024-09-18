import { render, screen } from "@testing-library/react";
import * as stories from "./Loader.stories";
import { composeStories } from "@storybook/react";

const { Loading, NotLoading } = composeStories(stories);

describe("Loader component", () => {
  test("should render the loader when loading is true", () => {
    render(<Loading />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  test("should render the loader when loading is false", () => {
    render(<NotLoading />);

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });
});
