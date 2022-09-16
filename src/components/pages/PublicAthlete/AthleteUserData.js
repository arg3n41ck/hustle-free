import React, { useRef } from 'react'
import { Avatar } from '@mui/material'
import styled from 'styled-components'
import { calendar, email, gender, location, phone } from './Icons'
import { getRuDetailDate } from '../../../helpers/helpers'
import { normalizePhone, phoneFormatter } from '../../../helpers/phoneFormatter'
import { useTranslation } from 'next-i18next'
import { format } from 'date-fns'

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
      icon: email,
      content: userEmail || '',
    },
    {
      icon: calendar,
      content: dateBirthday ? format(new Date(dateBirthday), 'dd.MM.yyyy') : '',
    },
    {
      icon: gender,
      content: userGender
        ? userGender === 'male'
          ? tLkAh('userProfile.male')
          : tLkAh('userProfile.female')
        : '',
    },
    {
      icon: location,
      content: (country?.name ? `${country?.name},` : '') + (city?.name ? ` г. ${city?.name}` : ''),
    },
    {
      icon: phone,
      content: !!normalizePhone(phoneNumber || 0) ? phoneFormatter(phoneNumber) : '',
    },
  ]
}

function AthleteUserData({ user, isVisible }) {
  const { current: contacts } = useRef(getContacts(user))

  return (
    <MainWrapper>
      <MainInfo>
        <Avatar src={user.avatar} alt={`${user.avatar}`} sx={{ width: 264, height: 264 }} />
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
                <div key={`AthleteUserData-Contacts-${i}`}>
                  {icon}
                  <p>{content}</p>
                </div>
              ),
          )}
        </Contacts>
      )}
    </MainWrapper>
  )
}

export default AthleteUserData

const MainWrapper = styled.div`
  padding: 32px;
  border-right: 1px solid #333333;
`

const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-row-gap: 16px;

  h3 {
    font-weight: 700;
    font-size: 28px;
    line-height: 32px;
    color: #f2f2f2;
    text-align: center;
  }
`

const Contacts = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  border-top: 1px solid #333;
  margin-top: 16px;
  padding: 16px 0 0;
  overflow: hidden;
  div {
    display: grid;
    grid-template-columns: 24px auto;
    align-items: center;
    grid-column-gap: 10px;

    p {
      font-size: 18px;
      line-height: 24px;
      color: #e0e0e0;
    }
  }
`
