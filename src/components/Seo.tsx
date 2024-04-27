import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

function Seo() {
  const data = useStaticQuery<Queries.SeoDataQuery>(graphql`
    query SeoData {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return <title>{data.site?.siteMetadata?.title}</title>;
}

export default Seo;
