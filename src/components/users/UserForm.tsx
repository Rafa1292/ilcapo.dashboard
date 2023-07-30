import React, { useState } from 'react'
import GenericForm from '../generics/GenericForm'
import CustomInputText from '../generics/CustomInputText'
import { User } from '../../types/User'
import { UserInfo } from '../../types/UserInfo'
import { regexOptions } from '../../enums/regexOptions'
import { usePost } from '../../hooks/useAPI'

const initialUserInfo: UserInfo = {
  id: 0,
  salary: 0,
  admisionDay: new Date(),
  userId: 0,
  name: '',
  delete: false,
  createdAt: new Date(),
  createdBy: 0,
  updatedAt: new Date(),
  updatedBy: 0
}

const initialUser: User = {
  id: 0,
  email: '',
  password: '',
  delete: false,
  userInfo: initialUserInfo,
  createdAt: new Date(),
  createdBy: 0,
  updatedAt: new Date(),
  updatedBy: 0
}


const UserForm = () => {
  const [errors, setErrors] = useState<string[]>([])
  const [user, setUser] = useState<User>(initialUser)

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, userInfo: { ...user.userInfo, name: event.target.value } })
  }

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, email: event.target.value })
  }

  const handleSubmit = async () => {
    const response = await usePost<User>('users', { ...user, password: '123456' }, true)
    if (!response.error) {
      setUser(initialUser)
    }
  }

  return (
    <>
      <GenericForm errors={errors} submitText={'Agregar'} handleSubmit={handleSubmit}>
        <CustomInputText value={user.userInfo.name}
          customInputText={
            {
              label: 'Nombre', name: 'name',
              handleChange: handleChangeName, pattern: regexOptions.text,
              validationMessage: 'Ingrese un nombre válido'
            }
          } />

        <CustomInputText value={user.email}
          customInputText={
            {
              label: 'Correo', name: 'description',
              handleChange: handleChangeEmail, pattern: regexOptions.email,
              validationMessage: 'Ingrese un email válida'
            }
          } />


      </GenericForm>
    </>
  )
}

export default UserForm