import React from "react"
import styled from "styled-components"

const VacanciesAndTasksItem = ({ title, price, views, descriptions }) => {
  return (
    <Item>
      <h2>{title.length >= 25 ? `${title.slice(0, 25)}...` : title}</h2>
      <Description>
        {descriptions.length >= 70
          ? `${descriptions.slice(0, 70)}...`
          : descriptions}
      </Description>
      <Price>{price}</Price>
      <Indicators>
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.6515 20.4054C20.2043 20.2902 20.5336 19.7117 20.2589 19.2183C19.6533 18.1307 18.6993 17.1749 17.4788 16.4465C15.907 15.5085 13.9812 15 12 15C10.0188 15 8.09292 15.5085 6.52112 16.4465C5.30069 17.1749 4.34666 18.1307 3.74108 19.2183C3.46638 19.7117 3.79562 20.2902 4.34843 20.4054V20.4054C9.39524 21.4572 14.6047 21.4572 19.6515 20.4054V20.4054Z"
              fill="#828282"
            />
            <circle cx="12" cy="8" r="5" fill="#828282" />
          </svg>{" "}
          {views}
        </span>
      </Indicators>
    </Item>
  )
}

const Price = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  color: #27ae60;
`
const Item = styled.div`
  min-width: 240px;
  max-width: 240px;
  min-height: 200px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  max-height: 152px;
  padding: 16px;
  margin-right: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #333333;
  }
`
const Indicators = styled.div`
  display: flex;
  align-items: center;
  span {
    width: 50%;
    display: flex;
    align-items: center;
  }
`
const Description = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #828282;
  margin: 8px 0;
`
export default VacanciesAndTasksItem
