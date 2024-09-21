import { render, screen, act, fireEvent, renderHook } from "@testing-library/react";
import { LoadingProvider, useLoading } from "./LoadingContext";
import { LoadingContextType } from "../types";

const MockComponent = () => {
  const { isLoading, setIsLoading } = useLoading() as LoadingContextType;

  return (
    <div>
      <p>Loading: {isLoading ? "Yes" : "No"}</p>
      <button onClick={() => setIsLoading(true)}>Start Loading</button>
    </div>
  );
};

describe("LoadingContext", () => {
  test("renders with initial value", () => {
    render(
      <LoadingProvider>
        <MockComponent />
      </LoadingProvider>
    );

    expect(screen.getByText("Loading: No")).toBeInTheDocument();
  });

  test("updates the loading state", async () => {
    render(
      <LoadingProvider>
        <MockComponent />
      </LoadingProvider>
    );

    expect(screen.getByText("Loading: No")).toBeInTheDocument();

    await act(async () => {
      const startLoadingButton = screen.getByText("Start Loading");
      fireEvent.click(startLoadingButton);
    });

    expect(await screen.findByText("Loading: Yes")).toBeInTheDocument();
  });

  test("throws error when used outside LoadingProvider", () => {
    try {
      renderHook(() => useLoading());
    } catch (error) {
      expect(error).toEqual(Error("useLoading must be used within a LoadingProvider"));
    }
  });
});
