import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Avatar } from "@mui/material"
import { motion } from "framer-motion"

const ParticipantsItem = ({ participant, maxHeight = 100 }) => {
  const [open, setOpen] = useState(false)
  const variantsRef = useRef({
    open: { height: 168 },
    closed: { height: maxHeight },
  })

  console.log(participant)
  return (
    <ParticipantsItemLi
      animate={open ? "open" : "closed"}
      open={open}
      transition={{ transition: 0.2 }}
      variants={variantsRef.current}
      onClick={() => setOpen((prev) => !prev)}
    >
      <Content>
        <Avatar
          src={participant?.avatar}
          sx={{ marginRight: 1.2, objectFit: "cover" }}
          alt={`${participant.fullName}`}
        />
        <ItemText>
          <ItemTitle>{participant.fullName}</ItemTitle>
          <ItemDescription>{participant.team}</ItemDescription>
        </ItemText>
      </Content>
      <Info>
        <div>
          <InfoTitle>Страна</InfoTitle>
          <InfoDescription>{participant.country}</InfoDescription>
        </div>
        <div>
          <InfoTitle>Возраст</InfoTitle>
          <InfoDescription>{participant.age} лет</InfoDescription>
        </div>
      </Info>
    </ParticipantsItemLi>
  )
}

const ParticipantsItemLi = styled(motion.li)`
  max-width: 318px;
  width: 100%;
  height: 100px;
  //padding: 24px;
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #333333;
  border-radius: 16px;
  cursor: pointer;
  background: ${(p) =>
    p.open
      ? "linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #191a1f"
      : "#1b1c22"};
  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      #191a1f;
  }
`
const Content = styled.div`
  height: 52px;
  width: 100%;
  display: flex;
  align-items: center;
  margin: 24px 24px 0 24px;
`
const ItemText = styled.div`
  margin-left: 16px;
`
const ItemTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #bdbdbd;
`
const Info = styled.div`
  display: grid;
  grid-template: 54px / 1fr 1fr;
  grid-column-gap: 24px;
  margin: 24px;
`
const InfoTitle = styled.h6`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: #828282;
`
const InfoDescription = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #f2f2f2;
`

export default ParticipantsItem
