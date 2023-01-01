import React, { useCallback, useEffect } from 'react'
import HorizontalTabs from '../../../ui/tabs/HorizontalTabs'
import OrganizerLegalData from './OrganizerLegalData'
import OrganizerPersonalData from './OrganizerPersonalData'
import { useDispatch } from 'react-redux'
import { fetchCountries } from '../../../../redux/components/countriesAndCities'
import { toast } from 'react-toastify'
import { formDataHttp } from '../../../../helpers/formDataHttp'
import { useRouter } from 'next/router'
import { setCookie } from '../../../../services/JWTService'
import { useTranslation } from 'next-i18next'
import { useRef } from 'react'
import { fetchUser } from '../../../../redux/components/user'

function OrganizerTabs() {
  const [view, setView] = React.useState('contactInfo') // contactInfo | legalInfo
  const [dataPersonal, setDataPersonal] = React.useState(null)
  const [dataLegal] = React.useState('null')
  const router = useRouter()
  const dispatch = useDispatch()
  const { t: tAuth } = useTranslation('auth')

  const { current: tabs } = useRef([
    {
      value: 'contactInfo',
      name: tAuth('organizer.tabs.contacts'),
    },
    {
      value: 'legalInfo',
      name: tAuth('organizer.tabs.legalInfo'),
    },
  ])

  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  const onSubmit = useCallback(async (values) => {
    try {
      const { data } = await formDataHttp(values, 'accounts/organizer/', 'post')
      setCookie('token', data.access, 999)
      setCookie('refresh', data.refresh, 999999)
      toast.success(tAuth('toast.successActivation'))
      dispatch(fetchUser())
      await router.push('/')
    } catch (e) {}
  }, [])

  return (
    <div className='auth-container'>
      <div className='auth-wrapper'>
        <h3 className='auth-title'>{tAuth('organizer.welcome')}</h3>
        <p className='auth-description'>{tAuth('regorganizerP')}</p>
        <HorizontalTabs arrayTab={tabs} valueTab={view} onChangeHandler={setView}>
          {view === 'contactInfo' && (
            <OrganizerPersonalData
              data={dataPersonal}
              setData={setDataPersonal}
              setView={setView}
            />
          )}
          {view === 'legalInfo' && (
            <OrganizerLegalData onSubmit={onSubmit} dataPersonal={dataPersonal} data={dataLegal} />
          )}
        </HorizontalTabs>
      </div>
    </div>
  )
}

export default OrganizerTabs
