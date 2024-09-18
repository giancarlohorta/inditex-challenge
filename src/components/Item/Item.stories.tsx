import { Meta, StoryFn } from "@storybook/react";
import Item from "./Item";
import { MemoryRouter } from "react-router-dom";
import { NormalizedPodcast } from "../../types";

export default {
  title: "Components/Item",
  component: Item,
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "The unique identifier for the podcast item."
    },
    image: {
      control: "text",
      description: "The URL of the podcast's cover image."
    },
    name: {
      control: "text",
      description: "The name or title of the podcast."
    },
    author: {
      control: "text",
      description: "The name of the podcast's author or creator."
    },
    description: {
      control: "text",
      description: "A brief description of the podcast. Can be empty."
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The Item component represents a podcast item, displaying its image, name, author, and an optional description."
      }
    }
  }
} as Meta<NormalizedPodcast>;

const Template: StoryFn<NormalizedPodcast> = (args) => (
  <MemoryRouter>
    <Item {...args} />
  </MemoryRouter>
);

export const Default = Template.bind({});
Default.args = {
  id: "1",
  image:
    "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
  name: "Sample Podcast",
  author: "John Doe",
  description: "This is a description of the sample podcast."
};

export const WithoutDescription = Template.bind({});
WithoutDescription.args = {
  id: "2",
  image:
    "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
  name: "Another Podcast",
  author: "Jane Doe",
  description: ""
};
