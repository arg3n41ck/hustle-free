import React from "react"
import styled from "styled-components"

const Sidebar = ({ value, array, onChangeValue }) => {
  return (
    <Wrapper>
      {array.map((item) => {
        const active = item.value === value
        return (
          <Item key={item.value} active={active}>
            <IconWrapper active={active}>{item.icon}</IconWrapper>
            {item.name}
          </Item>
        )
      })}
    </Wrapper>
  )
}
const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
`
const Item = styled.li`
  margin: 0 12px;
  display: flex;
  align-items: center;
`
const IconWrapper = styled.span`
  svg * {
    fill: ${(p) => (p.active ? "#6D4EEA" : "#828282")};
    stroke: red;
  }
`

export default Sidebar
