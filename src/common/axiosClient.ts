import axios from 'axios'
import { toast } from 'react-toastify'

const BE_DOMAIN = (env: string) => {
   switch (env) {
      case 'dev':
         return ''
      case 'prod':
         return ''
      default:
         return 'http://localhost/'
   }
}

export const BASE_URL = BE_DOMAIN(process.env.NODE_ENV)

export const getAccessToken = () => {
   let accessToken: string | null = ''
   let refreshToken: string | null = ''
   if (typeof window !== 'undefined') {
      accessToken = localStorage?.getItem('access_token')
      refreshToken = localStorage?.getItem('refresh_token')
   }
   //   return `Bearer accessToken`;
   return { refreshToken, accessToken }
}

export const axiosClient = axios.create({
   baseURL: BASE_URL,
   headers: {
      'Content-Type': 'application/json',
   },
})

axiosClient.interceptors.request.use(
   async (config: any) => {
      // const session = await getSession()
      return config
   },
   error => {
      return Promise.reject(error)
   },
)

axiosClient.interceptors.response.use(
   async response => {
      if (response.data.message) {
         if (response.data?.success) {
            toast.success(response.data?.message)
         } else {
            toast.info(response.data?.message)
         }
      }
      return response
   },
   async error => {
      // Handle errors here
      if (error.response?.status) {
         // const session = await getSession()
         // if (error.response.status === 401) {
         // call api refreshToken
         // const res = await authService.refreshToken({
         //     refresh_token:
         //         Cookies.get('refresh_token') ||
         //         session?.user.refresh_token,
         // })
         // if (res.data) {
         //     Cookies.set('access_token', res.data.access_token)
         //     Cookies.set('refresh_token', res.data.refresh_token)
         // }
         // }
         switch (error.response.status) {
            case 401:
               // Handle Unauthenticated here
               break
            case 403:
               // Handle Unauthorized here
               // toast({ title: error.response?.status })
               break
            case 400:
               toast.error(error.response?.data?.message)
               break
            // ... And so on
         }
      }
      return error
   },
)
