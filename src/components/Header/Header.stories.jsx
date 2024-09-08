import Header from "./Header";
import { MemoryRouter } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";

export default {
  title: "Components/Header",
  component: Header,
  argTypes: {
    isLoading: {
      description: "Determines whether the header should display a loading state",
      control: {
        type: "boolean"
      },
      defaultValue: false
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The Header component displays the application's header, including navigation links. It can show a loading state based on the global loading context."
      }
    }
  }
};

const MockLoadingProvider = ({ isLoading, children }) => {
  return <LoadingContext.Provider value={{ isLoading }}>{children}</LoadingContext.Provider>;
};

const Template = (args) => (
  <MemoryRouter>
    <MockLoadingProvider isLoading={args.isLoading}>
      <Header {...args} />
    </MockLoadingProvider>
  </MemoryRouter>
);

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true
};
Loading.parameters = {
  docs: {
    storyDescription:
      "Displays the Header in a loading state, useful when data is still being fetched."
  }
};

export const NotLoading = Template.bind({});
NotLoading.args = {
  isLoading: false
};
NotLoading.parameters = {
  docs: {
    storyDescription: "Displays the Header when the loading state is turned off."
  }
};
