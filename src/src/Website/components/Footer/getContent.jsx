// getContent.js

import { LinkContent } from "../Content/Link/LinkContent";

import { Link } from "react-router-dom";

// Define a function to render content based on content type
export const getContent = (menu_id,
  menu_url,
  contenttype,
  html,
  file,
  internal_link,
  external_link) => {
 
    if (contenttype ==="3") {
      return (
      // <LinkContent/>
      <div>
      <h2>Download</h2>
      {/* <a href={r_internal_link} target="_blank">Link</a> */}
      <Link to={internal_link}>Link</Link>
      </div>
      )
      ;
    } else if (contenttype === "2") {
      return (
        <div>
          <p>File Content:</p>
          <a href={file} download>Download File</a>
        </div>
      );
    } else if (contenttype === "1") {
     
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
    else if (contenttype === "4") {
      return (
        <div>
           <h2>Download</h2>
          <a href={external_link} target="_blank">Link</a>
        </div>
      );
    }
  };
  
  // export default getContent;
  