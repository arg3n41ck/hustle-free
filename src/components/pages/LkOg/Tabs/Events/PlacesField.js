import React, { useEffect, useRef, useState } from 'react'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import { useGoogleMapsScript } from 'use-google-maps-script'
import { TextField } from '@mui/material'
import styled from 'styled-components'
import useClickOutside from '../../../../../hooks/useClickOutside'

const libraries = ['places']

export default function PlacesField({ defaultValue, onSelectAddress }) {
  const { isLoaded, loadError } = useGoogleMapsScript({
    // googleMapsApiKey: 'AIzaSyDkLDZEjqTyMbLuWm6ApG4ggfNh1YKk6oU',
    googleMapsApiKey: 'AIzaSyAnwR8BbWkIyD9kHGA1HMZ0bWVrIwpOojw',
    libraries,
  })

  if (!isLoaded) {
    return null
  }
  if (loadError) {
    return <div>Google places error</div>
  }
  return (
    <div>
      <SearchBox {...{ defaultValue, onSelectAddress }} />
    </div>
  )
}

const SearchBox = ({ defaultValue, onSelectAddress }) => {
  const [canBeVisible, setCanBeVisible] = useState(false)
  const [searchValue, setSearchValue] = useState(defaultValue)
  const {
    ready,
    value,
    setValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300, searchValue })
  const wrapperRef = useRef()
  useClickOutside(wrapperRef, () => setCanBeVisible(false))

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()

    try {
      const results = await getGeocode({ address })
      const { lat, lng } = await getLatLng(results[0])
      setSearchValue(address)
      onSelectAddress(address, lat, lng)
    } catch (error) {
      console.error(`😱 Error:`, error)
    }
  }

  useEffect(() => {
    setSearchValue(defaultValue)
  }, [defaultValue])

  const handleChange = (e) => {
    setSearchValue(e?.target?.value)
    setValue(e?.target?.value)
    if (e?.target?.value === '') {
      onSelectAddress('', null, null)
    }
  }

  return (
    <PlacesFieldWrapper ref={wrapperRef}>
      <TextField
        onChange={handleChange}
        onFocus={() => setCanBeVisible(true)}
        fullWidth
        placeholder='Введите адрес'
        disabled={!ready}
        value={searchValue}
      />
      {!!data?.length && !!canBeVisible && (
        <Options>
          {data.map(({ place_id, description }) => (
            <Option key={place_id} onClick={() => handleSelect(description)}>
              {description}
            </Option>
          ))}
        </Options>
      )}
    </PlacesFieldWrapper>
  )
}

const PlacesFieldWrapper = styled.div`
  position: relative;
`

const Options = styled.div`
  position: absolute;
  top: 68px;

  display: flex;
  flex-direction: column;
  grid-gap: 12px;

  background: #333333;
  border-radius: 8px;
  z-index: 20;
  padding: 16px 0;
`

const Option = styled.div`
  min-height: 32px;
  display: flex;
  align-items: center;
  padding: 4px 16px;
  color: #f2f2f2;
  cursor: pointer;

  &:hover {
    background: rgba(109, 78, 234, 0.07);
  }
`
