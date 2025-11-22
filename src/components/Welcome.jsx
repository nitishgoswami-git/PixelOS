import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const FONT_WEIGHTS = {
  Subtitles: { min: 200, max: 700, default: 200 },
  title: { min: 400, max: 900, default: 400 },
}

const renderText = (text, className, baseWeight = 400) =>
  [...text].map((char, i) => (
    <span key={i} className={className} style={{ fontVariationSettings: `'wght' ${baseWeight}` }}>
      {char === " " ? '\u00A0' : char}
    </span>
  ))

const setTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll('span');
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      css : {fontVariationSettings: `'wght' ${weight}`},
    });
  };

  // Handler for mouse movement over text
  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;
    letters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (rect.left + rect.width / 2 - left));
      const intensity = Math.exp(-(distance ** 2) / 20000);
      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  // Handler for mouse leaving the text
  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      animateLetter(letter, base, 0.3);
    });
  };

  container.addEventListener('mousemove', handleMouseMove);
  container.addEventListener('mouseleave', handleMouseLeave);

  // Cleanup function (remove listeners)
  return () => {
    container.removeEventListener('mousemove', handleMouseMove);
    container.removeEventListener('mouseleave', handleMouseLeave);
  };
};

function Welcome() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const cleanups = [
      setTextHover(titleRef.current, 'title'),
      setTextHover(subtitleRef.current, 'Subtitles')
    ];
    // Cleanup event listeners on unmount
    return () => {
      cleanups.forEach(fn => fn && fn());
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText(
          "Hey , I am Nitish! Welcome to my",
          "text-3xl font-georama",
          100
        )}
      </p>
      <h1 className="mt-7" ref={titleRef}>
        {renderText(
          "PORTFOLIO",
          "text-9xl italic font-georama",400
        )}
      </h1>
      <div className="small-screen">
        <p>This is designed for laptop and tablets only</p>
      </div>
    </section>
  );
}

export default Welcome;
