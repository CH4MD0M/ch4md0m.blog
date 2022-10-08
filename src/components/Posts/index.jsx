import React from "react";
import styled from "styled-components";

import PostPreview from "../PostPreview";

const Posts = ({ category, posts, count }) => {
  const filteredPosts = posts
    .filter(
      (post) => category === "all" || post.frontmatter.category === category
    )
    .slice(0, count);

  return (
    <Wrapper>
      {filteredPosts.map((post) => {
        return <PostPreview key={post.id} post={post} />;
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  width: 100%;
`;

export default Posts;
