import { render, screen } from "@testing-library/react";
import { useContext } from "react";
import { LoadingProvider, useLoading } from "./LoadingContext";

const MockComponent = () => {
  const { isLoading, setIsLoading } = useLoading();

  return (
    <div>
      <p>Loading: {isLoading ? "Yes" : "No"}</p>
      <button onClick={() => setIsLoading(true)}>Start Loading</button>
    </div>
  );
};

describe("LoadingContext", () => {
  test("renders with initial value", () => {
    // Renderiza o componente com o LoadingProvider
    render(
      <LoadingProvider>
        <MockComponent />
      </LoadingProvider>
    );

    // Verifica se o estado inicial é 'Loading: No'
    expect(screen.getByText("Loading: No")).toBeInTheDocument();
  });

  test("updates the loading state", async () => {
    render(
      <LoadingProvider>
        <MockComponent />
      </LoadingProvider>
    );

    // Verifica o estado inicial
    expect(screen.getByText("Loading: No")).toBeInTheDocument();

    // Simula o clique no botão para mudar o estado
    screen.getByText("Start Loading").click();

    // Verifica se o estado mudou para 'Loading: Yes'
    expect(await screen.findByText("Loading: Yes")).toBeInTheDocument();
  });
});
