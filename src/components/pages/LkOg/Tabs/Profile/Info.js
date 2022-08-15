import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { EditIcon } from '../../../../../assets/svg/icons'
import { Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { LocationIcon } from '../../../../../assets/svg/icons'
import { CalendarIcon } from '../../../../../assets/svg/icons'
import { GenderIcon } from '../../../../../assets/svg/icons.js'
import { DefaultEmailIcon } from '../../../../../assets/svg/icons'
import { DefaultPhoneIcon } from '../../../../../assets/svg/icons'
import { theme } from '../../../../../styles/theme'
import { phoneFormatter } from '../../../../../helpers/phoneFormatter'
import { format, parseISO } from 'date-fns'
import { ru } from 'date-fns/locale'
import LkDefaultHeader from '../../../../ui/LKui/LKDefaultHeader'
import { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import { useRouter } from 'next/router'
import {
  fetchCountries,
  selectCountriesAndCities,
} from '../../../../../redux/components/countriesAndCities'
import { useTranslation } from 'next-i18next'

const Info = ({ onToggleSidebar }) => {
  const { user } = useSelector((state) => state.user)
  const { push: routerPush } = useRouter()
  const [countries, cities] = useSelector(selectCountriesAndCities)
  const [currentLocations, setCurrentLocations] = useState({
    country: '',
    city: '',
  })
  const dispatch = useDispatch()
  const { t: tHeader } = useTranslation('header')
  const { t: tCommon } = useTranslation('common')

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  useEffect(() => {
    if (user?.country && countries.length && cities.length) {
      const currentCountry = countries.find((country) => country.id === user?.country),
        currentCity = cities.find((country) => country.id === user?.city)
      setCurrentLocations({
        country: currentCountry.name,
        city: currentCity.name,
      })
    }
  }, [user, countries])

  return (
    <>
      <LkDefaultHeader onToggleSidebar={onToggleSidebar}>
        <TitleHeader>{tHeader('userTabs.organizer.profile')}</TitleHeader>
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
            <Button onClick={() => routerPush('/lk-og/profile/edit')}>
              <IconWrapper>
                <EditIcon />
              </IconWrapper>
              {tCommon('form.fieldsNames.edit')}
            </Button>
          </CenterRight>
        </Center>
        <List>
          <Item>
            <WrapperIcon>
              <CompanyIcon />
            </WrapperIcon>
            {tCommon('form.fieldsNames.organizationName')}
          </Item>
          <Item>{user?.nameOrganization}</Item>
          {!!user?.dateBirthday && (
            <>
              <Item>
                <WrapperIcon>
                  <CalendarIcon />
                </WrapperIcon>
                {tCommon('form.fieldsNames.birthDate')}
              </Item>
              <Item>
                {format(parseISO(user?.dateBirthday), 'dd MMMM yyyy г.', {
                  locale: ru,
                })}
              </Item>
            </>
          )}
          <Item>
            <WrapperIcon>
              <GenderIcon />
            </WrapperIcon>
            {tCommon('form.fieldsNames.gender.label')}
          </Item>
          <Item>
            {user?.gender === 'male'
              ? tCommon('form.fieldsNames.gender.male')
              : tCommon('form.fieldsNames.gender.female')}
          </Item>
          <Item>
            <WrapperIcon>
              <LocationIcon />
            </WrapperIcon>
            {tCommon('form.fieldsNames.country')}, {tCommon('form.fieldsNames.city')}
          </Item>
          <Item>
            {currentLocations.country || ''}
            {currentLocations.city ? `, ${currentLocations.city}` : ''}
          </Item>
          <Item>
            <WrapperIcon>
              <DefaultPhoneIcon />
            </WrapperIcon>
            {tCommon('form.fieldsNames.contacts')}
          </Item>
          <Item>{phoneFormatter(user?.phoneNumber)}</Item>
          <Item>
            <WrapperIcon>
              <DefaultEmailIcon />
            </WrapperIcon>
            {tCommon('form.fieldsNames.email')}
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
  justify-content: flex-start;
  max-width: 202px;
  padding: 0 10px;
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

const CompanyIcon = (props) => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M12.7725 4.27848L4.53 3.01662C4.1475 2.95618 3.7575 3.06196 3.465 3.31131C3.1725 3.56822 3 3.93846 3 4.32382V20.2444C3 20.66 3.3375 21 3.75 21H6.1875V17.0331C6.1875 16.3001 6.7725 15.7108 7.5 15.7108H9.375C10.1025 15.7108 10.6875 16.3001 10.6875 17.0331V21H13.875V5.58568C13.875 4.93586 13.41 4.38427 12.7725 4.27848ZM7.125 14.0107H6C5.6895 14.0107 5.4375 13.7568 5.4375 13.444C5.4375 13.1311 5.6895 12.8773 6 12.8773H7.125C7.4355 12.8773 7.6875 13.1311 7.6875 13.444C7.6875 13.7568 7.4355 14.0107 7.125 14.0107ZM7.125 11.7439H6C5.6895 11.7439 5.4375 11.49 5.4375 11.1771C5.4375 10.8643 5.6895 10.6104 6 10.6104H7.125C7.4355 10.6104 7.6875 10.8643 7.6875 11.1771C7.6875 11.49 7.4355 11.7439 7.125 11.7439ZM7.125 9.47704H6C5.6895 9.47704 5.4375 9.22316 5.4375 8.91034C5.4375 8.59752 5.6895 8.34363 6 8.34363H7.125C7.4355 8.34363 7.6875 8.59752 7.6875 8.91034C7.6875 9.22316 7.4355 9.47704 7.125 9.47704ZM7.125 7.21023H6C5.6895 7.21023 5.4375 6.95634 5.4375 6.64352C5.4375 6.3307 5.6895 6.07682 6 6.07682H7.125C7.4355 6.07682 7.6875 6.3307 7.6875 6.64352C7.6875 6.95634 7.4355 7.21023 7.125 7.21023ZM10.875 14.0107H9.75C9.4395 14.0107 9.1875 13.7568 9.1875 13.444C9.1875 13.1311 9.4395 12.8773 9.75 12.8773H10.875C11.1855 12.8773 11.4375 13.1311 11.4375 13.444C11.4375 13.7568 11.1855 14.0107 10.875 14.0107ZM10.875 11.7439H9.75C9.4395 11.7439 9.1875 11.49 9.1875 11.1771C9.1875 10.8643 9.4395 10.6104 9.75 10.6104H10.875C11.1855 10.6104 11.4375 10.8643 11.4375 11.1771C11.4375 11.49 11.1855 11.7439 10.875 11.7439ZM10.875 9.47704H9.75C9.4395 9.47704 9.1875 9.22316 9.1875 8.91034C9.1875 8.59752 9.4395 8.34363 9.75 8.34363H10.875C11.1855 8.34363 11.4375 8.59752 11.4375 8.91034C11.4375 9.22316 11.1855 9.47704 10.875 9.47704ZM10.875 7.21023H9.75C9.4395 7.21023 9.1875 6.95634 9.1875 6.64352C9.1875 6.3307 9.4395 6.07682 9.75 6.07682H10.875C11.1855 6.07682 11.4375 6.3307 11.4375 6.64352C11.4375 6.95634 11.1855 7.21023 10.875 7.21023Z'
      fill='#828282'
    />
    <path
      d='M19.965 11.0578L14.625 9.93115V21H19.6875C20.4112 21 21 20.4069 21 19.6777V12.3498C21 11.7257 20.5778 11.1945 19.965 11.0578ZM18.1875 18.7332H17.0625C16.752 18.7332 16.5 18.4793 16.5 18.1665C16.5 17.8537 16.752 17.5998 17.0625 17.5998H18.1875C18.498 17.5998 18.75 17.8537 18.75 18.1665C18.75 18.4793 18.498 18.7332 18.1875 18.7332ZM18.1875 16.4664H17.0625C16.752 16.4664 16.5 16.2125 16.5 15.8997C16.5 15.5869 16.752 15.333 17.0625 15.333H18.1875C18.498 15.333 18.75 15.5869 18.75 15.8997C18.75 16.2125 18.498 16.4664 18.1875 16.4664ZM18.1875 14.1996H17.0625C16.752 14.1996 16.5 13.9457 16.5 13.6329C16.5 13.32 16.752 13.0662 17.0625 13.0662H18.1875C18.498 13.0662 18.75 13.32 18.75 13.6329C18.75 13.9457 18.498 14.1996 18.1875 14.1996Z'
      fill='#828282'
    />
  </svg>
)
