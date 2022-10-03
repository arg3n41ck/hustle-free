import React, { useState } from 'react'
import { Collapse, TextField } from '@mui/material'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { theme } from '../../../styles/theme'

function EDContentFilter({ label, onSearch, children, isFilterOpen, searchPlaceholder = 'Поиск' }) {
  const [search, setSearch] = useState('')
  const [openChildren, setOpenChildren] = useState(false)
  const { t: tLkTm } = useTranslation('lkTm')

  return (
    <MainWrapper>
      {!!label && <h2>{label}</h2>}
      <Search>
        <SearchField>
          <TextField
            value={search}
            fullWidth
            placeholder={
              searchPlaceholder === 'Поиск' ? tLkTm('statistics.search') : searchPlaceholder
            }
            onChange={({ target: { value } }) => {
              setSearch(value)
              onSearch && onSearch(value)
            }}
            sx={{
              '& >.MuiOutlinedInput-root': {
                borderRadius: '16px 0 0 16px !important',
              },
            }}
          />
          <SearchButton className={'submit'}>
            <SearchIcon />
            <span>{tLkTm('statistics.search')}</span>
          </SearchButton>
        </SearchField>
        {children && (
          <FilterButton onClick={() => children && setOpenChildren((s) => !s)}>
            <FilterIcon />
            <span>{tLkTm('statistics.filter')}</span>
          </FilterButton>
        )}
      </Search>
      {children && <Collapse in={openChildren || isFilterOpen}>{children}</Collapse>}
    </MainWrapper>
  )
}

export default EDContentFilter

// svg and style

const MainWrapper = styled.div`
  padding: 32px 0;
  display: flex;
  flex-direction: column;
  grid-row-gap: 20px;

  h2 {
    font-size: 20px;
    line-height: 48px;
    color: #ffffff;
  }
`

const SearchField = styled.div`
  width: 100%;
  display: flex;
`

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;

  ${theme.mqMax('md')} {
    flex-direction: column;
    align-items: flex-end;
    gap: 16px;
  }
`

const SearchButton = styled.button`
  width: 137px;
  height: 64px;
  background: #333333;
  border: 1.5px solid #333333;
  margin: 0 0 0 32px;
  border-radius: 16px;
  padding: 0 20px;
  display: grid;
  grid-template: 1fr / 24px auto;
  align-items: center;
  justify-content: center;
  grid-column-gap: 11px;
  border-radius: 0 16px 16px 0;
  margin: 0;

  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 48px;
    color: #ffffff;
  }
`

const FilterButton = styled.button`
  width: 137px;
  height: 64px;
  background: #333333;
  border: 1.5px solid #333333;
  border-radius: 16px;
  padding: 0 20px;
  display: grid;
  grid-template: 1fr / 24px auto;
  align-items: center;
  justify-content: center;
  grid-column-gap: 11px;

  span {
    font-weight: 600;
    font-size: 20px;
    line-height: 48px;
    color: #ffffff;
  }

  .submit {
    margin: 0 0 0 auto;
  }
`

const SearchIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C12.9036 19 14.652 18.3351 16.0255 17.2249C16.0661 17.4016 16.1552 17.5694 16.2929 17.7071L19.2929 20.7071C19.6834 21.0976 20.3166 21.0976 20.7071 20.7071C21.0976 20.3166 21.0976 19.6834 20.7071 19.2929L17.7071 16.2929C17.5694 16.1552 17.4016 16.0661 17.2249 16.0255C18.3351 14.652 19 12.9036 19 11C19 6.58172 15.4183 3 11 3ZM5 11C5 7.68629 7.68629 5 11 5C14.3137 5 17 7.68629 17 11C17 14.3137 14.3137 17 11 17C7.68629 17 5 14.3137 5 11Z'
      fill='white'
    />
  </svg>
)

const FilterIcon = () => (
  <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path d='M5 12L5 4' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
    <path d='M19 20L19 18' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
    <path d='M5 20L5 16' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
    <path d='M19 12L19 4' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
    <path d='M12 7L12 4' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
    <path d='M12 20L12 12' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
    <circle cx='5' cy='14' r='2' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
    <circle cx='12' cy='9' r='2' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
    <circle cx='19' cy='15' r='2' stroke='#F2F2F2' strokeWidth='2' strokeLinecap='round' />
  </svg>
)
