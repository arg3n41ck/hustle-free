import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Avatar, Collapse } from '@mui/material'
import Link from 'next/link'
import CustomButton from '../../../ui/CustomButton'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

export const OgParticipantsItem = ({
  participant,
  isRegistered: isRegisteredValue,
  onAccept,
  onDelete,
}) => {
  const [open, setOpen] = useState(false)
  const { push: routerPush } = useRouter()
  const { t: tEventDetail } = useTranslation('eventDetail')
  const [isRegistered, setIsRegistered] = useState(isRegisteredValue)
  const variantsRefIsRegistered = useRef({
    open: { height: 214 },
    closed: { height: 100 },
  })
  const variantsRefIsNotRegistered = useRef({
    open: { height: 248 },
    closed: { height: 100 },
  })

  return (
    <Wrapper open={open} onClick={() => setOpen((prev) => !prev)}>
      <ParticipantsItemLi
        animate={open ? 'open' : 'closed'}
        transition={{ transition: 0.2 }}
        variants={isRegistered ? variantsRefIsRegistered : variantsRefIsNotRegistered}
      >
        <Content>
          <Avatar
            src={participant?.athlete?.user?.avatar}
            sx={{ marginRight: 1.2, objectFit: 'cover' }}
            alt={`${participant.fullName}`}
          />
          <ItemText>
            <ItemTitle onClick={async () => routerPush(`/athlete/${participant?.athlete?.id}`)}>
              {participant?.athlete?.user?.firstName} {participant?.athlete?.user?.lastName}
            </ItemTitle>
            <ItemDescription>{participant?.team?.name}</ItemDescription>
          </ItemText>
        </Content>
        {!open && !isRegistered && <Line style={{ margin: '24px 0' }} />}
        {open && (
          <>
            <Info>
              <div>
                <InfoTitle>{tEventDetail('event.participants.participantsItem.country')}</InfoTitle>
                <InfoDescription>{participant?.athlete?.user?.country}</InfoDescription>
              </div>
              <div>
                <InfoTitle>{tEventDetail('event.participants.participantsItem.age')}</InfoTitle>
                <InfoDescription>
                  {participant?.athlete?.user?.age}{' '}
                  {tEventDetail('event.participants.participantsItem.years')}
                </InfoDescription>
              </div>
            </Info>
            {isRegistered && <Line style={{ margin: '24px 0' }} />}
            <Link href={`/athlete/${participant.athlete?.id}`} passHref>
              {isRegistered ? (
                <RegisteredBtnProfile>
                  {tEventDetail('event.participants.participantsItem.viewProfile')}
                </RegisteredBtnProfile>
              ) : (
                <NotRegisteredBtnProfile>
                  {tEventDetail('event.participants.participantsItem.viewProfile')}
                </NotRegisteredBtnProfile>
              )}
            </Link>
          </>
        )}
      </ParticipantsItemLi>
      {!isRegistered && (
        <BtnWrapper onClick={() => setIsRegistered(true)}>
          <CustomButton
            typeButton={'secondary'}
            height={'32px'}
            borderRadius={'4px'}
            onClick={() => onDelete(participant.id)}
            style={{ fontSize: 12, color: '#fff', background: 'none' }}
          >
            {tEventDetail('event.participants.participantsItem.reject')}
          </CustomButton>

          <CustomButton
            style={{ fontSize: 12, color: '#fff' }}
            height={'32px'}
            borderRadius={'4px'}
            onClick={() => onAccept(participant.id)}
          >
            {tEventDetail('event.participants.participantsItem.confirm')}
          </CustomButton>
        </BtnWrapper>
      )}
    </Wrapper>
  )
}

const NotRegisteredBtnProfile = styled.a`
  display: block;
  text-align: center;
  width: 100%;
  padding: 24px;
  border-top: 1px solid #333333;
  border-bottom: 1px solid #333333;
  margin-bottom: 24px;
`
const RegisteredBtnProfile = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  border-top: 1px solid #333333;
  background: #6d4eea;
  border-radius: 8px;
  max-width: 274px;
  width: 100%;
  height: 32px;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 32px;
  color: #ffffff;
`
const BtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`
const Line = styled.div`
  margin-top: 24px;
  width: 100%;
  height: 1px;
  background-color: #333333;
`

export const ParticipantsItem = ({ participant }) => {
  const [open, setOpen] = useState(false)
  const { push: routerPush } = useRouter()

  return (
    <Wrapper open={open} onClick={() => setOpen((prev) => !prev)}>
      <ParticipantsItemLi>
        <Content>
          <Avatar
            src={participant?.athlete?.user?.avatar}
            sx={{ marginRight: 1.2, objectFit: 'cover' }}
            alt={`${participant.fullName}`}
          />
          <ItemText>
            <ItemTitle onClick={async () => routerPush(`/athlete/${participant?.athlete?.id}`)}>
              {participant?.athlete?.user?.firstName} {participant?.athlete?.user?.lastName}
            </ItemTitle>
            <ItemDescription>{participant?.team?.name}</ItemDescription>
          </ItemText>
        </Content>
        <Collapse in={open}>
          <Info>
            <div>
              <InfoTitle>Страна</InfoTitle>
              <InfoDescription>{participant?.athlete?.user?.country}</InfoDescription>
            </div>
            <div>
              <InfoTitle>Возраст</InfoTitle>
              <InfoDescription>{participant?.athlete?.user?.age} лет</InfoDescription>
            </div>
          </Info>
        </Collapse>
      </ParticipantsItemLi>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 24px;
  overflow: hidden;
  border: 1px solid #333333;
  box-sizing: border-box;
  border-radius: 16px;
  height: min-content;
  cursor: pointer;
  background: ${(p) =>
    p.open ? 'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #191a1f' : '#1b1c22'};
  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #191a1f;
  }
`
const ParticipantsItemLi = styled.li`
  max-width: 318px;
  width: 100%;
  height: min-content;
`
const Content = styled.div`
  height: 52px;
  width: 100%;
  display: flex;
  align-items: center;
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
  margin: 24px 0;
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
