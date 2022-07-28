import React, { useState } from 'react'
import styled from 'styled-components'
import { Box, IconButton } from '@mui/material'
import { useTranslation } from 'next-i18next'
import CropEasy from '../image-crop/CropEasy'
import { Crop } from '@mui/icons-material'

function FileUploaderBig({ onChange, defaultImage, error }) {
  const [file, setFile] = useState(null)
  const [photoURL, setPhotoURL] = useState(defaultImage)
  // const [openCrop, setOpenCrop] = useState(false)
  const { t: tLkOg } = useTranslation('lkOg')

  const handleOnDeleteImage = () => {
    setFile(null)
    setDefaultImage(null)
  }

  const onUploadImage = (e) => {
    const _file = e.target.files[0]
    setFile(_file)
    setPhotoURL(URL.createObjectURL(_file))
    // setOpenCrop(true)
    onChange(_file)
  }

  return (
    <FileUploadLabel>
      <CustomInput type='file' error={!!error} onChange={onUploadImage} />
      {/* {openCrop && <CropEasy {...{ openCrop, photoURL, setOpenCrop, setPhotoURL, setFile }} />} */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gridGap: '8px',
          width: '100%',
          height: '100%',
          zIndex: 3,
        }}
      >
        <FileUploadSVG />
        <UploadText>
          {tLkOg('coverAndDescription.coverPlaceholder')}{' '}
          <span>{tLkOg('coverAndDescription.download')}</span>
        </UploadText>
        {file && (
          <IconButton aria-label='Crop' color='primary' onClick={() => setOpenCrop(true)}>
            <Crop />
          </IconButton>
        )}
        <UploadDescription>{tLkOg('coverAndDescription.coverPlaceholder2')}</UploadDescription>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Box>

      {photoURL && (
        <ImageWrapper>
          <Image src={photoURL} />
          <HoverBlock>
            <DeleteIcon onClick={handleOnDeleteImage} />
          </HoverBlock>
        </ImageWrapper>
      )}
    </FileUploadLabel>
  )
}

export default FileUploaderBig

const ErrorMessage = styled.p`
  color: #eb5757;
  font-family: Inter, sans-serif;
  font-size: 14px;
`

const FileUploadLabel = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: 2px dashed #828282;
  border-radius: 8px;
  width: 100%;
  padding: 22px 0;
  font-size: 18px;
  line-height: 24px;
  min-height: 230px;
  height: 100%;

  input[type='file'] {
    top: 0;
    right: 0;
    left: 0;
    opacity: 0;
    position: absolute;
    z-index: 4;
    height: 100%;
    width: 100%;
  }
  span {
    color: #6d4eea;
  }
`

const CustomInput = styled.input`
  border: ${(p) => (p.error ? '1px solid #EB5757' : '1px solid #000')};
`

const UploadText = styled.p`
  text-align: center;
  color: #828282;
  pointer-events: none;
`

const UploadDescription = styled.p`
  color: #828282;
  font-size: 18px;
  line-height: 24px;
`

const Image = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: no-repeat url('${({ src }) => src}') center / cover;
`

const HoverBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  padding: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  background: rgba(0, 0, 0, 0.65);
  border-radius: 8px;
  z-index: 6;
  top: 0;
  left: 0;
  right: 0;
`

const ImageWrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;

  &:hover {
    & ${HoverBlock} {
      opacity: 1;
    }
  }
`

export const FileUploadSVG = () => (
  <svg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M40.0002 46.666L38.586 48.0802L40.0002 49.4944L41.4144 48.0802L40.0002 46.666ZM42.0002 16.666C42.0002 15.5614 41.1047 14.666 40.0002 14.666C38.8956 14.666 38.0002 15.5614 38.0002 16.666L42.0002 16.666ZM21.9193 31.4136L38.586 48.0802L41.4144 45.2518L24.7477 28.5851L21.9193 31.4136ZM41.4144 48.0802L58.0811 31.4136L55.2526 28.5851L38.586 45.2518L41.4144 48.0802ZM42.0002 46.666L42.0002 16.666L38.0002 16.666L38.0002 46.666L42.0002 46.666Z'
      fill='#828282'
    />
    <path
      d='M23.3332 63.334L23.3332 65.334H23.3332V63.334ZM56.6665 63.334V65.334V63.334ZM23.3332 65.334L56.6665 65.334V61.334L23.3332 61.334V65.334ZM18.6665 56.6673V53.334H14.6665V56.6673H18.6665ZM65.3332 56.6673V53.334H61.3332V56.6673H65.3332ZM56.6665 65.334C61.453 65.334 65.3332 61.4538 65.3332 56.6673H61.3332C61.3332 59.2446 59.2438 61.334 56.6665 61.334V65.334ZM23.3332 61.334C20.7558 61.334 18.6665 59.2446 18.6665 56.6673H14.6665C14.6665 61.4538 18.5467 65.334 23.3332 65.334L23.3332 61.334Z'
      fill='#828282'
    />
  </svg>
)

const DeleteIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    width='28'
    height='28'
    viewBox='0 0 28 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <circle
      cx='14'
      cy='14'
      r='11.1'
      fill='black'
      fillOpacity='0.5'
      stroke='#FBFBFB'
      strokeWidth='1.2'
    />
    <path
      d='M18.6668 9.3335L9.3335 18.6668'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M9.33317 9.3335L18.6665 18.6668'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
)
