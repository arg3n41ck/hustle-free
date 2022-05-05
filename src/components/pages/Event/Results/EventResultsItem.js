import React, { useMemo, useState } from "react"
import DropdownData from "../../../ui/DropdownData"
import styled from "styled-components"
import GoldIcon from "../../../../public/svg/second-gold-medal.svg"
import SilverIcon from "../../../../public/svg/second-silver-medal.svg"
import BronzeIcon from "../../../../public/svg/second-bronze-medal.svg"
import { Box } from "@mui/material"

const EventResultsItem = ({ participant }) => {
  const [open, setOpen] = useState(false)
  if (!participant) return null
  const { eventParticipantsCategory } = participant

  const participants = useMemo(() => {
    return participant.participants.sort((a, b) => a.place - b.place)
  }, [participant])

  return (
    <Box sx={{ marginBottom: 4 }}>
      <DropdownData
        active={open}
        setActive={setOpen}
        heightWrapper={"100px"}
        title={`${eventParticipantsCategory.name} / ${participant.level} / ${eventParticipantsCategory.fromAge} - ${eventParticipantsCategory.toAge} лет / ${eventParticipantsCategory.fromWeight} кг - ${eventParticipantsCategory.toWeight} кг`}
      >
        <List>
          {participants.map((participant) => (
            <Item key={participant.id}>
              <Left>
                {(participant.place === 1 && <GoldIcon />) ||
                  (participant.place === 2 && <SilverIcon />) ||
                  (participant.place === 3 && <BronzeIcon />) || (
                    <OtherPlace>
                      <p>{participant.place}</p>
                    </OtherPlace>
                  )}
                <Title>{participant.fullName}</Title>
              </Left>
              <Right>
                <InfoItem>
                  <InfoItemTitle>Команда</InfoItemTitle>
                  <InfoItemDescription>{participant.team}</InfoItemDescription>
                </InfoItem>
                {participant.country && (
                  <InfoItem>
                    <InfoItemTitle>Страна</InfoItemTitle>
                    <InfoItemDescription>
                      {participant.country}
                    </InfoItemDescription>
                  </InfoItem>
                )}
              </Right>
            </Item>
          ))}
        </List>
      </DropdownData>
    </Box>
  )
}

const List = styled.ul``
const Item = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  &:first-child,
  &:last-child {
    padding: 0;
  }
`
const Left = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h3`
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  text-transform: uppercase;
  color: #f2f2f2;
  margin-left: 24px;
`
const Right = styled.div`
  display: flex;
  align-items: center;
`
const InfoItem = styled.div`
  border-left: 1px solid #333333;
  padding: 0 32px;
`
const InfoItemTitle = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
`
const InfoItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`
const OtherPlace = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-weight: 700;
  font-size: 28px;
  line-height: 32px;
  color: #fbfbfb;
  background: #1b1c22;
  border-radius: 8px;
  border: 1px solid #333333;
  padding: 12px;
  width: 72px;
  height: 72px;
`
export default EventResultsItem
