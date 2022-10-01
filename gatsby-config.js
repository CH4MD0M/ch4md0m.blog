const categoriesConfig = require("./categories-config");
module.exports = {
  siteMetadata: {
    siteUrl: `https://ch4md0m.blog`,
    title: `Today ch4md0m swam`,
    description: `ch4md0m의 기술 블로그`,
    author: `Kihoon`,
    social: {
      email: "d0m__@naver.com",
      github: "https://github.com/CH4MD0M/",
      instagram: `k1h00n_`,
    },
    categories: categoriesConfig,
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-2QPXMQNDX9", // Google Analytics / GA
        ],
        pluginConfig: {
          head: true,
          respectDNT: true,
          exclude: ["/preview/**", "/do-not-track/me/too/"],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/src/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
        plugins: ["@bonobolabs/gatsby-remark-images-custom-widths"],
        gatsbyRemarkPlugins: [
          {
            resolve: "@bonobolabs/gatsby-remark-images-custom-widths",
            options: {
              maxWidth: 1100,
              linkImagesToOriginal: false,
              quality: 80,
            },
          },
          {
            resolve: `gatsby-remark-images-medium-zoom`,
            options: {
              margin: 36,
              scrollOffset: 0,
            },
          },
        ],
        remarkPlugins: [require("remark-math")],
        rehypePlugins: [require("rehype-katex")],
      },
    },
    {
      resolve: "gatsby-plugin-breakpoints",
      options: {
        queries: {
          l: "(max-width: 950px)",
          mdMin: "(min-width: 768px)",
          md: "(max-width: 768px)",
          sm: "(max-width: 500px)",

          portrait: "(orientation: portrait)",
        },
      },
    },
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: "https://ch4md0m.blog",
        sitemap: "https://ch4md0m.blog/sitemap/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [
          `Damion`,
          `Fira+Code\:300,400,500,600,700`,
          `Noto+Sans+KR\:100,300,400,500,700,900`,
        ],
        display: "swap",
      },
    },
  ],
};
