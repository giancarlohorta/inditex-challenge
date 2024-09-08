import { render, screen } from "@testing-library/react";
import { Default, WithoutDescription } from "./Item.stories";

describe("Item Component", () => {
  test("should render the default item with description", () => {
    render(<Default {...Default.args} />);

    expect(screen.getByText(Default.args.name)).toBeInTheDocument();

    expect(screen.getByText(`Author: ${Default.args.author}`)).toBeInTheDocument();

    const image = screen.getByAltText(Default.args.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", Default.args.image);

    expect(screen.getByText(Default.args.description)).toBeInTheDocument();
  });

  test("should render the item without description", () => {
    render(<WithoutDescription {...WithoutDescription.args} />);

    expect(screen.getByText(WithoutDescription.args.name)).toBeInTheDocument();

    expect(screen.getByText(`Author: ${WithoutDescription.args.author}`)).toBeInTheDocument();

    const image = screen.getByAltText(WithoutDescription.args.name);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", WithoutDescription.args.image);

    expect(
      screen.queryByText("This is a description of the sample podcast.")
    ).not.toBeInTheDocument();
  });
});
