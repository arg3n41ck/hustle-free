import React from 'react'
import styled from 'styled-components'

export default function BracketCell({ cell, gridTemplateAreas, borderDirection, classes }) {
  const { id, fighters, fightNumber, parents, children } = cell
  return (
    <CellWrapper
      className={`${parents?.length ? 'parents' : ''} ${borderDirection} ${classes || ''}`}
      style={gridTemplateAreas ? { gridArea: `cell-${id}` } : {}}
    >
      <Self>
        FN - {fightNumber} / ID - {id}
      </Self>
      <FighterWrapper className='first'>{fighters[0]?.name || '?'}</FighterWrapper>
      <FighterWrapper className='second'>{fighters[1]?.name || '?'}</FighterWrapper>
      {!!children?.length && <Children>{children[0]}</Children>}
    </CellWrapper>
  )
}

const FighterWrapper = styled.div`
  min-height: 56px;
  width: 208px;
  background: #1b1c22;
  border: 1px solid #333333;
  display: flex;
  justify-content: flex-end;
  font-weight: 700;

  &.first {
    border-radius: 8px 8px 0 0;
    align-items: center;
    border-bottom: none;
  }

  &.second {
    border-radius: 0 0 8px 8px;
    border-top: none;
    border-bottom: 1px solid #333333;
  }
`

const CellWrapper = styled.div`
  position: relative;
  display: grid;
  grid-template: min-content min-content / 1fr;
  align-content: center;
  padding: 16px 0;

  &::after,
  &::before {
    content: '';
    height: 50%;
    position: absolute;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
    border-top: 2px solid #333;
  }

  &.lineDown,
  &.lineUp,
  &.straight {
    &::after,
    &::before {
      width: calc(100% + 32px);
    }
  }

  &.parents {
    &::after,
    &::before {
      width: 224px;
      left: -32px;
    }

    &.lineDown,
    &.lineUp,
    &.straight {
      &::after,
      &::before {
        width: calc(100% + 64px);
        left: -32px;
      }
    }
  }

  &.lineDown {
    &::after {
      border-right: 2px solid #333;
    }
  }
  &.lineUp {
    &::before {
      border-right: 2px solid #333;
    }
  }

  &.noBorder::after,
  &.noBorder::before {
    width: 208px;
    height: 50%;
    left: 0;
  }
`

const Self = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 18px;
  padding: 5px;
  border-radius: 10px;
  background: #000;
  z-index: 1;
`

const Children = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  font-weight: 700;
  font-size: 18px;
  padding: 5px;
  border-radius: 10px;
  background: #333;
  z-index: 1;
`
