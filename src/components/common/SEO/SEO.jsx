import React from "react";
import { Helmet } from "react-helmet-async";
export default function SEO({ url,title, description, name, type,imagePath=null }) {
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* End standard metadata tags */}
      {/* Facebook tags */}
      <meta property="og:site_name" content="Blog-W"></meta>
      <meta property="og:type" content={type} />
       <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
     { imagePath?<meta property="og:image" content={imagePath}></meta>:null}
      {/* End Facebook tags */}
      {/* Twitter tags */}
      <meta name="twitter:site" content="Blog-W"/>
      <meta name="twitter:creator" content={name} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* End Twitter tags */}
    </Helmet>
  );
}
