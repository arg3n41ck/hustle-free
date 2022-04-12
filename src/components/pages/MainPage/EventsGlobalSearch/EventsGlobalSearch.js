import React from "react"
import { TextField } from "@mui/material"
import styled from "styled-components"

function EventsGlobalSearch() {
  return (
    <div>
      <Field>
        <TextField
          sx={{
            ".MuiOutlinedInput-notchedOutline": {
              borderRadius: "8px 0 0 8px !important",
            },
          }}
          fullWidth
          placeholder={"Поиск"}
        />
        <SearchButton>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C12.9036 19 14.652 18.3351 16.0255 17.2249C16.0661 17.4016 16.1552 17.5694 16.2929 17.7071L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L17.7071 16.2929C17.5694 16.1552 17.4016 16.0661 17.2249 16.0255C18.3351 14.652 19 12.9036 19 11C19 6.58172 15.4183 3 11 3ZM5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11Z"
              fill="white"
            />
          </svg>
          <span>Поиск</span>
        </SearchButton>
      </Field>
    </div>
  )
}

const Field = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  margin: 32px 0 0;
`

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  grid-column-gap: 11px;

  padding: 0 24px 0 20px;
  height: 59px;
  background: #333333;
  border: 1.5px solid #333333;
  border-radius: 0 16px 16px 0;

  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 48px;
    display: flex;
    align-items: center;
    text-align: center;

    color: #ffffff;
  }
`

export default EventsGlobalSearch
