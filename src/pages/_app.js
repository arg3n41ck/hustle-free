import '../styles/globals.scss'
import { ThemeProvider as ThemeProviderMui } from '@mui/material'
import { ThemeProvider } from 'styled-components'
import { appWithTranslation } from 'next-i18next'

import { theme, themeMui } from '../styles/theme'
import Layout from '../components/layouts/Layout'
import { Provider } from 'react-redux'
import store from '../redux/store'
import 'react-toastify/dist/ReactToastify.css'
import RouterLoader from '../components/ui/RouterLoader'
import EventRouteWrapper from '../components/pages/LkOg/Tabs/Events/EventRouteProvider'
import { ToastContainer } from 'react-toastify'
import { YMInitializer } from 'react-yandex-metrika'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProviderMui theme={themeMui}>
        <ThemeProvider theme={theme}>
          <Layout>
            <RouterLoader />
            <ToastContainer
              position='top-right'
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <EventRouteWrapper>
              <Component {...pageProps} />
            </EventRouteWrapper>
          </Layout>
        </ThemeProvider>
      </ThemeProviderMui>
      <YMInitializer
        accounts={[90223044]}
        options={{
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true,
          // trackHash: true,
        }}
        version='2'
      />
    </Provider>
  )
}

export default appWithTranslation(MyApp)
