import { LoaderProps } from "../../types";
import { Meta, StoryFn } from "@storybook/react";
import Loader from "./Loader";

export default {
  title: "Components/Loader",
  component: Loader,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      description: "Determines whether the loader should display a loading state.",
      control: "boolean"
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The Loader component displays a loading animation or message. It can be used to indicate that data is being fetched or processed."
      }
    }
  }
} as Meta<LoaderProps>;

const Template: StoryFn<LoaderProps> = (args) => <Loader {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  loading: true
};

export const NotLoading = Template.bind({});
NotLoading.args = {
  loading: false
};
