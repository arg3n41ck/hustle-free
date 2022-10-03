import React, { useRef } from 'react'
import styled from 'styled-components'
import EdGeneralInfo from './EDGeneralInfo'
import ActiveLink from '../../ActiveLink'
import { useTranslation } from 'next-i18next'
import {
  EDCategIcon,
  EDGridIcon,
  EDInfoIcon,
  EDParticipantIcon,
  EDResultsIcon,
} from '../../../assets/svg/icons'
import { theme } from '../../../styles/theme'

function EdMainLayout({ event, children }) {
  const { t: tEventDetail } = useTranslation('eventDetail')

  const { current: links } = useRef([
    {
      id: 'ed_info',
      title: tEventDetail('event.EDMainLayout.info'),
      link: `/events/${event.id}`,
      icon: <EDInfoIcon />,
    },
    {
      id: 'ed_categoty',
      title: tEventDetail('event.EDMainLayout.categories'),
      link: `/events/${event.id}/categories`,
      icon: <EDCategIcon />,
    },
    {
      id: 'ed_participants',
      title: `${tEventDetail('event.EDMainLayout.participants')} (${event.participantsCount || 0})`,
      link: `/events/${event.id}/participants`,
      icon: <EDParticipantIcon />,
    },
    {
      id: 'ed_grid',
      title: tEventDetail('event.EDMainLayout.grid'),
      link: `/events/${event.id}/brackets`,
      icon: <EDGridIcon />,
    },
    {
      id: 'ed_results',
      title: tEventDetail('event.EDMainLayout.results'),
      link: `/events/${event.id}/results`,
      icon: <EDResultsIcon />,
    },
  ])

  return (
    <MainWrapper>
      <EdGeneralInfo event={event} />
      <ChildWrapper>
        <NavigationUl>
          {links.map(({ id, title, link, icon }) => (
            <li key={id}>
              <ActiveLink activeClassName='activeEDLink' href={link}>
                <a>
                  {icon}
                  <p>{title}</p>
                </a>
              </ActiveLink>
            </li>
          ))}
        </NavigationUl>
        {children}
      </ChildWrapper>
    </MainWrapper>
  )
}

export default EdMainLayout

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 40px;
  padding: 40px 0 0;

  ${theme.mqMax('md')} {
    grid-row-gap: 32px;
  }
`

const NavigationUl = styled.ul`
  display: grid;
  grid-template: 96px / repeat(5, 1fr);
  margin-bottom: 32px;
  border-bottom: 1px solid #333333;

  ${theme.mqMax('md')} {
    height: 78px;
    display: flex;
    overflow: auto;
  }
`

const ChildWrapper = styled.div`
  border-top: 1px solid #333333;

  ${NavigationUl} {
    li {
      width: 100%;
      height: 100%;
      border-right: 1px solid #333;
      &:last-child {
        border-right: none;
      }
      a {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-bottom: 8px solid transparent;
        grid-gap: 16px;

        &.activeEDLink {
          border-bottom: 8px solid #6d4eea !important;
          border-radius: 8px 8px 0 0 !important;
        }

        & svg {
          height: 32px;
          width: 32px;
        }

        p {
          font-size: 20px;
          line-height: 32px;

          color: #f2f2f2;
        }

        ${theme.mqMax('lg')} {
          flex-direction: column;
          grid-gap: 8px;

          &.activeEDLink {
            border-bottom: 2px solid #6d4eea !important;
            border-radius: 2px 2px 0 0 !important;
          }
          border-bottom: 2px solid transparent;
        }

        ${theme.mqMax('md')} {
          min-width: 70px;
          & svg {
            height: 24px;
            width: 24px;
          }
          p {
            font-size: 10px;
            line-height: 12px;
          }
        }
      }
    }
  }
`
