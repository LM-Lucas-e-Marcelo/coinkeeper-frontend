/* eslint-disable @next/next/no-img-element */
import { tv } from 'tailwind-variants'

import { getCompanyName, getUser } from '@/auth/auth'

const header = tv({
  slots: {
    base: 'flex justify-between bg-white items-center px-6',
    profile: 'flex flex-col',
    userName: 'text-2xl',
    time: 'text-zinc-300 mt-[0px]',
    actions: 'flex gap-4 items-center',
    notificationButton:
      'size-10 rounded-full flex items-center justify-center bg-secondary',
    profilePicture: 'size-14',
  },
})

const { base, profile, userName, time, actions, profilePicture } = header()

export const Header = () => {
  return (
    <header className={base()}>
      <div className={profile()}>
        <strong className={userName()}>Olá, {getUser()}</strong>
        <p>{getCompanyName()}</p>
        <time className={time()}>{new Date().toLocaleDateString()}</time>
      </div>
      <div className={actions()}>
        <img
          src="https://ui-avatars.com/api/?rounded=true&format=svg&background=F6F8FE&color=4DA6FF&name=Lucas&size=16"
          alt="profile picture with initias letter of name"
          className={profilePicture()}
        />
      </div>
    </header>
  )
}
