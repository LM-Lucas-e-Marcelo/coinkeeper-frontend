import { LuUsers, MdOutlineDashboard, RiUserSettingsLine } from '@/assets/icons'

export const SIDEBAR_ITEMS = {
  Dashboard: {
    path: '/dashboard',
    icon: <MdOutlineDashboard size={20} />,
  },
  Usuários: {
    path: '/users',
    icon: <LuUsers size={20} />,
  },
  Grupos: {
    path: '/roles',
    icon: <RiUserSettingsLine size={20} />,
  },
  Clientes: {
    path: '/customers',
    icon: <LuUsers size={20} />,
  },
}
