import React, { useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'

const DropdownData = ({
  title,
  active,
  setActive,
  additionalData = null,
  isAthletes,
  heightWrapper = 96,
  children,
  onClickRedirect,
}) => {
  const variants = useRef({
    open: { height: '100%' },
    closed: { height: heightWrapper },
  })
  return (
    <Wrapper
      height={heightWrapper}
      animate={children && active ? 'open' : 'closed'}
      transition={children && { transition: 0.2 }}
      variants={variants.current}
      isAthletes={isAthletes}
    >
      <Header
        onClick={() =>
          children && setActive ? setActive((prev) => !prev) : onClickRedirect && onClickRedirect()
        }
      >
        <Title>{title}</Title>
        <ArrowIconS open={children && active} right={!children}>
          <ArrowIcon />
        </ArrowIconS>
      </Header>
      {additionalData && additionalData}
      {children && <Content>{children}</Content>}
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  background: ${({ isAthletes }) => (isAthletes ? '#1b1c22' : 'transparent')};
  box-sizing: border-box;
  width: 100%;
  height: ${(p) => p.height};
  overflow: hidden;
  border-bottom: 1px solid #333333;
  margin-top: 56px;
`
const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 0 0 32px 0;
`
const Title = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`
const Content = styled.div`
  padding: 32px 0;
  /* border-top: 1px solid #333333; */
  overflow: auto;
`
const ArrowIconS = styled.div`
  transition: 0.2s;
  transform: rotate(${({ open, right }) => (right ? '-90deg' : open ? '-180deg' : '0')});
`

export default DropdownData

const ArrowIcon = (props) => (
  <svg
    width='32'
    height='32'
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path
      d='M22.9393 10.9393C23.5251 10.3536 24.4749 10.3536 25.0607 10.9393C25.6464 11.5251 25.6464 12.4749 25.0607 13.0607L22.9393 10.9393ZM16 20L17.0607 21.0607L16 22.1213L14.9393 21.0607L16 20ZM6.93934 13.0607C6.35355 12.4749 6.35355 11.5251 6.93934 10.9393C7.52513 10.3536 8.47487 10.3536 9.06066 10.9393L6.93934 13.0607ZM25.0607 13.0607L17.0607 21.0607L14.9393 18.9393L22.9393 10.9393L25.0607 13.0607ZM14.9393 21.0607L6.93934 13.0607L9.06066 10.9393L17.0607 18.9393L14.9393 21.0607Z'
      fill='#828282'
    />
  </svg>
)
