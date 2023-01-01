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
  }, [])

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
  grid-template: 143px min-content / 1fr;
  padding: 32px;
  gap: 20px;

  ${theme.mqMax('md')} {
    padding: 16px;
    border-radius: 12px;
  }
`

const Chart = styled.div`
  position: relative;

  height: 143px;
  width: 143px;

  align-self: center;
  justify-self: center;

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

  font-weight: 900;
  font-size: 40px;
  line-height: 48px;
  text-transform: uppercase;

  color: #f2f2f2;

  & span {
    font-size: 10px;
    font-weight: 500;
    line-height: 100%;
  }
`

const Legends = styled.ul`
  li {
    font-size: 24px;
    line-height: 150%;
    text-align: center;

    & span {
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
`
