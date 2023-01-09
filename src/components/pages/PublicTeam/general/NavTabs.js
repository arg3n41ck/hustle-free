import React from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { teamProfileTabs } from '../tabConstants'
import styled from 'styled-components'

export default function NavTabs() {
  const { t: tHeader } = useTranslation('header')
  const {
    query: { id: teamId },
    pathname,
    asPath,
    push: routerPush,
  } = useRouter()
  return (
    <Wrapper>
      {teamProfileTabs(teamId).map(({ name, role, href, icon, asPath: itemPath }) => {
        const active = itemPath === pathname || asPath === href
        return (
          <NavItem
            key={`${href}_${name}`}
            onClick={() => routerPush(href)}
            className={active ? 'active' : ''}
          >
            {icon} <span>{tHeader(`userTabs.${role}.${name}`)}</span>
          </NavItem>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  width: calc(100% + 32px);
  display: grid;
  grid-template: 78px / repeat(3, 1fr);
  margin: 32px -16px 0;
  padding: 2px 0 0;
  background: #141519;
`

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  grid-gap: 8px;
  padding: 15px;
  cursor: pointer;

  span {
    font-weight: 500;
    font-size: 12px;
  }

  &.active {
    border-bottom: 2px solid #6d4eea;
    background: #0f0f10;

    svg * {
      fill: #6d4eea;
      stroke: #6d4eea;
    }

    span {
      color: #6d4eea;
    }
  }
`
