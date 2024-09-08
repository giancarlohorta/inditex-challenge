import { render, screen } from "@testing-library/react";
import { Loading, NotLoading } from "./Header.stories";

describe("Header component", () => {
  test("should render the header when loading is true", () => {
    render(<Loading {...Loading.args} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
    expect(screen.getByText("Podcaster")).toHaveAttribute("href", "/");
  });
  test("should render the header when loading is false", () => {
    render(<NotLoading {...NotLoading.args} />);

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
    expect(screen.getByText("Podcaster")).toHaveAttribute("href", "/");
  });
});
