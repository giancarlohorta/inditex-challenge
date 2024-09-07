import Loader from "./Loader";

export default {
  title: "Components/Loader",
  component: Loader,
  argTypes: {
    loading: { control: "boolean" },
  },
};

const Template = (args) => <Loader {...args} />;

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const NotLoading = Template.bind({});
NotLoading.args = {
  loading: false,
};
