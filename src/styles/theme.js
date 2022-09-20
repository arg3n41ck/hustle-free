import { createTheme } from '@mui/material'

// mui
export const themeMui = createTheme({
  palette: {
    primary: {
      main: '#6D4EEA',
    },
  },
})

// styled components
const breakpoints = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
}

const mq = (breakpoint) => `@media (min-width: ${breakpoints[breakpoint]}px)`

const mqMax = (breakpoint) => `@media (max-width: ${breakpoints[breakpoint] - 0.0001}px)`

const mqMin = (breakpoint) => `@media (min-width: ${breakpoints[breakpoint] - 0.0001}px)`

export const theme = {
  mq,
  mqMax,
  mqMin,
  breakpoints,
  colors: {},
}
