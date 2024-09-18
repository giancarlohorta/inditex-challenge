import { render, screen } from "@testing-library/react";

import * as stories from "./ItemList.stories";
import { composeStories } from "@storybook/react";

const { PopulatedList, EmptyList, SingleItemList } = composeStories(stories);

describe("ItemList Component", () => {
  test("renders a populated list", () => {
    render(<PopulatedList />);

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Item 3")).toBeInTheDocument();
    expect(screen.getByText("Item 4")).toBeInTheDocument();
  });

  test("renders an empty list", () => {
    render(<EmptyList />);

    expect(screen.queryByText("Item 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Item 2")).not.toBeInTheDocument();
    expect(screen.getByText("No Podcasts found.")).toBeInTheDocument();
  });

  test("renders a list with a single item", () => {
    render(<SingleItemList />);

    expect(screen.getByText("Single Item")).toBeInTheDocument();
    expect(screen.getByText(/Single Author/i)).toBeInTheDocument();
  });
});
