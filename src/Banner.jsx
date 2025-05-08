import React, { useEffect } from 'react';

let Banner = () => {
  useEffect(() => {
    let t = 7000; 
    let banners = document.querySelectorAll('.banner-wrapper');
    for (let i = 0; i < banners.length; i++) {
      initBannerWrapper(banners[i]);
    }


    function initBannerWrapper(wrapper) { 
      let banner = wrapper.querySelector('.banner');
      let pauseBtn = wrapper.querySelector('.pause-btn');
      let resumeBtn = wrapper.querySelector('.resume-btn');
      let colors = ['#d66253', '#23e6d7', '#95bc62'];
      let boxes = banner.querySelectorAll('.box');
      let idx = 0; //box index tracker
      let zCount = boxes.length;
      let timeoutId, intervalId;
      let isPaused = false;

      for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        box.style.zIndex = i + 1;
        box.querySelector('.box-bg').style.backgroundColor = colors[i];
        box.querySelector('.box-content').style.visibility = 'hidden';
      }
      
      let first = boxes[0];
      first.querySelector('.box-bg').style.transform = 'translateX(0)';
      first.querySelector('.box-content').style.visibility = 'visible';
      idx = 1;



      //Resume + Pause functionality
      function startCycle() {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      
        function startSlideNext() {
          slideNext();
          intervalId = setInterval(slideNext, t);
        }
        timeoutId = setTimeout(startSlideNext, t);


        pauseBtn.disabled = false;
        resumeBtn.disabled = true;
        isPaused = false;
      }
      function stopCycle() {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
        pauseBtn.disabled = true;
        resumeBtn.disabled = false;
        isPaused = true;
      }
      pauseBtn.addEventListener('click', () => {
        if (!isPaused) {
          stopCycle();
        }
      });
      resumeBtn.addEventListener('click', () => {
        if (isPaused) {
          startCycle();
        }
      });
      
    
      //sliding box animation 
      function slideNext() {
        let box = boxes[idx];
        let bg = box.querySelector('.box-bg');
        let content = box.querySelector('.box-content');
        box.style.zIndex = ++zCount;
        bg.style.transition = 'none';
        bg.style.transform = 'translateX(100%)';
        bg.getBoundingClientRect(); //returns position and size information of bg

        function onTransitionEnd(event) {
          // Check if event that happened was to desired bg +'transform' property
          if (event.target === bg && event.propertyName === 'transform') {
            // loop through the boxes to hide content
            for (let i = 0; i < boxes.length; i++) {
              let box = boxes[i]; // Get the current box
              let boxContent = box.querySelector('.box-content'); 
              boxContent.style.visibility = 'hidden';
            }
            // show content of the current box
            content.style.visibility = 'visible';
  
            bg.removeEventListener('transitionend', onTransitionEnd);
          }
        }
        

        bg.addEventListener('transitionend', onTransitionEnd);
        bg.style.transition = 'transform 1s ease';
        bg.style.transform = 'translateX(0)';
        idx = (idx + 1) % boxes.length;
      }

      startCycle();
    }
  }, []);

  return (

    
    
    <div className="banner-wrapper">


<div className="banner-overlay" style={{ position: 'absolute', zIndex: 10 }}>
          <div className="description-section" style={{ display: 'flex', justifyContent: 'initial', width: '160%', marginLeft: '17%', marginTop: '37%' }}>
            <div style={{ flex: 1,}}>
            <p className="description">
              Miscellanous Ingredients on hand?<br/>
              Let’s Make Ramen—or Something Better.<br/>
              <br/>
              Turn what’s in your fridge into something crave-worthy. From instant noodles to inspired meals, we’ve got you.
            </p>
            </div>
            <ul className="details" style={{ flex: 1, justifyContent: 'flex-end', display: 'flex' }}>
              <li> Enter your ingredients   </li>
              <li>Filter by cuisine or diet</li> 
              <li>Get personalized recipes instantly</li>
              
            </ul>
          </div>
        </div>


      <div className="banner">
        

        {[{num: '01', title: 'CRAVE', content: 
        <img src="src/assets/ramen.png" style={{ width: '20em' }} alt="ingredients" />
        // <model-viewer id="food1" src="ramen.glb" alt="3D model" auto-rotate rotate-speed="-800" style={{ width: '30em', height: '25em' }} />
        },
          {num: '02', title: 'CREATE', content: <img src="src/assets/ingredients.png" style={{ width: '30em' }} alt="ingredients" />},
          {num: '03', title: 'SAVOR', content: <img src="src/assets/macnchesse.png" style={{ width: '20em' }} alt="mac and cheese" />}
        ].map((box, i) => (
          <div key={i} className="box">
            <div className="box-content">{box.content}</div>
            <div className="box-bg">
              <h2 className="number">{box.num}</h2>
              <div className="title-container"><h1 className="title">{box.title}</h1></div>
            </div>
          </div>
        ))}
      </div>
      <button className="pause-btn">Pause </button>
      <button className="resume-btn" disabled>Resume</button>
    </div>
  );
};

export default Banner;