import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import HeaderContent, { TitleHeader } from '../../../../ui/LKui/HeaderContent'
import styled from 'styled-components'
import { Box } from '@mui/material'
import { EditIcon } from '../../../../../assets/svg/icons'
import { DefaultEmailIcon } from '../../../../../assets/svg/icons'
import { WebsiteIcon } from '../../../../../assets/svg/icons'
import { LinkIcon } from '../../../../../assets/svg/icons'
import { UserIcon } from '../../../../../assets/svg/icons'
import { DefaultPhoneIcon } from '../../../../../assets/svg/icons'
import { phoneFormatter } from '../../../../../helpers/phoneFormatter'
import { selectCountriesAndCities } from '../../../../../redux/components/countriesAndCities'
import { useTranslation } from 'next-i18next'
import ProfileAvaUploader from '../../../../ui/ProfileAvaUploader'
import { formDataHttp } from '../../../../../helpers/formDataHttp'
import { fetchUser } from '../../../../../redux/components/user'

const Info = ({ onToggleSidebar, onView }) => {
  const { user } = useSelector((state) => state.user)
  const [countries] = useSelector(selectCountriesAndCities)
  const { t: tLkTm } = useTranslation('lkTm')
  const [currentLocations, setCurrentLocations] = useState({
    country: '',
    city: '',
  })

  const dispatch = useDispatch()

  useEffect(() => {
    if (user?.country && countries.length) {
      const currentCountry = countries[0],
        currentCity = currentCountry.cityCountry.find((city) => city.id === user?.city.id)
      setCurrentLocations({
        country: currentCountry?.name,
        city: currentCity?.name,
      })
    }
  }, [user, countries])

  return (
    <>
      <HeaderWrapper>
        <HeaderContent onToggle={onToggleSidebar}>
          <TitleHeader>{tLkTm('teamProfile.profile')}</TitleHeader>
        </HeaderContent>
      </HeaderWrapper>
      <Content>
        <Center>
          <ProfileAvaUploader
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.avatar}
            sx={{ width: 112, height: 112 }}
            onSave={async (file) => {
              await formDataHttp({ avatar: file }, 'accounts/users/me/', 'patch')
              dispatch(fetchUser())
            }}
          />
          <CenterText>
            <CenterTitle>{user?.name}</CenterTitle>
            <CenterDescription>{user?.description}</CenterDescription>
          </CenterText>
          <Button onClick={() => onView('edit')}>
            <IconWrapper>
              <EditIcon />
            </IconWrapper>
            {tLkTm('teamProfile.edit')}
          </Button>
        </Center>
        <Footer>
          <List>
            <Item>
              <ItemTitle>
                <WrapperIcon>
                  <WebsiteIcon />
                </WrapperIcon>
                <p>
                  {tLkTm('teamProfile.country')}, {tLkTm('teamProfile.city')}
                </p>
              </ItemTitle>
              <ItemDescription>
                {currentLocations.country}, г. {currentLocations.city}
              </ItemDescription>
            </Item>
            <Item>
              <ItemTitle>
                <WrapperIcon>
                  <DefaultEmailIcon />
                </WrapperIcon>
                <p>{tLkTm('teamProfile.email')}</p>
              </ItemTitle>
              <ItemDescription>{user?.email}</ItemDescription>
            </Item>
            <Item>
              <ItemTitle>
                <WrapperIcon>
                  <WebsiteIcon />
                </WrapperIcon>
                <p>{tLkTm('teamProfile.website')}</p>
              </ItemTitle>
              <ItemDescription>
                {
                  <a
                    target={'_blank'}
                    style={{ color: '#2E79DD', textDecoration: 'underline' }}
                    href={user?.webSite}
                  >
                    {user?.webSite}
                    <Box component={'span'} sx={{ marginLeft: 1 }}>
                      <LinkIcon />
                    </Box>
                  </a>
                }
              </ItemDescription>
            </Item>
            <CoachBlock>
              <CoachItem>
                <ItemTitle>
                  <WrapperIcon>
                    <UserIcon />
                  </WrapperIcon>
                  <p>{tLkTm('teamProfile.mainCoach')}</p>
                </ItemTitle>
                <ItemDescription>{user?.fullNameCoach}</ItemDescription>
              </CoachItem>

              <CoachItem style={{ marginTop: 16 }}>
                <ItemTitle>
                  <WrapperIcon>
                    <DefaultPhoneIcon />
                  </WrapperIcon>
                  <p>{tLkTm('teamProfile.contacts')}</p>
                </ItemTitle>
                <ItemDescription>
                  {!!user?.phoneCoach && phoneFormatter(user?.phoneCoach)}
                </ItemDescription>
              </CoachItem>
            </CoachBlock>
          </List>
        </Footer>
      </Content>
    </>
  )
}
const HeaderWrapper = styled.div`
  border-bottom: 1px solid #333333;
  width: 100%;
`
const Content = styled.div`
  margin: 32px 32px 0 32px;
`
const Center = styled.div`
  display: flex;
`
const CenterText = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
`
const CenterTitle = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`
const CenterDescription = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #828282;
`
const IconWrapper = styled.div`
  width: 15px;
  height: 15px;
  margin-right: 10px;
  margin-top: 3px;
`
const Button = styled.button`
  border: 1px solid #333333;
  box-sizing: border-box;
  border-radius: 4px;
  display: flex;
  align-content: center;
  justify-content: center;
  min-width: 187px;
  background: inherit;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 40px;
  color: #bdbdbd;
  height: 40px;
`
const Footer = styled.div``
const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
`
const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 32px 0;
  border-top: 1px solid #333333;
`
const ItemTitle = styled.h5`
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #828282;
  width: 50%;
  display: flex;
  align-items: center;
`
const ItemDescription = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #bdbdbd;
  flex-grow: 1;
  width: 50%;
`
const WrapperIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 11px;
`
const CoachBlock = styled.div`
  padding: 32px 0;
  border-top: 1px solid #333333;
`
const CoachItem = styled.div`
  display: flex;
  align-items: center;
`

export default Info
