import {
  MinuteIcon,
  MinuteIconRev,
  PauseIcon,
  PlayIcon,
  SecIcon,
  SecIconRev,
  TenSecIcon,
  TenSecIconRev,
} from './icons'

export const scoreTimeActTypes = {
  decM: 'decreaseMinute',
  decTenS: 'decreaseTenSec',
  decS: 'decreaseOneSec',
  toggle: 'togglePausePlay',
  incM: 'increaseMinute',
  incTenSec: 'increaseTenSec',
  incOneSec: 'increaseOneSec',
}

export const scoreBtns = [
  {
    changeType: 1,
    changeValue: 1,
    label: 1,
  },
  {
    changeType: 1,
    changeValue: 2,
    label: 2,
  },
  {
    changeType: 1,
    changeValue: 3,
    label: 3,
  },
  {
    changeType: 1,
    changeValue: 4,
    label: 4,
  },
  {
    changeType: 2,
    changeValue: 1,
    label: 'A',
  },
  {
    changeType: 3,
    changeValue: 1,
    label: 'P',
  },
]

export const submissionNames = {
  1: 'Points',
  2: 'Submission',
  3: 'Disqualification',
  4: 'Walkover',
  5: 'Decision',
}

export const submissionBtns = [
  {
    winType: 1,
  },
  {
    winType: 2,
  },
  {
    winType: 3,
  },
  {
    winType: 4,
  },
  {
    winType: 5,
  },
]

export const timerActions = (timePlay) => [
  {
    actionType: scoreTimeActTypes.decM,
    component: <MinuteIconRev />,
  },
  {
    actionType: scoreTimeActTypes.decTenS,
    component: <TenSecIconRev />,
  },
  {
    actionType: scoreTimeActTypes.decS,
    component: <SecIconRev />,
  },
  {
    actionType: scoreTimeActTypes.toggle,
    component: timePlay ? <PauseIcon className='main' /> : <PlayIcon className='main' />,
  },
  {
    actionType: scoreTimeActTypes.incOneSec,
    component: <SecIcon />,
  },
  {
    actionType: scoreTimeActTypes.incTenSec,
    component: <TenSecIcon />,
  },
  {
    actionType: scoreTimeActTypes.incM,
    component: <MinuteIcon />,
  },
]
