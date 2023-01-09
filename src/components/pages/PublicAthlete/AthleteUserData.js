import React, { useRef } from 'react'
import { Avatar, useMediaQuery } from '@mui/material'
import styled from 'styled-components'
import { calendar, email, gender, location, phone } from './Icons'
import { normalizePhone, phoneFormatter } from '../../../helpers/phoneFormatter'
import { useTranslation } from 'next-i18next'
import { format } from 'date-fns'
import { theme } from '../../../styles/theme'

const getContacts = ({
  email: userEmail,
  gender: userGender,
  city,
  country,
  dateBirthday,
  phoneNumber,
}) => {
  const { t: tLkAh } = useTranslation('lkAh')

  return [
    {
      icon: (
        <Label>
          {email}
          <span>{tLkAh('userProfile.email')}</span>
        </Label>
      ),
      content: userEmail || '',
    },
    {
      icon: (
        <Label>
          {calendar}
          <span>{tLkAh('userProfile.birthDay')}</span>
        </Label>
      ),
      content: dateBirthday ? format(new Date(dateBirthday), 'dd.MM.yyyy') : '',
    },
    {
      icon: (
        <Label>
          {gender}
          <span>{tLkAh('userProfile.gender')}</span>
        </Label>
      ),
      content: userGender
        ? userGender === 'male'
          ? tLkAh('userProfile.male')
          : tLkAh('userProfile.female')
        : '',
    },
    {
      icon: (
        <Label>
          {location}
          <span>{tLkAh('userProfile.countryAndCity')}</span>
        </Label>
      ),
      content: (country?.name ? `${country?.name},` : '') + (city?.name ? ` г. ${city?.name}` : ''),
    },
    {
      icon: (
        <Label>
          {phone}
          <span>{tLkAh('userProfile.contacts')}</span>
        </Label>
      ),
      content: !!normalizePhone(phoneNumber || 0) ? phoneFormatter(phoneNumber) : '',
    },
  ]
}

function AthleteUserData({ user, isVisible }) {
  const { current: contacts } = useRef(getContacts(user))
  const md = useMediaQuery('(max-width: 576px)')
  const avaStyles = md
    ? {
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        backgroundSize: 'cover',
      }
    : { width: 264, height: 264 }

  return (
    <MainWrapper>
      <MainInfo>
        <Avatar src={user.avatar} alt={`${user.avatar}`} sx={avaStyles} />
        {!user?.fullName ? (
          <h3>{`${user.firstName || ''} ${user.lastName || ''}`}</h3>
        ) : (
          <h3>{user.fullName}</h3>
        )}
      </MainInfo>
      {!!isVisible && (
        <Contacts>
          {contacts.map(
            ({ content, icon }, i) =>
              content && (
                <Contact key={`AthleteUserData-Contacts-${i}`}>
                  {icon}
                  <p>{content}</p>
                </Contact>
              ),
          )}
        </Contacts>
      )}
    </MainWrapper>
  )
}

export default AthleteUserData

const MainWrapper = styled.div`
  padding: 20px;

  background: #141519;
  border-radius: 8px;

  ${theme.mqMax('xl')} {
    padding: 16px 16px 0;
  }
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-gap: 16px;

  h3 {
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    color: #f2f2f2;
    text-align: center;
    padding-bottom: 16px;
  }
`

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  border-top: 1px solid #333;
  margin-top: 16px;
  overflow: hidden;

  ${theme.mqMin('md')} {
    padding: 16px 0 0;
  }
`

const Contact = styled.div`
  display: grid;
  grid-template: 1fr / 24px auto;
  align-items: center;
  grid-gap: 10px;

  p {
    font-size: 18px;
    line-height: 24px;
    color: #e0e0e0;
  }

  ${theme.mqMax('md')} {
    padding: 24px 0;
    grid-template: min-content min-content / 1fr;
    border-bottom: 1px solid #333;

    &:last-child {
      border: none;
    }
  }
`

const Label = styled.div`
  display: block;
  align-items: center;
  grid-gap: 10px;

  font-weight: 400;
  font-size: 18px;
  line-height: 100%;
  color: #828282;

  span {
    display: none;
  }

  ${theme.mqMax('md')} {
    display: flex;
    span {
      display: block;
    }
  }
`
