import React,{useEffect,useState} from 'react'

import { getHomePage } from '../../../Api/ApiFunctions';

export const RootHtmlContent = () => {
  const [homeData, setHomeData] = useState([])
  useEffect(() => {
    async function fetchMenuData() {
      try {
        const data = await getHomePage();
        setHomeData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    }

    fetchMenuData();
  }, []);
  // console.log( homeData.u_h_html)
    const htmlContent1 = { __html: homeData.h_html};
    return (
      <div>
        <div dangerouslySetInnerHTML={htmlContent1} />
      </div>
    );
  }
  

