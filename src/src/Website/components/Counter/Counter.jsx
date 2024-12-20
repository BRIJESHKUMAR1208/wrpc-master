
import React, { useEffect } from 'react';
import './counter.scss';

export const Counter = () => {
	useEffect(() => {
	  const counters = document.querySelectorAll('.counter');
	  
	  const options = {
		threshold: 1, // Trigger when element comes into view
		rootMargin: '0px 0px -50px 0px', // Adjust to your needs
	  };
  
	  const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
		  if (entry.isIntersecting) {
			animateCounter(entry.target);
			observer.unobserve(entry.target);
		  }
		});
	  }, options);
  
	  counters.forEach(counter => {
		observer.observe(counter);
	  });
  
	  const animateCounter = counter => {
		const startValue = 0;
		const endValue = parseInt(counter.innerText.replace(/,/g, ''), 10); // Remove commas and parse as integer
		const duration = 1000; // 1 second duration
  
		let startTime;
		function step(timestamp) {
		  if (!startTime) startTime = timestamp;
		  const progress = timestamp - startTime;
		  counter.innerText = Math.min(Math.floor(progress / duration * (endValue - startValue)), endValue).toLocaleString();
  
		  if (progress < duration) {
			requestAnimationFrame(step);
		  }
		}
  
		requestAnimationFrame(step);
	  };
	}, []);
  return (
	
	<div className="city_award_wrap">
	  <div className="container">
		<div className="row">
		  <div className="col-md-4 col-sm-4">
			<div className="city_award_list">
			  <span><i className="fa-solid fa-house"></i></span>
			  <div className="city_award_text">
				<h3 className="counter">1495</h3>
				<h3>Established</h3>
			  </div>
			</div>
		  </div>
		  <div className="col-md-4 col-sm-4">
			<div className="city_award_list">
			  <span><i className="fa-solid fa-earth-americas"></i></span>
			  <div className="city_award_text">
				<h3 className="counter">75,399</h3>
				<h3>KM Square</h3>
			  </div>
			</div>
		  </div>
		  <div className="col-md-4 col-sm-4">
			<div className="city_award_list">
			  <span><i className="fa-solid fa-person"></i></span>
			  <div className="city_award_text">
				<h3 className="counter">16,498</h3>
				<h3>Employees</h3>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>

  )
}
