require('dotenv').config();
import type { GatsbyConfig } from 'gatsby';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const config: GatsbyConfig = {
  siteMetadata: {
    title: `HwH in Wonderland`,
    siteUrl: `https://www.hwh-in-wonderland.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: 'nj30k01aow4s',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `HwH in Wonderland`,
        short_name: `HwH in Wonderland`,
        start_url: `/`,
        icon: './src/assets/images/favicon.png',
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Nanum Gothic`, `Indie Flower`],
        display: 'swap',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
  ],
};

export default config;
