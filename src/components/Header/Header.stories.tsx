import Header from "./Header";
import { Meta, StoryFn } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";
import { LoadingContextType } from "../../types";

export default {
  title: "Components/Header",
  component: Header,
  tags: ["autodocs"],
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
} as Meta<LoadingContextType>;

const MockLoadingProvider: React.FC<{ isLoading: boolean; children: React.ReactNode }> = ({
  isLoading,
  children
}) => {
  const setIsLoading = () => {};
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

const Template: StoryFn<LoadingContextType> = (args) => (
  <MemoryRouter>
    <MockLoadingProvider isLoading={args.isLoading}>
      <Header />
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
