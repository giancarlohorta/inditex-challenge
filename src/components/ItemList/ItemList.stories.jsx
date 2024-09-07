import ItemList from "./ItemList";
import { MemoryRouter } from "react-router-dom";

export default {
  title: "Components/ItemList",
  component: ItemList,
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <ItemList {...args} />;

// Exemplo de uma lista populada
export const PopulatedList = Template.bind({});
PopulatedList.args = {
  list: [
    {
      id: "1",
      name: "Item 1",
      author: "Author 1",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png",
    },
    {
      id: "2",
      name: "Item 2",
      author: "Author 2",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png",
    },
    {
      id: "3",
      name: "Item 3",
      author: "Author 3",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png",
    },
    {
      id: "4",
      name: "Item 4",
      author: "Author 4",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png",
    },
  ],
};

// Exemplo de uma lista vazia
export const EmptyList = Template.bind({});
EmptyList.args = {
  list: [],
};

// Exemplo de uma lista com um item
export const SingleItemList = Template.bind({});
SingleItemList.args = {
  list: [
    {
      id: "1",
      name: "Single Item",
      author: "Single Author",
      image:
        "https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/9c/d8/b0/9cd8b073-0f49-341b-3d3a-ab4da3b2aef2/mza_3440682107671500952.png/170x170bb.png",
    },
  ],
};
