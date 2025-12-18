import React from 'react'

const RadialGradientBackground = ({variant='hero' , gradients=[]}) => {
  const varients = {
    hero:[
      {
        position:'top-1 left-1 -translate-x-1/2  -translate-y-1/2 ',
        size:'w-[1400px] h-[1400px]',
        colors:[
          {color: 'rgba(141,255,105,0.25)' , stop:'100%'},
          {color: 'rgba(141,255,105,0.45)' , stop:'100%'},
          {color: 'rgba(141,255,105,0.5)' , stop:'100%'},
          {color: 'rgba(141,255,105,0.45)' , stop:'100%'},

          {color: 'rgba(141,255,105,0.25)' , stop:'100%'}

        ],
        blur:'0px',
        opacity:0.5,
      },
      {
  }
  return (
    <div>
      RadialGradientBackground

    </div>
  )
}

export default RadialGradientBackground