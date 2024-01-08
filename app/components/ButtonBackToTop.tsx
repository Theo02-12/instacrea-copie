"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { MoveUp } from "lucide-react";

const ButtonBackToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <Button
          aria-label="backTop"
          id="backToTop"
          className={`fixed bottom-20 lg:bottom-10 p-2 bg-black right-5 text-[#ffffff] hover:text-[#f59e2e] hover:bg-black rounded-full transition-all ease-in-out duration-300`}
          onClick={scrollTop}
        >
          <MoveUp />
        </Button>
      )}
    </>
  );
};

export default ButtonBackToTop;
