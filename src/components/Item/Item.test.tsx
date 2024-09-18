import { render, screen } from "@testing-library/react";
import * as stories from "./Item.stories";
import { composeStories } from "@storybook/react";

const { Default, WithoutDescription } = composeStories(stories);

describe("Item Component", () => {
  test("should render the default item with description", () => {
    render(<Default />);

    expect(screen.getByText(Default.args.name as string)).toBeInTheDocument();

    expect(screen.getByText(`Author: ${Default.args.author as string}`)).toBeInTheDocument();

    const image = screen.getByAltText(Default.args.name as string);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", Default.args.image as string);

    expect(screen.getByText(Default.args.description as string)).toBeInTheDocument();
  });

  test("should render the item without description", () => {
    render(<WithoutDescription />);

    expect(screen.getByText(WithoutDescription.args.name as string)).toBeInTheDocument();

    expect(
      screen.getByText(`Author: ${WithoutDescription.args.author as string}`)
    ).toBeInTheDocument();

    const image = screen.getByAltText(WithoutDescription.args.name as string);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", WithoutDescription.args.image as string);

    expect(
      screen.queryByText("This is a description of the sample podcast.")
    ).not.toBeInTheDocument();
  });
});
