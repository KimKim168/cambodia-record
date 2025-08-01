import React from 'react'
import { ReactNode } from 'react';
import MyTopHeader from './components/my-top-header'
import MyNewHeader from './components/my-new-header'
import MyFooter from './components/my-footer'
interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {

  return (
    <>
        <MyTopHeader/>
        <MyNewHeader/>
        <main className="font-poppins-regular mx-auto min-h-screen">{children}</main>
        <MyFooter />
    </>
  )
}

export default Layout
