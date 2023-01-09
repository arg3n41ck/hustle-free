import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { theme } from '../../../styles/theme'

function HeaderWithBack({ link, title }) {
  return (
    <MainHeaderWrapper>
      <Link href={link} passHref>
        <a>
          <Back>
            {arrow}
            <p>Назад</p>
          </Back>
        </a>
      </Link>
      <Title>{title || ''}</Title>
    </MainHeaderWrapper>
  )
}

export default HeaderWithBack

const MainHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 16px;
  padding: 32px;

  ${theme.mqMax('xl')} {
    padding: 20px;
  }

  ${theme.mqMax('md')} {
    padding: 16px;
  }

  ${theme.mqMax('sm')} {
    padding: 0 0 16px;
  }
`

const Back = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 4px;

  p {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    color: #828282;
  }
`

const Title = styled.h1`
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;

  ${theme.mqMax('md')} {
    font-size: 20px;
    line-height: 24px;
  }
`

const arrow = (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M5 12L4.29289 11.2929L3.58579 12L4.29289 12.7071L5 12ZM17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11V13ZM8.29289 7.29289L4.29289 11.2929L5.70711 12.7071L9.70711 8.70711L8.29289 7.29289ZM4.29289 12.7071L8.29289 16.7071L9.70711 15.2929L5.70711 11.2929L4.29289 12.7071ZM5 13H17V11H5V13Z'
      fill='#828282'
    />
  </svg>
)
