import React from 'react';
import './Error.css'; // Import the CSS file
import { Link } from 'react-router-dom';
import CmsDisplay from '../Header/CmsDisplay';
import { CmsFooter } from '../Footer/CmsFooter';
import 'bootstrap/dist/css/bootstrap.css';
import { TopHeader } from '../TopHeader/TopHeader';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

export const Errorfound = () => {
    
  return (
    <>
   <body>
<div id="header"><h1>Server Error</h1></div>
<div id="content">
 <div class="content-container"><fieldset>
  <h2>404 - File or directory not found.</h2>
  <h3>The resource you are looking for might have been removed, had its name changed, or is temporarily unavailable.</h3>
  <button><Link to='/'>back to home</Link></button>
 </fieldset></div>
</div>
</body>
    </>
  );
};
