import axios from 'axios'

class CustomResponse<T> {
  public data!: T
  public error!: boolean
  public message!: string

  constructor() {
    this.data = {} as T
    this.error = false
    this.message = ''
  }

  public badResponse(): CustomResponse<T> {
    const response = new CustomResponse<T>()
    response.error = true
    response.message = 'Bad response'
    return response
  }

  public setResponse(data: T, error: boolean, message: string): CustomResponse<T> {
    const response = new CustomResponse<T>()
    response.data = data
    response.error = error
    response.message = message
    return response
  }
}

const api = 'http://localhost:3001/api/v1/'

const useGetList = async<T>(route: string): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'get', {} as T)
}

const usePost = async<T>(route: string, data: T): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'post', data)
}

const useDelete = async<T>(route: string): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'delete', {} as T)
}

const useGet = async<T>(route: string): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'get', {} as T)
}

const usePatch = async<T>(route: string, data: T): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'patch', data)
}

const useCustom = async<T>(route: string, method: string, data: T): Promise<CustomResponse<T>> => {
  const customResponse = new CustomResponse<T>()
  try {
    const response = await axios({
      method: method,
      url: `${api}${route}`,
      data: data,
    })

    if (response?.data?.error) {
      return customResponse.badResponse()
    }

    return customResponse.setResponse(response.data.content, false, '')

  } catch (error) {
    return customResponse.badResponse()

  }

}


export { useGetList, usePost, useDelete, useGet, useCustom, usePatch }