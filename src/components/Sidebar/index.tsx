/* eslint-disable prettier/prettier */
import { MdLogout } from '@/assets/icons'
import { Logo } from '../Logo'
import { NavItem } from './NavItem'
import { SIDEBAR_ITEMS } from '@/constants/sidebar'
import { tv } from 'tailwind-variants'

const sidebar = tv({
  slots: {
    base: 'bg-secondary h-screen flex flex-col items-center',
    nav: 'w-full p-1 flex flex-col h-full justify-between mt-10',
    ul: 'flex flex-col gap-3',
    logoutButton: 'flex w-full p-3 gap-3 items-center',
  },
})

const { base, nav, ul, logoutButton } = sidebar()

export const Sidebar = () => {
  return (
    <div className={base()}>
      <Logo />
      <nav className={nav()}>
        <ul className={ul()}>
          {Object.entries(SIDEBAR_ITEMS).map(
            ([name, { icon, path }], index) => (
              <NavItem key={index} href={path} icon={icon}>
                {name}
              </NavItem>
            )
          )}
        </ul>
        <button className={logoutButton()}>
          <MdLogout size={20} />
          Sair
        </button>
      </nav>
    </div>
  )
}
