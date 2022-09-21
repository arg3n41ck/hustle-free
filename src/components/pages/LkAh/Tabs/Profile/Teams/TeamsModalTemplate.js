import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAthleteTeams } from '../../../../../../redux/components/teams'
import $api from '../../../../../../services/axios'
import TeamModeration from './TeamModeration'
import TeamSearchContent from './TeamSearchContent'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 15px)',
  bgcolor: '#1b1c22',
  border: '1px solid #333333',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.5)',
  borderRadius: '16px',
  maxWidth: 728,
}

const applyToTeam = async (body) => {
  await $api.post('/teams/athlete_requests/', body)
}

function TeamsModalTemplate({ open, onClose }) {
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [modOpen, setModOpen] = useState(false)
  const { user } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onModSubmit = async () => {
    selectedTeam && (await applyToTeam({ team: selectedTeam?.id, athlete: user?.athleteId }))
    dispatch(fetchAthleteTeams({ athletes: user.athleteId }))
    setSelectedTeam(null)
    setModOpen(false)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {!modOpen ? (
          <TeamSearchContent
            onClose={onClose}
            selectedTeam={selectedTeam}
            setSelectedTeam={setSelectedTeam}
            setModOpen={setModOpen}
          />
        ) : (
          <TeamModeration
            selectedTeam={selectedTeam}
            onClose={() => setModOpen(false)}
            onSubmit={onModSubmit}
          />
        )}
      </Box>
    </Modal>
  )
}

export default TeamsModalTemplate
