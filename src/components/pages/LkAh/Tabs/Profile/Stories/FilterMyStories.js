import React from 'react'
import styled from 'styled-components'
import { Collapse, useMediaQuery } from '@mui/material'
import StoryCollapse from './StoryCollapse'
import { theme } from '../../../../../../styles/theme'
import { BronzeMedalIcon, GoldMedalIcon, SilverMedalIcon } from '../../../../../../assets/svg/icons'

function FilterMyStories({ data }) {
  const [open, setOpen] = React.useState(true)
  const { id, place, fightsHistory, event, participationCategory } = data
  const md = useMediaQuery('(max-width:767px)')

  return (
    <EventContainer onClick={() => setOpen(!open)} key={id}>
      <BorderWrapper>
        <EventItems>
          <MedalWrapper>
            {place <= 3 && place > 0 ? (
              <PlaceIcon place={place} />
            ) : (
              <MedalContainer>
                <MedalInfoPlace>{place}</MedalInfoPlace>
                {!md && <MedalInfoPlaceText>место</MedalInfoPlaceText>}
              </MedalContainer>
            )}
            {md && <EventInfoHeadingText>{event}</EventInfoHeadingText>}
          </MedalWrapper>
          <EventsInfo>
            {!md && <EventInfoHeadingText>{event}</EventInfoHeadingText>}
            <EventInfoParticipantsInfo>
              {participationCategory?.eventParticipantsCategory?.name} /{' '}
              {participationCategory?.level} /{' '}
              {/* {participationCategory?.eventParticipantsCategory?.fromAge}-
              {participationCategory?.eventParticipantsCategory?.toAge} лет /{' '} */}
              {participationCategory?.eventParticipantsCategory?.fromWeight} кг -{' '}
              {participationCategory?.eventParticipantsCategory?.toWeight} кг{' '}
            </EventInfoParticipantsInfo>
          </EventsInfo>
        </EventItems>
        {!!fightsHistory?.length && (
          <Collapse in={open} timeout='auto' unmountOnExit>
            <StoryWrapper>
              <StoryCollapse fightsHistory={fightsHistory} />
            </StoryWrapper>
          </Collapse>
        )}
      </BorderWrapper>
    </EventContainer>
  )
}

export default FilterMyStories

const MedalWrapper = styled.div`
  ${theme.mqMax('md')} {
    display: grid;
    grid-template: 1fr / 48px 1fr;
    grid-gap: 16px;
    svg {
      width: 48px;
      height: 48px;
    }
  }
`

const MedalInfoPlace = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 40px;
  color: #fbfbfb;

  ${theme.mqMax('md')} {
    font-size: 18px;
  }
`

const MedalInfoPlaceText = styled.p`
  font-style: normal;
  font-weight: 900;
  font-size: 16px;
  line-height: 24px;
  color: #fbfbfb;
`

const MedalContainer = styled.div`
  width: 104px;
  height: 104px;
  border: 1px solid #333333;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px 20px;

  ${theme.mqMax('md')} {
    padding: 0;
    max-width: 48px;
    height: 48px;
  }
`

const EventContainer = styled.div`
  padding: 32px;

  ${theme.mqMax('md')} {
    padding: 16px;
    border-radius: 12px;
  }

  ${theme.mqMax('sm')} {
    border: 1px solid #333333;
    padding: 0;
  }
`

const BorderWrapper = styled.div`
  &:last-child {
    border-radius: 0 0 24px 24px;
  }

  ${theme.mqMax('md')} {
    padding: 12px;
    border: 1px solid #333;
    background: #0f0f10;
    border-radius: 12px;

    &:last-child {
      border-radius: 12px;
    }
  }

  ${theme.mqMax('sm')} {
    background: #141519;
    border: none;
  }
`

const EventItems = styled.div`
  display: grid;
  grid-template-columns: 104px auto;
  grid-gap: 16px;
  cursor: pointer;

  ${theme.mqMax('md')} {
    grid-template: 1fr min-content / 1fr;
  }
`

const EventsInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-gap: 16px;
`

const EventInfoHeadingText = styled.h2`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

const EventInfoParticipantsInfo = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  color: #f2f2f2;

  ${theme.mqMax('md')} {
    font-weight: 400;
    font-size: 14px;
  }
`

const StoryWrapper = styled.div`
  margin: 32px 0;
`

export const UnknownMedal = styled.div`
  width: ${({ size }) => size ?? 104}px;
  height: ${({ size }) => size ?? 104}px;
  font-weight: bolder;
  font-size: ${({ size }) => (size ? size * 0.4 : 42)}px;
  color: #6d4eea;
  border-radius: 50%;
  border: 10px solid #6d4eea;
  display: flex;
  align-items: center;
  justify-content: center;

  ${theme.mqMax('md')} {
    width: ${({ size }) => size ?? 48}px;
    height: ${({ size }) => size ?? 48}px;
    font-size: ${({ size }) => (size ? size * 0.4 : 16)}px;
    border: 5px solid #6d4eea;
  }
`

export const PlaceIcon = ({ place, size }) => {
  switch (place) {
    case 1:
      return <GoldMedalIcon style={size ? { width: size, height: size } : null} />

    case 2:
      return <SilverMedalIcon style={size ? { width: size, height: size } : null} />
    case 3:
      return <BronzeMedalIcon style={size ? { width: size, height: size } : null} />
    default:
      return <UnknownMedal size={size || null}>{place}</UnknownMedal>
  }
}
