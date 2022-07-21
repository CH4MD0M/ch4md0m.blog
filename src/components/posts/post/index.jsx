import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { FaRegClock } from "react-icons/fa";
import { Link } from "gatsby";
import styled from "styled-components";

const Post = ({ excerpt, frontmatter }) => {
  const { title, image, slug, date, category, author } = frontmatter;

  return (
    <Wrapper>
      <Link to={`/posts/${slug}`} className="post-container">
        <GatsbyImage image={getImage(image)} alt={title} className="img" />
        <div className="info">
          <span className="category">{category}</span>
          <h3>{title}</h3>
          <p>{excerpt}</p>

          <footer>
            <span className="date">
              <FaRegClock className="icon" />
              {date}
            </span>
          </footer>
        </div>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  margin-bottom: 1rem;
  .post-container {
    background-color: var(--clr-primary-2);
    border-radius: var(--radius);
    padding: 1.5rem;
    transition: var(--transition);
    &:hover {
      transform: translateY(-10px);
    }
  }
  .info {
    text-align: center;
  }
  .img {
    margin-bottom: 1rem;
    border-radius: var(--radius);
    height: 17rem;
  }
  .category {
    display: inline-block;
    margin-bottom: 1rem;
    background: var(--clr-primary-8);
    padding: 0.25rem 0.5rem;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 0.4rem;
    letter-spacing: var(--spacing);
    color: var(--clr-primary-5);
  }
  h3 {
    color: var(--clr-white);
    font-weight: 400;
    margin-bottom: 1rem;
    text-transform: initial;
  }

  p {
    color: var(--clr-primary-6);
    line-height: 1.8;
  }

  footer {
    margin-top: 3.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--clr-primary-6);
    color: var(--clr-primary-6);

    & .date {
      display: flex;
      align-items: center;
      & .icon {
        color: var(--clr-primary-8);
        margin-right: 0.5rem;
      }
    }
  }
  @media (min-width: 600px) {
    .img {
      height: 20rem;
    }
  }
  @media (min-width: 800px) {
    .img {
      height: 25rem;
    }
  }
  @media (min-width: 992px) {
    & {
      .post-container {
        display: grid;
        grid-template-columns: 30rem 1fr;
        column-gap: 1.5rem;
      }
      .info {
        text-align: left;
      }
      .img {
        height: 100%;
        max-height: 20rem;
      }
      .underline {
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
`;

export default Post;
