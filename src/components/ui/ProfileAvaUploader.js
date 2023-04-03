import React from 'react'
import { Avatar, Modal } from '@mui/material'
import styled from 'styled-components'
import { UploadIcon } from '../../assets/svg/icons'
import { Box } from '@mui/system'
import { useTranslation } from 'next-i18next'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  bgcolor: '#1b1c22',
  border: '1px solid #333333',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.5)',
  borderRadius: '16px',
  maxWidth: 688,
  padding: '0 0 24px',

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gridGap: '24px',
}

function ProfileAvaUploader({ src, sx = { width: 112, height: 112 }, alt = '', onSave, ...rest }) {
  const [open, setOpen] = React.useState(false)
  const [file, setFile] = React.useState(null)
  const [imageToShow, setImageToShow] = React.useState(src)
  const [error, setError] = React.useState(null)

  const { t: tCommon } = useTranslation('common')

  return (
    <Wrapper>
      <Avatar alt={alt} src={src} sx={sx} {...rest} />
      <IconWrapper style={sx} onClick={() => setOpen(true)} htmlFor='profile_user_ava_uploader'>
        <UploadIcon />
      </IconWrapper>

      <Modal sx={{ margin: '0 24px' }} open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Header>{tCommon('form.fieldsNames.uploadNewFile')}</Header>

          {imageToShow && <Avatar alt={alt} src={imageToShow} sx={sx} />}

          <Rules>{tCommon('form.fieldsNames.userAvaRules1')}</Rules>

          <Rules style={{ color: error ? 'red' : '' }}>
            {tCommon('form.fieldsNames.userAvaRules2')}
          </Rules>

          <BtnsWrapper>
            <label htmlFor='profile_user_ava_uploader'>
              <input
                style={{ display: 'none' }}
                type='file'
                accept='.jpg, .jpeg, .png'
                onChange={({ target }) => {
                  if (target.files[0].size < 4000000) {
                    setFile(target.files[0])
                    setImageToShow(URL.createObjectURL(target.files[0]))
                    setError(null)
                  } else {
                    setError(true)
                  }
                }}
                id='profile_user_ava_uploader'
              />
              <UploadBtn>{tCommon('form.fieldsNames.selectFile')}</UploadBtn>
            </label>
            {file && (
              <UploadBtn
                onClick={() => {
                  onSave && onSave(file)
                  setOpen(false)
                }}
              >
                {tCommon('form.fieldsNames.save')}
              </UploadBtn>
            )}
          </BtnsWrapper>
        </Box>
      </Modal>
    </Wrapper>
  )
}

export default ProfileAvaUploader

const Rules = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #bdbdbd;
  margin: 0 24px;
  text-align: center;
`

const Header = styled.h2`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;

  padding: 24px;
  border-bottom: 1px solid #333333;
`

const IconWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  display: none;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
`

const Wrapper = styled.div`
  position: relative;
  width: 100%;

  &:hover {
    ${IconWrapper} {
      display: flex;
    }
  }
`

const UploadBtn = styled.div`
  width: fit-content;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  padding: 8px 32px;

  font-weight: 600;
  font-size: 18px;
  color: #ffffff;

  cursor: pointer;
`

const BtnsWrapper = styled.div`
  display: flex;
  grid-gap: 24px;
  flex-wrap: wrap;
`
