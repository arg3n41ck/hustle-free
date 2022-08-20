import { Box, Button, Modal, Slider } from '@mui/material'
import React, { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../../utils/cropImage'
import styled from 'styled-components'
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

const CropEasy = ({ image, onSave, open, setOpen }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const { t: tCommon } = useTranslation('common')

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const saveCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels)
      onSave(
        new File([croppedImage.file], croppedImage.file?.name, {
          type: croppedImage.type,
        }),
      )
      setOpen(false)
    } catch (e) {
      console.error(e)
    }
  }, [croppedAreaPixels])

  const onCancel = useCallback(() => {
    setOpen(false)
    setCroppedAreaPixels(null)
    setCroppedImage(null)
  }, [])

  return (
    <Modal open={open}>
      <Box sx={style}>
        <Header>{tCommon('form.fieldsNames.crop.title')}</Header>
        <Rules>{tCommon('form.fieldsNames.crop.rules')}</Rules>
        <CropWrapper>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={3 / 1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </CropWrapper>
        <Container>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(_, value) => setZoom(+value)}
          />
          <ActionBtns>
            <Button onClick={onCancel} variant='outlined'>
              {tCommon('form.fieldsNames.cancel')}
            </Button>
            <Button variant='contained' onClick={saveCroppedImage}>
              {tCommon('form.fieldsNames.save')}
            </Button>
          </ActionBtns>
        </Container>
      </Box>
    </Modal>
  )
}

export default CropEasy

const Header = styled.h2`
  width: 100%;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #f2f2f2;

  padding: 24px;
  border-bottom: 1px solid #333333;
`

const Container = styled.div`
  width: 100%;
  padding: 0 24px;
`

const Rules = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: #bdbdbd;
  margin: 0 24px;
`

const CropWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
`

const ActionBtns = styled.div`
  display: flex;
  justify-content: flex-end;
  grid-gap: 24px;
`
