import React,{useState,useEffect} from 'react';
import Swiper from 'swiper'; // Import Swiper library
import '../../../assets/css/swiper.min.css'; // Import Swiper styles
import { BASE_URL, getSliderImg } from '../../../Api/ApiFunctions';

const Slider = () => {
  const [menuData, setMenuData] = useState([]);


  useEffect(() => {
    async function fetchMenuData() {
      try {
        const data = await getSliderImg();
        setMenuData(data);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    }

    fetchMenuData();
  }, []);

  useEffect(() => {
    // Initialize Swiper after the component is mounted
    const swiper = new Swiper('#logo-sliders', {
      slidesPerGroupSkip: 1,
      loop: true,
      effect: 'slide',
      speed: 1000,
      autoplay: {
        delay: 3000,
      },
      slidesPerView: 'auto',
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        992: {
          slidesPerView: 4,
          spaceBetween: 80,
        },
        1200: {
          slidesPerView: 6,
          spaceBetween: 50,
        },
      },
    });
    // console.log('Swiper initialized:', swiper);
    // Destroy Swiper instance when component is unmounted
    return () => {
      swiper.destroy();
    };
  }, [menuData]);
  // console.log(menuData);

  return (
    <>
<div className="main-sec2">
  <div className="container">
    <div className="row">
      <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
        <div
          className="swiper-container swiper-container-horizontal swiper-container-free-mode"
          id="logo-sliders"
        >
          <div
            className="swiper-wrapper logo-swiper-wrapper slide-smooth-timing"
            style={{
              transitionDuration: '5000ms',
              transform: 'translate3d(-2620px, 0px, 0px)',
            }}
          >
            {/* Mapping over menuData array */}
            {menuData.map((item) => (
              <div
                key={item.u_id}  
                className="swiper-slide logo-slider-bg-trans logo-slide swiper-slide-duplicate"
                data-swiper-slide-index="4" 
                style={{ width: '148.75px', marginRight: '15px' }}
              >
                <a href={item.u_content} title="Right to Information"> {/* Accessible link with title */}
                  <img
                    src={BASE_URL + item.imgpath}
                    className="img-fluid logo-img"
                    alt="Right to Information" 
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
          <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Slider;