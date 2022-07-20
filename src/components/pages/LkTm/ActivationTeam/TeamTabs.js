import React, { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSportTypes, selectSportTypes } from '../../../../redux/components/sportTypes'
import HorizontalTabs from '../../../ui/tabs/HorizontalTabs'
import TeamContactInfo from './TeamContactInfo'
import TeamInfo from './TeamInfo'
import { toast } from 'react-toastify'
import { formDataHttp } from '../../../../helpers/formDataHttp'
import { useRouter } from 'next/router'
import { setCookie } from '../../../../services/JWTService'
import { fetchCountries } from '../../../../redux/components/countriesAndCities'
import { useTranslation } from 'next-i18next'

function TeamTabs() {
  const [view, setView] = React.useState('contactInfo') // contactInfo | info
  const [dataContactInfo, setDataContactInfo] = React.useState(null)
  const [dataInfo, setDataInfo] = React.useState(null)
  const [sportTypes] = useSelector(selectSportTypes)
  const dispatch = useDispatch()
  const router = useRouter()
  const { t: tAuth } = useTranslation('auth')

  const { current: tabs } = useRef([
    {
      value: 'contactInfo',
      name: tAuth('team.tabs.contacts'),
    },
    {
      value: 'info',
      name: tAuth('team.tabs.info'),
    },
  ])

  useEffect(() => {
    dispatch(fetchCountries())
    dispatch(fetchSportTypes())
  }, [])

  const onSubmit = useCallback(async (submitData) => {
    try {
      await formDataHttp(submitData, 'accounts/team/', 'post').then(async ({ data }) => {
        setCookie('token', data.access, 999)
        setCookie('refresh', data.refresh, 999999)
      })
      toast.success(tAuth('toast.successActivation'))
      await router.push('/')
    } catch (e) {
      toast.error(tAuth('toast.someWrong'))
    }
  }, [])

  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        <h3 className='auth-title'>{tAuth('registrationH1')}</h3>
        <p className='auth-description'>{tAuth('regteamP')}</p>
        <HorizontalTabs arrayTab={tabs} valueTab={view} onChangeHandler={setView}>
          {view === 'contactInfo' && (
            <TeamContactInfo
              data={dataContactInfo}
              setData={setDataContactInfo}
              setView={setView}
            />
          )}
          {view === 'info' && (
            <TeamInfo
              dataPersonal={dataContactInfo}
              data={dataInfo}
              sportTypes={sportTypes}
              setDataInfo={setDataInfo}
              onSubmit={onSubmit}
            />
          )}
        </HorizontalTabs>
      </div>
    </div>
  )
}

export default TeamTabs
