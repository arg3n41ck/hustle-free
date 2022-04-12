import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/scrollbar"
import "swiper/css/navigation"
import "swiper/css/pagination"
import styled from "styled-components"

import { Navigation } from "swiper"

function EventsSlider({ events }) {
  return (
    <div className="main-page-swiper">
      <Swiper
        navigation={true}
        slidesPerView={"auto"}
        // loop
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          {events?.length &&
            events.map(({ name, id, image }) => (
              <div
                key={`swiper-slide-content-${id}`}
                className="swiper-slide-content"
              >
                <Event src={image}>
                  <h3>{name}</h3>
                </Event>
              </div>
            ))}
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default EventsSlider

const Event = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: no-repeat url("${({ src }) => src}") center / cover;
`
