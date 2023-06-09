import React from 'react'

export const ScoreboardContext = React.createContext({
  loading: false,
  error: null,
  open: false,
  onOpen: () => {},
  onClose: () => {},
  scoreboard: null,
  changeScore: () => {},
  switchSides: () => {},
  undoScoringAction: () => {},
  reverseFighters: false,
  timerState: {},
  handleTimerChange: () => {},
  roundSubmission: {},
  onEnd: () => {},
  onSelectWinType: () => {},
  onSelectSubmissionType: () => {},
  handleOpenSubmissions: () => {},
  openSubmissions: false,
  handleCloseSubmissions: () => {},
  submissions: [],
  onSearch: () => {},
  onWin: () => {},
  ogAndIsMyEvent: false,
})
