import {
  LuUsers,
  MdOutlineDashboard,
  RiUserSettingsLine,
  BsBox2,
  LiaFileInvoiceDollarSolid,
  GoBell,
  TbMailDollar,
} from '@/assets/icons'

export const SIDEBAR_ITEMS = {
  Dashboard: {
    path: '/dashboard',
    icon: <MdOutlineDashboard size={20} />,
  },
  Pendências: {
    path: '/pending',
    icon: <GoBell size={20} />,
  },
  Cobrança: {
    path: '/charge',
    icon: <TbMailDollar size={20} />,
  },
  Clientes: {
    path: '/customers',
    icon: <LuUsers size={20} />,
  },
  Despesas: {
    path: '/expenses',
    icon: <LiaFileInvoiceDollarSolid size={20} />,
  },
  Produtos: {
    path: '/products',
    icon: <BsBox2 size={18} />,
  },
  Usuários: {
    path: '/users',
    icon: <LuUsers size={20} />,
  },
  Grupos: {
    path: '/roles',
    icon: <RiUserSettingsLine size={20} />,
  },
}
