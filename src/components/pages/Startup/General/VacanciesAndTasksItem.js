import React from "react"
import styled from "styled-components"
import { Box } from "@mui/material"

const VacanciesAndTasksItem = ({ title, price, views, responders }) => {
  return (
    <Item>
      <h2>{title}</h2>
      <p>{price}</p>
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
          {responders}
        </span>
        <span>
          <Box sx={{ marginRight: 0.5 }}>
            <svg
              width="18"
              height="12"
              viewBox="0 0 18 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.77 6C17.77 5.64119 17.576 5.40556 17.1878 4.93429C15.7677 3.21014 12.6355 0 8.99977 0C5.36403 0 2.23183 3.21014 0.811736 4.93429C0.423573 5.40556 0.229492 5.64119 0.229492 6C0.229492 6.35881 0.423573 6.59444 0.811735 7.06571C2.23183 8.78986 5.36403 12 8.99977 12C12.6355 12 15.7677 8.78986 17.1878 7.06571C17.576 6.59444 17.77 6.35881 17.77 6ZM8.99977 9C10.6566 9 11.9998 7.65685 11.9998 6C11.9998 4.34315 10.6566 3 8.99977 3C7.34292 3 5.99977 4.34315 5.99977 6C5.99977 7.65685 7.34292 9 8.99977 9Z"
                fill="#828282"
              />
            </svg>
          </Box>
          {views}
        </span>
      </Indicators>
    </Item>
  )
}

const Item = styled.div`
  min-width: 240px;
  border-radius: 12px;
  border: 1px solid #e5e5e5;
  max-height: 152px;
  min-height: 152px;
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
    height: 48px;
  }
  p {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 24px;
    color: #27ae60;
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
export default VacanciesAndTasksItem
