import { render, screen } from "@testing-library/react";
import { Loading, NotLoading } from "./Loader.stories";

describe("Loader component", () => {
  test("should render the loader when loading is true", () => {
    render(<Loading {...Loading.args} />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  test("should render the loader when loading is false", () => {
    render(<NotLoading {...NotLoading.args} />);

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });
});
