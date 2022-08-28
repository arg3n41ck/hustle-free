import React from 'react'
import styled from 'styled-components'
import EdGeneralInfo from './EDGeneralInfo'
import ActiveLink from '../../ActiveLink'
import { useTranslation } from 'next-i18next'

function EdMainLayout({ event, children }) {
  const { t: tEventDetail } = useTranslation('eventDetail')
  console.log({ event })
  return (
    <MainWrapper>
      <EdGeneralInfo event={event} />
      <ChildWrapper>
        <NavigationUl>
          <li>
            <ActiveLink activeClassName='activeEDLink' href={`/events/${event.id}`}>
              <a href=''>{tEventDetail('event.EDMainLayout.info')}</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName='activeEDLink' href={`/events/${event.id}/categories`}>
              <a href=''>{tEventDetail('event.EDMainLayout.categories')}</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName='activeEDLink' href={`/events/${event.id}/participants`}>
              <a href=''>{`${tEventDetail('event.EDMainLayout.participants')} (${
                event.participantsCount || 0
              })`}</a>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink activeClassName='activeEDLink' href={`/events/${event.id}/results`}>
              <a href=''>{tEventDetail('event.EDMainLayout.results')}</a>
            </ActiveLink>
          </li>
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
`

const NavigationUl = styled.ul`
  display: grid;
  grid-template: 96px / repeat(4, 1fr);
  margin-bottom: 32px;
  border-bottom: 1px solid #333333;
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

        font-size: 20px;
        line-height: 32px;

        color: #f2f2f2;
        border-bottom: 8px solid transparent;
      }
    }
  }
`
