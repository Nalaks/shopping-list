import { FC } from 'react'
import { LayoutProps } from '../types/types'
import Header from './Header'

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default Layout
