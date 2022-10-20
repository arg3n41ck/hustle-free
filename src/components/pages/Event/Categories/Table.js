import React from 'react'
import styled from 'styled-components'

function Table({ rewrittenData, columns }) {
  return (
    <Wrapper>
      <Scrollbar>
        <StyledTable>
          <Thead>
            <Tr>
              {columns.map(({ column, accessor }) => (
                <Th key={`pc-${column}${accessor}`}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <tbody>
            {!!rewrittenData.length &&
              rewrittenData.map((cell, index) => {
                return (
                  <Tr key={`pc-table-row-${cell.id}-${index}`}>
                    {columns.map(({ accessor }) => (
                      <Td key={`pc-table-cell-${cell[accessor]}-${cell.id}`}>{cell[accessor]}</Td>
                    ))}
                  </Tr>
                )
              })}
          </tbody>
        </StyledTable>
      </Scrollbar>
    </Wrapper>
  )
}

export default Table

const Wrapper = styled.div`
  border: 1px solid #333;
  border-radius: 16px;
  overflow: hidden;
`

const Scrollbar = styled.div`
  position: sticky;
  top: 0;
  overflow: auto;
`

const StyledTable = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: collapse;
`

const Thead = styled.thead`
  border-bottom: 1px solid #333;
`

const Tr = styled.tr`
  position: relative;
  border-bottom: 1px solid #333;
  td {
    max-width: 150px;
  }
  & td:first-child {
    min-width: 200px;
  }

  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
      linear-gradient(0deg, rgba(109, 78, 234, 0.2), rgba(109, 78, 234, 0.2)), #191a1f;
  }

  &:last-child {
    border-bottom: none;
  }
`

const Th = styled.th`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #828282;
  text-align: start;
  padding: 20px;

  border-right: 1px solid #333;
  &:last-child {
    border-right: none;
  }
`

const Td = styled.td`
  position: relative;
  width: max-content;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;
  padding: 20px;
  cursor: pointer;

  border-right: 1px solid #333;
  &:last-child {
    border-right: none;
  }
`
