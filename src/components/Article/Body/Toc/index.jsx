import React, { useState, useCallback, useEffect } from "react";
import { animateScroll } from "react-scroll";

import getElementOffsetY from "../../../../utils/getOffset";
import useIntersectionObserver from "../../../../hooks/useIntersectionObserver";
import useScroll from "../../../../hooks/useScroll";

// CSS
import * as S from "./style";

const Toc = () => {
  const [tocWrapperTop, setTocWrapperTop] = useState();
  const [currentId, setCurrentId] = useState();
  const [headings, setHeading] = useState([]);
  const scrollY = useScroll();
  useIntersectionObserver(setCurrentId);

  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(
        "#post-contents > h1, #post-contents > h2, #post-contents > h3"
      )
    );

    setHeading(headingElements);
  }, []);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setTocWrapperTop(getElementOffsetY(node));
    }
  }, []);

  const handleClickHeading = useCallback((itemId) => {
    const node = document.getElementById(itemId);
    animateScroll.scrollTo(getElementOffsetY(node) - 100);
  }, []);

  return (
    <S.TocWrapper ref={measuredRef} isSticky={scrollY > tocWrapperTop - 110}>
      <div>
        {headings.map((item, idx) => (
          <S.TocItem
            key={idx}
            active={item.id === currentId}
            ml={
              item.tagName === "H1"
                ? "0"
                : item.tagName === "H2"
                ? "1.2rem"
                : "2.2rem"
            }
            onClick={() => handleClickHeading(item.id)}
          >
            {item.innerText}
          </S.TocItem>
        ))}
      </div>
    </S.TocWrapper>
  );
};

export default Toc;
