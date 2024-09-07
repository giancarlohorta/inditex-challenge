import Item from "./Item";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Components/Item",
  component: Item,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    id: { control: "text" },
    image: { control: "text" },
    name: { control: "text" },
    author: { control: "text" },
    description: { control: "text" },
  },
};

const Template = (args) => <Item {...args} />;

export const Default = Template.bind({});
Default.args = {
  id: "1",
  image:
    "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
  name: "Sample Podcast",
  author: "John Doe",
  description: "This is a description of the sample podcast.",
};

export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  id: "2",
  image:
    "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
  name: "Another Podcast",
  author: "Jane Doe",
  description: "", // Sem descrição
};
