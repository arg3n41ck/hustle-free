import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/scrollbar'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import styled from 'styled-components'

import { Navigation } from 'swiper'
import { getRusBetweenDate } from '../../../helpers/helpers'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularEvents, selectPopularEvents } from '../../../redux/components/events'
import { theme } from '../../../styles/theme'

export const LocationIcon = ({ color }) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z'
      fill={!!color ? color : '#F2F2F2'}
    />
  </svg>
)

export const CalendarIcon = ({ color }) => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect
      x='3'
      y='6'
      width='18'
      height='15'
      rx='2'
      stroke={!!color ? color : '#F4F4F4'}
      strokeWidth='2'
    />
    <path
      d='M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10V10H3V10Z'
      fill={!!color ? color : '#F4F4F4'}
    />
    <path d='M7 3L7 6' stroke={!!color ? color : '#F4F4F4'} strokeWidth='2' strokeLinecap='round' />
    <path
      d='M17 3L17 6'
      stroke={!!color ? color : '#F4F4F4'}
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
)

function EventsSlider() {
  const { push: routerPush } = useRouter()
  const [popularEvents] = useSelector(selectPopularEvents)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchPopularEvents())
  }, [])

  return (
    <div className='main-page-swiper'>
      {!!popularEvents?.length && (
        <Swiper navigation slidesPerView={'auto'} loop modules={[Navigation]} className='mySwiper'>
          {popularEvents.map(({ name, id, description, location, dateStart, dateEnd }) => (
            <SwiperSlide key={`swiper-slide-content-${id}`}>
              <div onClick={() => routerPush(`/events/${id}`)} className='swiper-slide-content'>
                <Event src={description?.banner}>
                  <h3>{name}</h3>
                  <div>
                    <LocationIcon />
                    <span>{`${location?.country}, ${location?.city}`}</span>
                  </div>
                  <div>
                    <CalendarIcon />
                    <span>{getRusBetweenDate(dateStart, dateEnd)}</span>
                  </div>
                </Event>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
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
  background: no-repeat
      linear-gradient(180deg, rgba(15, 15, 16, 0) 27.9%, rgba(15, 15, 16, 0.9) 100%),
    url('${({ src }) => src}') center / cover;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;
  grid-gap: 16px;
  padding: 32px;

  h3 {
    font-size: 40px;
    line-height: 48px;
    color: #ffffff;
    text-align: start;
  }

  div {
    display: flex;
    align-items: center;
    grid-gap: 16px;
    span {
      font-weight: 600;
      font-size: 18px;
      line-height: 24px;

      color: #f2f2f2;
    }
  }

  ${theme.mqMax('md')} {
    padding: 16px;

    h3 {
      font-size: 20px;
      line-height: 24px;
    }

    div {
      grid-gap: 8px;
      span {
        font-size: 16px;
        line-height: 20px;
      }
    }
  }
`
