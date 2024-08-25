/* eslint-disable prettier/prettier */

import { Logo } from '../logo'
import { NavItem } from './nav-item'
import { SIDEBAR_ITEMS } from '@/constants/sidebar'
import { tv } from 'tailwind-variants'

import { SignOutButton } from './signout-button'
import { SignOutCompanyButton } from './signout-company-button'
import { isAuthenticatedWithCompany } from '@/auth/auth'

const sidebar = tv({
  slots: {
    base: 'bg-secondary h-screen flex flex-col items-center',
    nav: 'w-full p-1 flex flex-col h-full justify-between mt-10',
    ul: 'flex flex-col gap-3',
  },
})

const { base, nav, ul } = sidebar()

export const Sidebar = () => {
  return (
    <div className={base()}>
      <Logo />
      <nav className={nav()}>
        <ul className={ul()}>
          {isAuthenticatedWithCompany() &&
            Object.entries(SIDEBAR_ITEMS).map(
              ([name, { icon, path }], index) => (
                <NavItem key={index} href={path} icon={icon}>
                  {name}
                </NavItem>
              ),
            )}
        </ul>
        <div>
          <SignOutCompanyButton />
          <SignOutButton />
        </div>
      </nav>
    </div>
  )
}
