import React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

const variants = {
  open: { opacity: 1, x: 0, pointerEvents: "auto" },
  closed: { opacity: 0, x: "100%", pointerEvents: "auto" },
}

const variantsSidebar = {
  open: { width: 328 },
  closed: { width: 88 },
}

const Sidebar = ({ open, value, array, onChangeValue }) => {
  return (
    <Wrapper animate={open ? "open" : "closed"} variants={variantsSidebar}>
      {array.map((item) => {
        const active = item.value === value
        return (
          <Item
            onClick={() => onChangeValue(item.value)}
            key={item.value}
            active={active}
          >
            <ItemContent>
              <IconWrapper active={active}>{item.icon}</IconWrapper>
              <Text animate={open ? "open" : "closed"} variants={variants}>
                {item.name}
              </Text>
            </ItemContent>
          </Item>
        )
      })}
    </Wrapper>
  )
}

const IconWrapper = styled.div`
  margin-right: 28px;
  height: 100%;
  svg * {
    fill: ${(p) => (p.active ? "#6D4EEA" : "#828282")};
    stroke: ${(p) => (p.active ? "#6D4EEA" : "#828282")};
  }
`
const Wrapper = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 8px;
`
const Item = styled.li`
  margin: 12px 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: ${(p) => (p.active ? "#ffffff" : "#BDBDBD")};
  background: ${(p) => (p.active ? "rgba(109, 78, 234, 0.07)" : "none")};
  border-radius: 16px;
  width: 100%;
  height: 72px;
  &:hover ${IconWrapper} {
    svg * {
      transition: 0.3s;
      fill: ${(p) => (p.active ? "#6D4EEA" : "#fff")};
      stroke: ${(p) => (p.active ? "#6D4EEA" : "#fff")};
    }
  }
`
const ItemContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  div {
    display: flex;
    align-items: center;
  }
`

const Text = styled(motion.p)``

export default Sidebar
