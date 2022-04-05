import $api from "../../../../services/axios"
import React, { useCallback, useState } from "react"
import GalleryCreationModal from "./GalleryCreationModal"
import styled from "styled-components"
import Image from "next/image"

const getGalleryByStartup = async (id) => {
  try {
    const { data } = await $api.get(`/startup/startups/${id}/`)
    return data
  } catch (e) {
    console.log(e)
  }
}

const deleteImage = async (id) => {
  try {
    return await $api.delete(`/startup/galleries/${id}/`)
  } catch (e) {
    console.log(e)
  }
}

export default function Gallery({
  startup: { galleries, id: startupID },
  openModal,
  closeModal,
}) {
  const [galleryUpdated, setGalleryUpdated] = useState(
    galleries.filter(({ image }) => !!image)
  )

  const updateGallery = useCallback(() => {
    getGalleryByStartup(startupID).then((res) => {
      setGalleryUpdated(res.galleries.filter(({ image }) => image))
    })
  }, [startupID, galleries])

  const onDeleteImage = (id) => {
    deleteImage(id).then(() => updateGallery())
  }

  return (
    <>
      <GalleryCreationModal
        startupID={startupID}
        galleryUpdated={galleryUpdated}
        updateGallery={updateGallery}
        handleClose={closeModal}
        open={openModal}
        deleteImage={deleteImage}
      />
      <GalleryWrapper>
        <ImagesList>
          {!!galleryUpdated?.length &&
            galleryUpdated.map(({ id, image }) => (
              <WrapperImage key={`galleryUpdated_${id}`} src={image}>
                <Image
                  src={image}
                  height={256}
                  width={256}
                  objectFit={"cover"}
                />
                <DeleteImageWrapper onClick={() => onDeleteImage(id)}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 28 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="14"
                      cy="14"
                      r="11.1"
                      fill="black"
                      fillOpacity="0.5"
                      stroke="#FBFBFB"
                      strokeWidth="1.2"
                    />
                    <path
                      d="M18.6673 9.33325L9.33398 18.6666"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.33268 9.33325L18.666 18.6666"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </DeleteImageWrapper>
                <Shadow>удалить</Shadow>
              </WrapperImage>
            ))}
        </ImagesList>
      </GalleryWrapper>
    </>
  )
}

const GalleryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const ImagesList = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 16px;
  overflow: auto;

  @media (max-width: 542px) {
    justify-content: space-around;
  }
`

const WrapperImage = styled.div`
  position: relative;
  width: 256px;
  height: 256px;
  // background: no-repeat url(${(p) => p.src}?tr=w-256h-256) center / cover;
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    button {
      opacity: 1;
      z-index: 32;
    }
  }
`

const Shadow = styled.div`
  width: 100%;
  height: 100%;
  opacity: 0;
  background: rgba(0, 0, 0, 0.46);
  transition: 0.2s ease-in;
  z-index: 1;
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const DeleteImageWrapper = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  transition: 0.2s ease-in;
  opacity: 0;
  padding: 0;
  background: none;
  border: none;
  z-index: 2;

  &:hover + div {
    opacity: 1;
  }

  img {
    background-color: #fff;
    border-radius: 50%;
  }
  span {
    border: 3px solid #fff;
  }
`
