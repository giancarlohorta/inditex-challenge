import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";

export default {
  title: "Components/Header",
  component: Header,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const MockLoadingProvider = ({ isLoading, children }) => {
  return (
    <LoadingContext.Provider value={{ isLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

const Template = (args) => (
  <MockLoadingProvider isLoading={args.isLoading}>
    <Header />
  </MockLoadingProvider>
);

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const NotLoading = Template.bind({});
NotLoading.args = {
  isLoading: false,
};
