// import React, { useRef, useEffect, useState } from "react";

// const NoticeSection = () => {
//   const marqueeRef = useRef(null);
//   const [isPlaying, setIsPlaying] = useState(true);

//   const togglePlay = () => {
//     setIsPlaying((prev) => !prev);
//   };

//   useEffect(() => {
//     let interval;

//     if (isPlaying) {
//       interval = setInterval(() => {
//         if (marqueeRef.current) {
//           marqueeRef.current.scrollLeft += 1;
//         }
//       }, 20); // Speed of scrolling (lower = faster)
//     } else {
//       clearInterval(interval);
//     }

//     return () => clearInterval(interval);
//   }, [isPlaying]);

//   return (
//     <section className="notice-section">
//       <div className="container">
//         <div className="row pt-2">
//           <div className="col-md-2">
//             <div className="notice-lft">
//               <p>अद्यतन समाचार</p>
//               <div className="marquee-controls mt-2">
//                 <button
//                   onClick={togglePlay}
//                   className="btn btn-sm btn-outline-primary"
//                 >
//                   {isPlaying ? "Pause" : "Play"}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-10">
//             <div className="notice-rgt">
//               <div
//                 className="marquee-container2"
//                 ref={marqueeRef}
//                 style={{
//                   overflow: "hidden",
//                   whiteSpace: "nowrap",
//                 }}
//               >
//                 <div className="marquee-content" style={{ display: "inline-block" }}>
//                   <span style={{ paddingRight: "100px" }}>
//                     <i className="fa-solid fa-bullhorn"></i> &nbsp;
//                     सौभाग्य के तहत घरेलू विद्युतीकरण पर सभी प्रश्नों और शिकायतों के लिए
//                     टोल-फ्री हेल्पलाइन नंबर 1800-121-5555 डायल करें।
//                   </span>
//                   <span style={{ paddingRight: "100px" }}>
//                     <i className="fa-solid fa-bullhorn"></i> &nbsp;
//                     सभी उपभोक्ताओं से अनुरोध है कि बिजली बिल समय पर जमा करें।
//                   </span>
//                   <span style={{ paddingRight: "100px" }}>
//                     <i className="fa-solid fa-bullhorn"></i> &nbsp;
//                     नए कनेक्शन के लिए ऑनलाइन आवेदन करें।
//                   </span>
//                   {/* Add more messages here if needed */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NoticeSection;
