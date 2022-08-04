import React, { useCallback } from 'react'
import { MenuItem, Select } from '@mui/material'
import styled from 'styled-components'
import $api from '../../../../../services/axios'
import { useTranslation } from 'next-i18next'

const deleteRow = (id) => {
  $api.delete(`/directories/event_part_categories/${id}/`)
}

function EventParticipantCategoriesTableCollapseHead({
  selectedInTableRows,
  setSelectedInTableRows,
  selectedRows,
  onClickChangeSomeRows,
  refreshPC,
}) {
  const { t: tLkOg } = useTranslation('lkOg')
  const removeRowsFromTable = useCallback(async () => {
    selectedInTableRows.length &&
      (await Promise.all(selectedInTableRows.map(deleteRow)).then(() =>
        setTimeout(() => refreshPC(), 500),
      ))
    setSelectedInTableRows([])
  }, [selectedInTableRows, selectedRows])

  return (
    <TableCollapseHead>
      <THCell>
        <ThText>
          {tLkOg('categoriesOfParticipants.selected')} {selectedInTableRows?.length}{' '}
          {tLkOg('categoriesOfParticipants.category')}.{' '}
          <span onClick={() => setSelectedInTableRows(selectedRows.map(({ id }) => id))}>
            {tLkOg('categoriesOfParticipants.selectAll')}
          </span>
        </ThText>
      </THCell>
      <THCell>
        <Select
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'none',
            },

            '& .MuiSelect-select': {
              padding: '0 37px 0 20px !important',
            },
          }}
          value={'none'}
          onChange={onClickChangeSomeRows}
        >
          <MenuItem value={'none'} sx={{ display: 'none' }}>
            {tLkOg('categoriesOfParticipants.edit')}
          </MenuItem>
          <MenuItem value={'levels'}>{tLkOg('categoriesOfParticipants.levels')}</MenuItem>
          <MenuItem value={'gender'}>{tLkOg('categoriesOfParticipants.gender')}</MenuItem>
          <MenuItem value={'age'}>{tLkOg('categoriesOfParticipants.age')}</MenuItem>
          <MenuItem value={'weight'}>{tLkOg('categoriesOfParticipants.weight')}</MenuItem>
          <MenuItem value={'price'}>{tLkOg('categoriesOfParticipants.price')}</MenuItem>
        </Select>
      </THCell>

      <THCell onClick={removeRowsFromTable}>
        <Delete type='button'>{tLkOg('categoriesOfParticipants.delete')}</Delete>
      </THCell>

      <THCell>
        <THCancel type='button' onClick={() => setSelectedInTableRows([])}>
          <XIcon /> {tLkOg('categoriesOfParticipants.reset')}
        </THCancel>
      </THCell>
    </TableCollapseHead>
  )
}

export default EventParticipantCategoriesTableCollapseHead

const TableCollapseHead = styled.div`
  height: 80px;
  display: grid;
  grid-template: 1fr / max-content 145px auto 150px;
  background: #0f0f10;
  padding: 0 8px;
`

const THCell = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
`

const ThText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #f2f2f2;

  & span {
    color: #6d4eea;
    cursor: pointer;
  }
`

const Delete = styled.button`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #eb5757;
  padding: 5px;
  text-align: end;
`

const THCancel = styled.button`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  grid-gap: 4px;

  color: #f2f2f2;
`

const XIcon = () => (
  <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M15 5L5 15'
      stroke='#F2F2F2'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M5 5L15 15'
      stroke='#F2F2F2'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
