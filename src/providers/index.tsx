'use client'

import { Provider } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import ToastNotice from './toast'
import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { store } from '@redux/store'
import theme from '@themes/index'

const AppProvider = ({ children }: any) => {
   return (
      <Provider store={store}>
         <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
            <ToastNotice />
         </ThemeProvider>
      </Provider>
   )
}

export default AppProvider
