import React from 'react'
import {
  Github,
  Linkedin,
  Twitter,
  Dribble,
  Mail,
  MapPin,
  Heart,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS, NAV_LINKS } from "../../utils/constants";
import FadeIn from "../animations/FadeIn";


const Footer = () => {
  return (
    <footer className="">
      <div className="">
        <div className="" />
        <div className="" />
      </div>

      {/* for FadeIn */}
      <div className="">
        <div className="">
          <FadeIn delay={0}>
            <div>
              <h3 className=''>
                {
                  PERSONAL_INFO.name.split(' ')[0]
                }
              </h3>
              <p className=''>
                {
                  PERSONAL_INFO.tagline
                }
              </p>
              {/* Email */}
              <div className="">
                <a href={
                  `mailto:${PERSONAL_INFO.email}`

                } className=""
                >
                  <div className="">
                    <Mail ClassName="" />
                  </div>
                  <span className="">
                    {PERSONAL_INFO.email}
                  </span>
                </a>

                {/* Location */}

                <div className="">
                  <div className="">
                    <MapPin className="" />
                  </div>



                  <span className="">
                    {PERSONAL_INFO.location}

                  </span>
                </div>
              </div>
            </div>

          </FadeIn>
        </div>
        {/* 2nd FadeIn */}
        <FadeIn delay={300}>

          <div className="">

            <div className="">
              <p className="">
                copyright {
                  new Date().getFullYear()
                }
                {PERSONAL_INFO.name}. Al Right Resaved
              </p>
              <p className="">Build with <Heart className='' /> Useing React & Tailwind </p>

            </div>
          </div>
        </FadeIn>
      </div>


    </footer>
  )
}

export default Footer