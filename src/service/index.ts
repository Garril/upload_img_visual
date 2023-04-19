import axios, { AxiosRequestConfig } from 'axios'

type RequestOptions = AxiosRequestConfig

const instance = axios.create({
  baseURL: '/curflow',
  timeout: 10000
})

export default function request<T>(options: RequestOptions): Promise<T> {
  return instance(options)
    .then(response => {
      return response.data as T
    })
    .catch(error => {
      throw error
    })
}
