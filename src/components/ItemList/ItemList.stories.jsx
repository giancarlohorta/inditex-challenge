import ItemList from "./ItemList";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Components/ItemList",
  component: ItemList,
  tags: ["autodocs"],
  argTypes: {
    list: {
      description:
        "An array of items to be displayed in the list. Each item includes an id, name, author, and image URL.",
      control: {
        type: "object"
      }
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The ItemList component displays a list of podcast items. It can render a populated list, a single item, or an empty list based on the provided `list` prop."
      }
    }
  }
};

const Template = (args) => (
  <MemoryRouter>
    <ItemList {...args} />
  </MemoryRouter>
);

export const PopulatedList = Template.bind({});
PopulatedList.args = {
  list: [
    {
      id: "1",
      name: "Item 1",
      author: "Author 1",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png"
    },
    {
      id: "2",
      name: "Item 2",
      author: "Author 2",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png"
    },
    {
      id: "3",
      name: "Item 3",
      author: "Author 3",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png"
    },
    {
      id: "4",
      name: "Item 4",
      author: "Author 4",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png"
    }
  ]
};

export const EmptyList = Template.bind({});
EmptyList.args = {
  list: []
};

export const SingleItemList = Template.bind({});
SingleItemList.args = {
  list: [
    {
      id: "1",
      name: "Single Item",
      author: "Single Author",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png"
    }
  ]
};
