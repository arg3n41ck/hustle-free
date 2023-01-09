import React, { useMemo } from 'react'
import styled from 'styled-components'
import DonutChart from 'react-svg-donut-chart'

export default function ResultsChart({ wins, defeats, chartWHSize = null }) {
  const dataPie = useMemo(() => {
    return !!wins + defeats
      ? [
          { value: (wins * 100) / (wins + defeats), stroke: '#27AE60', strokeWidth: 2 },
          { value: (defeats * 100) / (wins + defeats), stroke: '#EB5757', strokeWidth: 2 },
        ]
      : [{ value: 100, stroke: '#333', strokeWidth: 2 }]
  }, [wins, defeats])

  return (
    <Chart size={chartWHSize}>
      <DonutChart data={dataPie} />
      <CenterText size={chartWHSize}>
        {wins} <span>побед</span>
      </CenterText>
    </Chart>
  )
}

const Chart = styled.div`
  position: relative;

  height: ${({ size }) => (size ? size : 240)}px;
  width: ${({ size }) => (size ? size : 240)}px;

  @media screen and (max-width: 576px) {
    height: ${({ size }) => (size ? size : 143)}px;
    width: ${({ size }) => (size ? size : 143)}px;

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
  font-size: ${({ size }) => (size || 240) * 0.25}px;
  line-height: 100%;

  color: #f2f2f2;

  & span {
    font-size: ${({ size }) => (size || 240) * 0.07}px;
    font-weight: 500;
    line-height: 100%;
  }

  @media screen and (max-width: 576px) {
    font-size: ${({ size }) => (size || 112) * 0.25}px;

    & span {
      font-size: ${({ size }) => (size || 112) * 0.07}px;
    }
  }
`
