import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { FontSizeProvider } from './util/FontSizeContext';

import './assets/css/style.css';
import './assets/css/animation.css';
import './assets/css/media.css';
import './assets/css/mycustom.css';
import './assets/css/responsive.css';
import './assets/css/component.css';
import './assets/css/demo.css';
import './assets/css/fig-hover.css';
// import './assets/css/font-awesome.css';
import './assets/css/jquery.bxslider.css';
//import './assets/css/prettyPhoto.css';
import './assets/css/typography.css';
import './assets/css/shotcode.css';
import './assets/css/fontawasome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';



// import './js/main.js';
import '../src/assets/AdminAssets/js/main.js';
import './index.css'

// import 'bootstrap/dist/css/bootstrap.min.css';
// import "bootstrap-icons/font/bootstrap-icons.css";
// import 'bootstrap/dist/js/bootstrap.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <FontSizeProvider>
  <App />
  </FontSizeProvider>
</React.StrictMode>
)
reportWebVitals();
