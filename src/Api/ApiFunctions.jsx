// api/users.js

import axios from 'axios';
import apis from './api.json'


//export const BASE_URL = 'http://mum.wrpc.gov.in';
export const BASE_URL = 'http://localhost:5141'; 
// export const BASE_URL = 'https://wrpcgov.com';



//<==============================Get menu===========================================>
export const getMenuoptins = async () => {
  const response = await axios.get(BASE_URL+ apis.getmenudata);
  return response.data;
};
export const getsubMenu = async () => {
  const response = await axios.get(BASE_URL+ apis.getmenuSubmenu);
  return response.data;
};
export const getMenuoptinsById = async (menu_id) => {
  const response = await axios.get(BASE_URL+ apis.getmenudatabyid +menu_id);
  return response.data;
};
 //<==============================Get menu===========================================>
 //<==============================Get menu===========================================>
export const getFooteroptins = async () => {
  const response = await axios.get(BASE_URL+ apis.getfooter);
  return response.data;
};
export const getFooteroptinsById = async (id) => {
  const response = await axios.get(BASE_URL+ apis.getfooterbyid +id);
  return response.data;
};
 //<==============================Get menu===========================================>
//<==============================Get Banner imges===========================================>
export const getBannerImg = async () => {
  const response = await axios.get(BASE_URL+ apis.getbannerimage);
  return response.data;
};
//<==============================Get Banner imges===========================================>
//<==============================Get Whats New===========================================>
export const getwhatsnew = async () => {
  const username = 'admin';
  const password = 'admin123';
  const encodedCredentials = btoa(`${username}:${password}`);
  
  const requestOptions = {
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
      // Add other headers as needed
    },
  };
  const response = await axios.get(BASE_URL+ apis.getwhatsnew,requestOptions);
  return response.data;
};
//<==============================Get Whats New===========================================>
//<==============================Get Links===========================================>
export const getLinks = async () => {
  const username = 'admin';
  const password = 'admin123';
  const encodedCredentials = btoa(`${username}:${password}`);
  
  const requestOptions = {
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
      // Add other headers as needed
    },
  };
  const response = await axios.get(BASE_URL+ apis.getlink,requestOptions);
  return response.data;
};
//<==============================Get Links===========================================>
//<==============================Get report===========================================>
export const getReport = async () => {
  const username = 'admin';
  const password = 'admin123';
  const encodedCredentials = btoa(`${username}:${password}`);
  
  const requestOptions = {
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
      // Add other headers as needed
    },
  };
  const response = await axios.get(BASE_URL+ apis.getreport,requestOptions);
  return response.data;
};
//<==============================Get report===========================================>
//<==============================Get report===========================================>
export const Relaysave = async (formData) => {
  const response = await axios.post(BASE_URL+ apis.Relaysave,formData);
  return response.data;
};

//<==============================TPPA observation===========================================>
export const Tppapost = async (formData) => {
  const response = await axios.post(BASE_URL+ apis.Tppapost,formData);
  return response.data;
};
//<==============================Get report===========================================>
export const getTender = async () => {
  const username = 'admin';
  const password = 'admin123';
  const encodedCredentials = btoa(`${username}:${password}`);
  
  const requestOptions = {
    headers: {
      'Authorization': `Basic ${encodedCredentials}`,
      // Add other headers as needed
    },
  };
  const response = await axios.get(BASE_URL+ apis.gettender,requestOptions);
  return response.data;
};
//<==============================Get report===========================================>
//<==============================Get Slider imges===========================================>
export const getSliderImg = async () => {
  const response = await axios.get(BASE_URL+ apis.getsliderimage);
  return response.data;
};
//<==============================Get Slider imges===========================================>
//<==============================Home Page===========================================>
export const getHomePage = async () => {
  const response = await axios.get(BASE_URL+ apis.gethomepage+21);
  return response.data;
};
//<==============================Home Page===========================================>

export const updateUser = async (userId, updatedUserData) => {
  const response = await axios.put(`${BASE_URL}/${userId}`, updatedUserData);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axios.delete(`${BASE_URL}/${userId}`);
  return response.data;
};
//<=============================Commerical===========================================>

export const getCommerical = async (dataId) => {
  const response = await axios.get(BASE_URL+ apis.commerical+dataId);
  return response.data;
};