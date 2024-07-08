// 'use client'

// import { ButtonGroup } from '@/components/form/button-group'
// import { Modal } from '../modal'
// import { Button } from '@/components/form/button'
// import { Input } from '@/components/form/input'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { toast } from 'react-toastify'
// import { Status } from '@/constants/status'

// import { UpdateUserData } from '@/types/users/update-user'
// import { updateUserSchema } from '@/schemas/users/update-user-schema'
// import { updateUser } from '@/actions/users/update-user-action'
// import { IUsers } from '@/types/users/get-users'
// import { useCallback, useEffect } from 'react'
// import { useUrlParams } from '@/hooks/use-params'

// interface UpdateUserModalProps {
//   users: IUsers
// }

// export const UpdateUserModal = ({ users }: UpdateUserModalProps) => {
//   const { removeParams, params } = useUrlParams()

//   const isOpen = params.has('update_user')
//   const userId = params.get('user')

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setValue,
//     formState: { isSubmitting, errors },
//   } = useForm<UpdateUserData>({
//     resolver: zodResolver(updateUserSchema),
//   })

//   const handleCloseModal = useCallback(
//     () => removeParams(['update_user', 'user']),
//     [removeParams],
//   )

//   const onSubmit = handleSubmit(async (data) => {
//     const { Success } = Status

//     const response = await updateUser({ ...data, id: userId })

//     if (response.status !== Success) {
//       return toast(response.message, {
//         type: 'error',
//       })
//     }

//     toast(response.message, {
//       type: 'success',
//     })
//     handleCloseModal()
//     reset()
//   })

//   useEffect(() => {
//     if (userId && isOpen) {
//       const user = users?.items.find((user) => user.id === +userId)

//       if (!user) {
//         return handleCloseModal()
//       }

//       setValue('name', user?.name)
//       setValue('username', user?.username)
//     }
//   }, [handleCloseModal, isOpen, setValue, userId, users])

//   return (
//     <Modal.Root isOpen={isOpen} onClose={handleCloseModal}>
//       <Modal.Header>Editar Usuário</Modal.Header>
//       <form onSubmit={onSubmit}>
//         <Modal.Content>
//           <div className="flex gap-3 flex-col">
//             <Input
//               label="Nome"
//               name="name"
//               register={register}
//               error={errors?.name?.message}
//             />
//             <Input
//               label="Usuário"
//               name="username"
//               register={register}
//               error={errors?.username?.message}
//             />
//             <Input
//               label="Senha"
//               name="password"
//               register={register}
//               type="password"
//               error={errors?.password?.message}
//             />
//           </div>
//         </Modal.Content>
//         <Modal.Actions>
//           <ButtonGroup>
//             <Button type="button" onClick={handleCloseModal} variant="danger">
//               Fechar
//             </Button>

//             <Button type="submit" disabled={isSubmitting}>
//               Editar
//             </Button>
//           </ButtonGroup>
//         </Modal.Actions>
//       </form>
//     </Modal.Root>
//   )
// }
