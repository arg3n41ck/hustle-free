import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Avatar, Box, useMediaQuery } from '@mui/material'
import { WebsiteIcon } from '../../../assets/svg/icons'
import { DefaultEmailIcon } from '../../../assets/svg/icons'
import { LinkIcon } from '../../../assets/svg/icons'
import { UserIcon } from '../../../assets/svg/icons'
import { DefaultPhoneIcon } from '../../../assets/svg/icons'
import { normalizePhone, phoneFormatter } from '../../../helpers/phoneFormatter'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountries } from '../../../redux/components/countriesAndCities'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../styles/theme'

function TeamInfo() {
  const { team } = useSelector((state) => state.teams.team)
  const { t: tLkTm } = useTranslation('lkTm')
  const md = useMediaQuery('(max-width: 756px)')

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  return (
    <>
      {team && (
        <Content>
          {!md && (
            <Center>
              <Avatar
                alt={`${team?.fullNameCoach}`}
                src={team?.user?.avatar}
                sx={{ width: 112, height: 112 }}
              />
              <CenterText>
                <CenterTitle>{team?.name || ''}</CenterTitle>
                <CenterDescription>{team?.description || ''}</CenterDescription>
              </CenterText>
            </Center>
          )}
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
                {team?.country?.name || ''}
                {team?.city?.name && `, г. ${team?.city?.name}`}
              </ItemDescription>
            </Item>
            <Item>
              <ItemTitle>
                <WrapperIcon>
                  <DefaultEmailIcon />
                </WrapperIcon>
                <p>{tLkTm('teamProfile.email')}</p>
              </ItemTitle>
              {team?.emailCoach && <ItemDescription>{team?.emailCoach}</ItemDescription>}
            </Item>
            {!!team?.webSite && (
              <Item>
                <ItemTitle>
                  <WrapperIcon>
                    <WebsiteIcon />
                  </WrapperIcon>
                  <p>{tLkTm('teamProfile.website')}</p>
                </ItemTitle>
                <ItemDescription>
                  <a
                    target={'_blank'}
                    style={{
                      color: '#2E79DD',
                      textDecoration: 'underline',
                    }}
                    rel='noreferrer noopener'
                    href={team?.webSite}
                  >
                    {team?.webSite}
                    <Box component={'span'} sx={{ marginLeft: 1 }}>
                      <LinkIcon />
                    </Box>
                  </a>
                </ItemDescription>
              </Item>
            )}

            {!!team?.fullNameCoach && (
              <Item>
                <ItemTitle>
                  <WrapperIcon>
                    <UserIcon />
                  </WrapperIcon>
                  <p>{tLkTm('teamProfile.mainCoach')}</p>
                </ItemTitle>
                <ItemDescription>{team?.fullNameCoach || ''}</ItemDescription>
              </Item>
            )}

            {!!normalizePhone(team?.phoneCoach) && (
              <Item style={{ marginTop: 16 }}>
                <ItemTitle>
                  <WrapperIcon>
                    <DefaultPhoneIcon />
                  </WrapperIcon>
                  <p>{tLkTm('teamProfile.contacts')}</p>
                </ItemTitle>
                <ItemDescription>{phoneFormatter(team?.phoneCoach)}</ItemDescription>
              </Item>
            )}
          </List>
        </Content>
      )}
    </>
  )
}

export default TeamInfo

const Content = styled.div`
  margin: 32px 32px 0 32px;

  ${theme.mqMax('md')} {
    margin: 0;
  }
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

const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  ${theme.mqMax('md')} {
    margin-top: 12px;
  }
`

const Item = styled.li`
  display: flex;
  align-items: center;
  padding: 32px 0;
  border-top: 1px solid #333333;

  ${theme.mqMax('md')} {
    padding: 24px 0;
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 8px;

    &:first-child {
      border-top: none;
    }
  }
`

const ItemTitle = styled.h5`
  width: 50%;

  display: flex;
  align-items: center;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #828282;
  ${theme.mqMax('md')} {
    width: 100%;
  }
`
const ItemDescription = styled.p`
  width: 50%;
  flex-grow: 1;

  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #bdbdbd;
  ${theme.mqMax('md')} {
    width: 100%;
  }
`
const WrapperIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 11px;
`

export const PlusIcon = () => (
  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M16 8L16 24'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M24 16L8 16'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
