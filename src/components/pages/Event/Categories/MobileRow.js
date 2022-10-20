import React from 'react'
import styled from 'styled-components'

export default function MobileRow({ columns, rewrittenData }) {
  return (
    <Wrapper>
      <PCRow itemsLength={columns?.length}>
        {columns.map(({ column, accessor }, i) => (
          <HeadItem key={accessor}>
            {column} {i < columns.length - 1 ? '/' : ''}
          </HeadItem>
        ))}
      </PCRow>
      {!!rewrittenData.length &&
        rewrittenData.map((cell, index) => {
          return (
            <PCRow key={`pc-table-row-${cell.id}-${index}`} itemsLength={columns?.length}>
              {columns.map(({ accessor }, i) => (
                <PCItem key={`pc-mobile-cell-${cell[accessor]}-${cell.id}`}>
                  {cell[accessor] ? `${cell[accessor]}` : '...'}{' '}
                  {i < columns?.length - 1 ? '/ ' : ''}
                </PCItem>
              ))}
            </PCRow>
          )
        })}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background: #141519;
  z-index: 1;
  margin-top: -1px;
  overflow: auto;
`

const PCRow = styled.div`
  width: 100%;
  grid-gap: 5px;
  padding: 16px;
  border-bottom: 1px solid #1b1c22;

  display: grid;
  grid-template: 1fr / ${({ itemsLength }) => `repeat(${itemsLength}, max-content)`};

  &:last-child {
    border-bottom: none;
  }
`

const HeadItem = styled.div`
  font-weight: 400;
  font-size: 13px;

  color: #bdbdbd;
`

const PCItem = styled.div`
  font-size: 14px;
  color: #f2f2f2;
`
