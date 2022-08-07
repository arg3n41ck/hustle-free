import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Avatar } from '@mui/material'
import { useSelector } from 'react-redux'
import { EditIcon, LocationIcon } from '../../../../../assets/svg/icons'
import { CalendarIcon } from '../../../../../assets/svg/icons'
import { GenderIcon } from '../../../../../assets/svg/icons'
import { DefaultEmailIcon } from '../../../../../assets/svg/icons'
import { DefaultPhoneIcon } from '../../../../../assets/svg/icons'
import { theme } from '../../../../../styles/theme'
import { normalizePhone, phoneFormatter } from '../../../../../helpers/phoneFormatter'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import LkDefaultHeader from '../../../../ui/LKui/LKDefaultHeader'
import { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import { fetchCountries } from '../../../../../redux/components/countriesAndCities'
import { useTranslation } from 'next-i18next'

const Info = ({ onToggleSidebar }) => {
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const { push: routerPush } = useRouter()
  const {
    countries: { data: countries },
  } = useSelector((state) => state.countries)
  const { t: tHeader } = useTranslation('header')
  const { t: tLkAh } = useTranslation('lkAh')
  const [currentLocations, setCurrentLocations] = useState({
    country: '',
    city: '',
  })

  useEffect(() => {
    if (user?.country && countries.length) {
      const currentCountry = countries.find((country) => country.id === user?.country),
        currentCity = currentCountry.cityCountry.find((country) => country.id === user?.city)
      setCurrentLocations({
        country: currentCountry.name,
        city: currentCity.name,
      })
    }
  }, [user, countries])

  React.useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  return (
    <>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>{tHeader('userTabs.athlete.profile')}</TitleHeader>
      </LkDefaultHeader>
      <Content>
        <Center>
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.avatar}
            sx={{ width: 112, height: 112 }}
          />
          <CenterRight>
            <FullName>
              {user?.firstName} {user?.lastName}
            </FullName>
            <Button onClick={() => routerPush('/lk-ah/profile/edit')}>
              <IconWrapper>
                <EditIcon />
              </IconWrapper>
              {tLkAh('userProfile.edit')}
            </Button>
          </CenterRight>
        </Center>
        <List>
          {!!user?.dateBirthday && (
            <>
              <Item>
                <WrapperIcon>
                  <CalendarIcon />
                </WrapperIcon>
                {tLkAh('userProfile.birthDay')}:
              </Item>
              <Item>
                {format(parseISO(user?.dateBirthday), 'dd MMMM yyyy г.', {
                  locale: ru,
                })}
              </Item>{' '}
            </>
          )}
          <Item>
            <WrapperIcon>
              <GenderIcon />
            </WrapperIcon>
            {tLkAh('userProfile.gender')}
          </Item>
          <Item>{user?.gender === 'male' ? 'Мужской' : 'Женский'}</Item>
          {(!!currentLocations?.country || !!currentLocations?.city) && (
            <>
              <Item>
                <WrapperIcon>
                  <LocationIcon />
                </WrapperIcon>
                {tLkAh('userProfile.countryAndCity')}
              </Item>
              <Item>
                {!!currentLocations?.country && `${currentLocations.country},`}
                {!!currentLocations?.city && ` г. ${currentLocations.city}`}
              </Item>
            </>
          )}
          {!!normalizePhone(user?.phoneNumber) && (
            <>
              <Item>
                <WrapperIcon>
                  <DefaultPhoneIcon />
                </WrapperIcon>
                {tLkAh('userProfile.contacts')}
              </Item>
              {/* <Item>{phoneFormatter(user?.phoneNumber)}</Item> */}
              <Item>{phoneFormatter(user?.phoneNumber)}</Item>
            </>
          )}
          <Item>
            <WrapperIcon>
              <DefaultEmailIcon />
            </WrapperIcon>
            {tLkAh('userProfile.email')}
          </Item>
          <Item>{user?.email}</Item>
        </List>
      </Content>
    </>
  )
}

const Content = styled.div`
  margin: 32px 32px 0 32px;
`
const Center = styled.div`
  display: flex;
`
const CenterRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 35px;
  width: 100%;
`
const FullName = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 40px;
  color: #f2f2f2;
`
const Button = styled.button`
  border: 1px solid #333333;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-content: center;
  justify-content: center;
  max-width: 202px;
  width: 100%;
  background: inherit;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 40px;
  color: #bdbdbd;
  height: 40px;
`
const IconWrapper = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-top: 3px;
`
const List = styled.ul`
  margin-top: 32px;
  display: grid;
  grid-template: repeat(6, 96px) / 1fr 1fr;
  ${theme.mqMax('md')} {
    grid-template: repeat(11, 66px) / 1fr;
  }
`
const Item = styled.li`
  border-top: 1px solid #333333;
  display: flex;
  align-items: center;
  &:nth-child(odd) {
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 32px;
    color: #828282;
  }
  &:nth-child(even) {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #bdbdbd;
  }
  ${theme.mqMax('md')} {
    &:last-child {
      border-top: 0 solid #333333;
    }
  }
`
const WrapperIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 11px;
`

export default Info
