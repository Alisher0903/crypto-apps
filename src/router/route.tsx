import type { ComponentType } from 'react'
import CaesarPage from '../pages/caesar/caesar-cipher'
import Base64Page from '../pages/base64/base64-page'

export interface AppRoute {
  id: string
  path: string
  label: string
  icon: string
  description: string
  component: ComponentType
  badge?: string
}

export const routes: AppRoute[] = [
  {
    id: 'caesar',
    path: 'caesar',
    label: 'Caesar Cipher',
    icon: '🔐',
    description: 'Shift-based substitution cipher',
    component: CaesarPage,
  },
  {
    id: 'base64',
    path: 'base64',
    label: 'Base64',
    icon: '📦',
    description: 'Binary-to-text encoding scheme',
    component: Base64Page,
  },
]

export const defaultRoute = routes[0]
