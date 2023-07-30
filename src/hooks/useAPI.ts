import axios from 'axios'
import Swal from 'sweetalert2'

class CustomResponse<T> {
  public data!: T
  public error!: boolean
  public message!: string[]

  constructor() {
    this.data = {} as T
    this.error = false
    this.message = ['']
  }

  public badResponse(errors:string[]): CustomResponse<T> {
    const response = new CustomResponse<T>()
    response.error = true
    response.message = errors
    return response
  }

  public setResponse(data: T, error: boolean, message: string[]): CustomResponse<T> {
    const response = new CustomResponse<T>()
    response.data = data
    response.error = error
    response.message = message
    return response
  }
}

const api = 'http://localhost:4008/api/v1/'
const salesapi = 'http://localhost:4001/api/v1/'

const useGetList = async<T>(route: string, salesAPI?: boolean): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'get', {} as T, salesAPI ? salesAPI : false)
}

const usePost = async<T>(route: string, data: T, salesAPI?: boolean): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'post', data, salesAPI ? salesAPI : false)
}

const useDelete = async<T>(route: string, salesAPI?: boolean): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'delete', {} as T, salesAPI ? salesAPI : false)
}

const useGet = async<T>(route: string, salesAPI?: boolean): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'get', {} as T, salesAPI ? salesAPI : false)
}

const usePatch = async<T>(route: string, data: T, salesAPI?: boolean): Promise<CustomResponse<T>> => {
  return await useCustom<T>(route, 'patch', data, salesAPI ? salesAPI : false)
}

const useCustom = async<T>(route: string, method: string, data: T, apiSales: boolean): Promise<CustomResponse<T>> => {
  const customResponse = new CustomResponse<T>()
  try {
    const currentApi = apiSales ? salesapi : api
    const response = await axios({
      method: method,
      url: `${currentApi}${route}`,
      data: data,
    })

    if (response?.data?.error) {
      Swal.fire('Error', response.data.message.toString(), 'error')
      return customResponse.badResponse(response.data.message)
    }

    return customResponse.setResponse(response.data.content, false, [''])

  } catch (error) {
    return customResponse.badResponse(['Bad response'])

  }

}


export { useGetList, usePost, useDelete, useGet, useCustom, usePatch }