import React, { useRef, useState } from 'react'
import { TextField, useMediaQuery } from '@mui/material'
import styled from 'styled-components'
import Link from 'next/link'
import useClickOutside from '../../../../hooks/useClickOutside'
import useFetch from '../../../../hooks/useFetch'
import useDebounce from '../../../../hooks/useDebounce'
import { API_URL } from '../../../../services/constants'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../../styles/theme'

function EventsGlobalSearch() {
  const [open, setOpen] = useState(false)
  const md = useMediaQuery('(max-width:768px)')
  const wrapperRef = useRef(null)
  const [searchValue, setSearchValue] = useState('')
  const debouncedValue = useDebounce(searchValue, 500)
  const { t: tEvents } = useTranslation('events')

  useClickOutside(wrapperRef, () => {
    setOpen(false)
  })

  const { data } = useFetch(
    `${API_URL}events/events/`,
    { params: { search: debouncedValue, status_publish: 'published' } },
    debouncedValue,
  )

  return (
    <Wrapper ref={wrapperRef}>
      <Field>
        <TextField
          sx={{
            '.MuiOutlinedInput-root': {
              minHeight: md ? '40px !important' : '64px',
            },
            '.MuiOutlinedInput-notchedOutline': {
              borderRadius: '8px 0 0 8px !important',
            },
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setOpen(true)}
          fullWidth
          placeholder={tEvents('events.search')}
        />
        <SearchButton>
          <SearchIcon />
          <span>{tEvents('events.search')}</span>
        </SearchButton>
      </Field>

      {searchValue && open && (
        <SearchWrapper>
          <ul>
            {!!data?.length &&
              data.map(({ id, name }) => (
                <li key={`hustleFreeSearchEventsResult${id}`}>
                  <Link href={`/events/${id}`}>
                    <a>{name}</a>
                  </Link>
                </li>
              ))}
          </ul>
        </SearchWrapper>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`

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
  height: 64px;
  background: #333333;
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

  ${theme.mqMax('md')} {
    padding: 0 12px;
    height: 40px;
    border-radius: 0 3px 3px 0;

    span {
      font-size: 14px;
      line-height: 32px;
    }
  }
`

const SearchWrapper = styled.div`
  position: absolute;
  background: #1b1c22;
  top: 105px;
  width: 100%;
  padding: 1%;
  z-index: 14;
  border-radius: 0 0 16px 16px;

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    grid-gap: 15px;

    li {
      font-weight: 500;
      font-size: 18px;

      a {
        height: 100%;
        width: 100%;
      }

      &:hover {
        a {
          color: #6d4eea;
        }
      }
    }
  }
`

export default EventsGlobalSearch

export const SearchIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C12.9036 19 14.652 18.3351 16.0255 17.2249C16.0661 17.4016 16.1552 17.5694 16.2929 17.7071L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L17.7071 16.2929C17.5694 16.1552 17.4016 16.0661 17.2249 16.0255C18.3351 14.652 19 12.9036 19 11C19 6.58172 15.4183 3 11 3ZM5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11Z'
      fill='white'
    />
  </svg>
)
