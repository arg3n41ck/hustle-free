import React, { useMemo } from 'react'
import styled from 'styled-components'
import { theme } from '../../../../../../styles/theme'
import DonutChart from 'react-svg-donut-chart'

export default function ResultsChart({ wins, defeats }) {
  const dataPie = useMemo(() => {
    return !!wins + defeats
      ? [
          { value: (wins * 100) / (wins + defeats), stroke: '#27AE60', strokeWidth: 2 },
          { value: (defeats * 100) / (wins + defeats), stroke: '#EB5757', strokeWidth: 2 },
        ]
      : [{ value: 100, stroke: '#333', strokeWidth: 2 }]
  }, [wins, defeats])

  return (
    <MainWrapper>
      <Chart>
        <DonutChart data={dataPie} />
        <CenterText>
          {wins} <span>побед</span>
        </CenterText>
      </Chart>
      <Legends>
        <li>
          <span>{wins} </span>побед
        </li>
        <li>
          <span>{defeats} </span>поражений
        </li>
      </Legends>
    </MainWrapper>
  )
}

const MainWrapper = styled.div`
  padding: 32px;
  display: grid;
  grid-template: 1fr / min-content 1fr;

  @media screen and (max-width: 576px) {
    grid-template: 143px min-content / 1fr;
  }
  padding: 32px;
  gap: 20px;

  ${theme.mqMax('md')} {
    padding: 16px;
    border-radius: 12px;
  }
`

const Chart = styled.div`
  position: relative;

  height: 240px;
  width: 240px;

  @media screen and (max-width: 576px) {
    height: 143px;
    width: 143px;

    justify-self: center;
  }

  display: flex;
  justify-content: center;
  align-items: center;
`

const CenterText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;

  display: grid;
  grid-template: min-content min-content / 1fr;
  justify-items: center;
  align-items: center;

  transform: translate(-50%, -50%);
  text-transform: uppercase;
  font-weight: 900;
  font-size: 52px;
  line-height: 52px;

  color: #f2f2f2;

  & span {
    font-size: 18px;
    font-weight: 500;
    line-height: 100%;
  }

  @media screen and (max-width: 576px) {
    font-size: 40px;
    line-height: 48px;
    & span {
      font-size: 10px;
    }
  }
`

const Legends = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  li {
    font-size: 32px;
    line-height: 150%;
    display: grid;
    grid-template: 1fr/ 32px auto;
    grid-gap: 10;

    @media screen and (max-width: 576px) {
      display: flex;
      justify-content: center;
      grid-gap: 10px;
      font-size: 24px;
      text-align: center;
    }

    & span {
      justify-self: center;
      font-weight: 700;
    }
  }
  li:first-child {
    & span {
      color: #27ae60;
    }
  }
  li:nth-child(2) {
    & span {
      color: #eb5757;
    }
  }
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`
