import React, { useRef } from "react"
import styled from "styled-components"
import ArrowIcon from "../../assets/svg/dropdown-arrow.svg"
import { motion } from "framer-motion"

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
    open: { height: "100%" },
    closed: { height: heightWrapper },
  })
  return (
    <Wrapper
      height={heightWrapper}
      animate={children && active ? "open" : "closed"}
      transition={children && { transition: 0.2 }}
      variants={variants.current}
      isAthletes={isAthletes}
    >
      <Header
        onClick={() =>
          children
            ? setActive((prev) => !prev)
            : onClickRedirect && onClickRedirect()
        }
      >
        <Title>{title}</Title>
        <ArrowIconS open={children && active} right={!children} />
      </Header>
      {additionalData && additionalData}
      {children && <Content>{children}</Content>}
    </Wrapper>
  )
}

const Wrapper = styled(motion.div)`
  background: ${({ isAthletes }) => (isAthletes ? "#1b1c22" : "transparent")};
  border: 1px solid #333333;
  box-sizing: border-box;
  border-radius: 16px;
  width: 100%;
  height: ${(p) => p.height};
  overflow: hidden;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 32px;
`
const Title = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 32px;
  color: #f2f2f2;
`
const Content = styled.div`
  padding: 32px;
  border-top: 1px solid #333333;
`
const ArrowIconS = styled(ArrowIcon)`
  transition: 0.2s;
  transform: rotate(
    ${({ open, right }) => (right ? "-90deg" : open ? "-180deg" : "0")}
  );
`

export default DropdownData
