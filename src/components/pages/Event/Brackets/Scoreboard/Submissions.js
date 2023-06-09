import React, { useContext, useRef } from 'react'
import { ScoreboardContext } from './context'
import styled from 'styled-components'
import { useClickAway } from 'react-use'
import { toast } from 'react-toastify'
import { TextField } from '@mui/material'
import useDebounce from '../../../../../hooks/useDebounce'

export default function Submissions() {
  const modalRef = useRef(null)
  const {
    roundSubmission,
    openSubmissions,
    handleCloseSubmissions,
    onSearch,
    submissions,
    onSelectSubmissionType,
  } = useContext(ScoreboardContext)

  useClickAway(modalRef, () => {
    handleCloseSubmissions()
  })

  return (
    <SubmissionModal open={openSubmissions} ref={modalRef}>
      <Title>Submission</Title>

      <Input
        placeholder='Поиск по названию'
        onChange={({ target: { value } }) => onSearch(value)}
      />

      <SubmissionsUL>
        {!!submissions.length &&
          submissions.map(({ name, id }) => (
            <Submission
              key={id}
              className={`${roundSubmission.submissionType == id ? 'active' : ''}`}
              onClick={() => onSelectSubmissionType(id)}
            >
              {name}
            </Submission>
          ))}
      </SubmissionsUL>
    </SubmissionModal>
  )
}

const SubmissionModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  min-width: 600px;
  min-height: 700px;
  height: min-content;
  width: min-content;

  display: ${({ open }) => (open ? 'flex' : 'none')};
  flex-direction: column;
  grid-row-gap: 12px;

  background: #1b1c22;
  border: 1px solid #333333;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.5);
  border-radius: 16px;

  z-index: 99999999;

  padding: 16px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  /* identical to box height, or 133% */

  /* #F2F2F2 */

  color: #f2f2f2;
`

const Input = styled.input`
  width: 100%;
  background: #0f0f10;
  /* #333333 */

  border: 1.5px solid #333333;
  border-radius: 16px;
  padding: 15px;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #f2f2f2;

  &::placeholder {
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    color: #bdbdbd;
  }
`

const SubmissionsUL = styled.ul`
  max-height: 400px;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  grid-row-gap: 8px;

  padding: 24px 0;
  border-top: 1px solid #333;
`

const Submission = styled.li`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 32px;
  color: #f2f2f2;
  cursor: pointer;

  &.active {
    background: #f2c94c;
    color: #0f0f10;
  }

  &:hover {
    background-color: #333;
  }
`
