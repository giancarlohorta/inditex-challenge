import { render, screen } from "@testing-library/react";
import Loader from "./Loader";

describe("Loader component", () => {
  it("should render the loader when loading is true", () => {
    render(<Loader loading />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
  it("should render the loader when loading is false", () => {
    render(<Loader loading={false} />);

    expect(screen.queryByTestId("loader")).not.toBeInTheDocument();
  });
});
