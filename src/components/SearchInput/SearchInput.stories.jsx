import React, { useState } from "react";
import SearchInput from "./SearchInput";

export default {
  title: "Components/SearchInput",
  component: SearchInput,
};

const Template = (args) => {
  const [keyword, setKeyword] = useState("");

  const handleKeywordChange = (newKeyword) => {
    setKeyword(newKeyword);
  };

  return (
    <SearchInput
      {...args}
      onKeywordChange={handleKeywordChange}
      keyword={keyword}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  podcastCount: 42,
  keyword: "",
};
