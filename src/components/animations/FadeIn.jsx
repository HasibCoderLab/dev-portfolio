import React, { useEffect, useRef, useState } from 'react'

const FadeIn = () => {
  const [isVasible, setIsVasible] = useState(false);
 const elementRef =  useRef(null);
 useEffect(() =>{
  const observer = new IntersectionObserver(
    ([entry]) =>{
      //Trigger animation when enters viewport;
      if (entry.isIntersecting  && !isVasible) {
        setIsVasible(true)
      }
    }
  )
 })
  return (
    <div>FadeIn</div>
  )
}

export default FadeIn