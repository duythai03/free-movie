import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Animation = ({
  children,
  animationType = "fade-up",
  duration = 1000,
}) => {
  useEffect(() => {
    AOS.init({
      duration: duration,
      once: false,
    });
  }, [duration]);

  return <div data-aos={animationType}>{children}</div>;
};

export default Animation;
