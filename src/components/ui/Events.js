import React from 'react'
import { getEventStatus, getRusBetweenDate } from '../../helpers/helpers'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

function Events({ data }) {
  const { push: routerPush } = useRouter()

  return (
    <EventsLWrapper>
      {!!data?.length ? (
        data.map(({ location, dateEnd, dateStart, id, description, name, getStatus }) => (
          <EventCard onClick={() => routerPush(`/events/${id}`)} key={`mainPageEvents${id}`}>
            <EventImg src={description?.banner} />
            <Texts>
              <h4>{name}</h4>
              <Content>
                <ContentLeftSide>
                  <ContentItems>
                    <LocationIcon />
                    <span>{`${location?.country}, ${location?.city}`}</span>
                  </ContentItems>
                  <ContentItems>
                    <CalendarIcon />
                    <span>{getRusBetweenDate(dateStart, dateEnd)}</span>
                  </ContentItems>
                </ContentLeftSide>
                <ContentRightSide>{getEventStatus(getStatus)}</ContentRightSide>
              </Content>
            </Texts>
          </EventCard>
        ))
      ) : (
        <Empty>Турниров не найдено</Empty>
      )}
    </EventsLWrapper>
  )
}

export default Events

const Empty = styled.h3`
  font-style: normal;
  font-weight: 600;
  color: #bdbdbd;
`

const Content = styled.div`
  display: flex;
`

const EventImg = styled.div`
  height: 224px;
  width: 100%;
  background: no-repeat ${({ src }) => (src ? 'url("' + src + '")' : 'red')} center / cover;
  border-radius: 16px 16px 0 0;

  ${theme.mqMax('md')} {
    height: 180px;
    border-radius: 12px 12px 0 0;
  }
`

const EventsLWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 32px;

  ${theme.mqMax('md')} {
    grid-template: repeat(3, 1fr) / 1fr;
    grid-gap: 16px;
  }
`

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  border-radius: 16px;
  background: #1b1c22;
  cursor: pointer;
`

const ContentLeftSide = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
`

const ContentItems = styled.div`
  display: flex;
  align-items: center;
  grid-gap: 8px;

  span {
    font-size: 16px;
    font-weight: 600;
    color: #f2f2f2;
  }

  ${theme.mqMax('md')} {
    span {
      font-size: 16px;
      font-weight: 600;
      color: #f2f2f2;
    }
  }
`

const LocationIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.398 19.804C13.881 19.0348 19 16.0163 19 11C19 7.13401 15.866 4 12 4C8.13401 4 5 7.13401 5 11C5 16.0163 10.119 19.0348 11.602 19.804C11.8548 19.9351 12.1452 19.9351 12.398 19.804ZM12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z'
      fill='#828282'
    />
  </svg>
)

const ContentRightSide = styled.div`
  width: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  font-size: 16px;
  color: #828282;
`

const Texts = styled.div`
  padding: 0 6% 32px;
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  h4 {
    font-weight: 600;
    font-size: 24px;
    color: #f2f2f2;
  }

  ${theme.mqMax('md')} {
    padding: 0 16px 16px;
    grid-gap: 8px;
    h4 {
      font-size: 20px;
      line-height: 24px;
    }
  }
`

const CalendarIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='3' y='6' width='18' height='15' rx='2' stroke='#F4F4F4' strokeWidth='2' />
    <path
      d='M3 10C3 8.11438 3 7.17157 3.58579 6.58579C4.17157 6 5.11438 6 7 6H17C18.8856 6 19.8284 6 20.4142 6.58579C21 7.17157 21 8.11438 21 10H3Z'
      fill='#F4F4F4'
    />
    <path d='M7 3L7 6' stroke='#F4F4F4' strokeWidth='2' strokeLinecap='round' />
    <path d='M17 3L17 6' stroke='#F4F4F4' strokeWidth='2' strokeLinecap='round' />
  </svg>
)
