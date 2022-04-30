import React, { useCallback } from "react"
import styled from "styled-components"
import { Checkbox } from "@mui/material"

const Table = ({ columns, data, select, selectedRows, onSelect }) => {
  const selectAllRows = useCallback(
    ({ target: { checked } }) => {
      if (checked) {
        const ids = data.map(({ id }) => id)
        onSelect(ids)
        return
      }
      onSelect([])
    },
    [data]
  )
  const selectRow = useCallback(
    (checked, id) => {
      let ids = []
      if (checked) {
        ids = [...selectedRows, id]
        onSelect(ids)
        return
      }
      ids = selectedRows.filter((_id) => _id !== id)
      onSelect(ids)
    },
    [selectedRows, data]
  )

  return (
    <Wrapper>
      <Scrollbar>
        <StyledTable>
          <Thead>
            <Tr
              select={select}
              active={data.length > 0 && selectedRows.length === data.length}
            >
              {select && (
                <Th>
                  <Checkbox
                    checked={
                      data.length > 0 && selectedRows.length === data.length
                    }
                    onChange={selectAllRows}
                  />
                </Th>
              )}
              {columns.map(({ column, accessor }) => (
                <Th key={`${column}${accessor}`}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <tbody>
            {data.map((cell) => {
              return (
                <Tr
                  active={selectedRows.includes(cell.id)}
                  key={`table-row-${cell.id}`}
                  select={select}
                >
                  {select && (
                    <Td className={select ? "hoveredCheckbox" : ""}>
                      <Checkbox
                        checked={selectedRows.includes(cell.id)}
                        sx={{ zIndex: "3" }}
                        onChange={({ target: { checked } }) =>
                          selectRow(checked, cell.id)
                        }
                      />
                    </Td>
                  )}
                  {columns.map(({ accessor, onClick }, i) => (
                    <Td
                      className={
                        select && i === 0 ? "hoveredAfterCheckbox" : ""
                      }
                      onClick={() => onClick && onClick(cell.id)}
                      key={`table-cell-${cell[accessor]}-${cell.id}`}
                    >
                      {cell[accessor]}
                    </Td>
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
  border-bottom: 1px solid #333;
  & > th:first-child,
  & > td:first-child {
    padding: ${({ select }) => (select ? "20px 0 20px 20px" : "20px")};
    border-right: ${({ select }) => (select ? "none" : "1px solid #333")};
  }
  & > th:nth-child(2),
  & > td:nth-child(2) {
    padding: ${({ select }) => (select ? "20px 20px 20px 0" : "20px")};
  }

  background: ${({ active }) =>
    active
      ? "linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(109, 78, 234, 0.2), rgba(109, 78, 234, 0.2)), #191A1F"
      : "transparent"};

  & .hoveredCheckbox:hover + .hoveredAfterCheckbox {
    background: #0f0f10;
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

  &:hover {
    background: #0f0f10;
  }

  &.hoveredAfterCheckbox:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: -76px;
    width: 76px;
    height: 84px;
    background: #0f0f10;
    z-index: 2;
  }

  border-right: 1px solid #333;
  &:last-child {
    border-right: none;
  }
`
