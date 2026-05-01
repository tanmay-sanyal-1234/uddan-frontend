import React from 'react';
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description }) => {
  return (
    <Helmet defer={false}>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={window.location.href} />
      {/* add image */}
      <meta property="og:image" content={"https://udaanscholars.com/assets/logo-BBx1vglC.png"} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* add image */}
      <meta name="twitter:image" content={"https://udaanscholars.com/assets/logo-BBx1vglC.png"} />
    </Helmet>
  );
};

export default SEO;
