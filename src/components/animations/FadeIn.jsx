import React, { useEffect, useRef, useState } from 'react'

const FadeIn = () => {
  const [isVasible, setIsVasible] = useState(false);
  const elementRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        //Trigger animation when enters viewport;
        if (entry.isIntersecting && !isVasible) {
          setIsVasible(true);
        }
      }, {
      threshold: threshold,
      rootMargin: '0px 0px -50px 0px' // trigger slightly before element
    }
    );
    if (elementRef.current) {
      observer.observe(elementRef.current)
    }
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)

      }
    }
  },[threshold,isVasible]
  )
  return (
    <div>FadeIn</div>
  )
}

export default FadeIn