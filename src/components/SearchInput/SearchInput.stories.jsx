import { useState } from "react";
import SearchInput from "./SearchInput";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
  tags: ["autodocs"],
  argTypes: {
    podcastCount: {
      description:
        "The number of podcasts available. This number is displayed as part of the search input.",
      control: "number"
    },
    keyword: {
      description: "The current search keyword entered by the user.",
      control: "text"
    },
    onKeywordChange: {
      description: "Callback function triggered when the search keyword changes."
    }
  },
  parameters: {
    docs: {
      description: {
        component:
          "The SearchInput component allows users to search through available podcasts. It displays the total number of podcasts and provides a text input for entering search keywords."
      }
    }
  }
};

const Template = (args) => {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
  };

  return <SearchInput {...args} onKeywordChange={handleKeywordChange} keyword={keyword} />;
};

export const Default = Template.bind({});
Default.args = {
  podcastCount: 42,
  keyword: ""
};
