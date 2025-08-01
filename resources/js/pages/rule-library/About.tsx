import React from 'react'
import Layout from './Layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from './components/ui/breadcrumb'
import { SlashIcon } from 'lucide-react'
import MyHeroAbout from './components/my-hero-about'
import MyOurValues from './components/my-our-values'
import { usePage } from '@inertiajs/react'

const About = () => {
  const { banner } = usePage().props;
  // console.log(banner);
  return (
    <Layout>
      <div className="relative w-full h-[60vh] flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Background Image with Dark Overlay */}
        <img
          src={`/assets/images/banner_positions/${banner?.banner}`}
          alt="Contact Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* Title and Breadcrumb */}
        <div className="relative z-20 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-noto-san-extra-light">About</h1>
          <div className="mt-6">
            <Breadcrumb>
              <BreadcrumbList className="justify-center flex gap-2">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="text-white hover:text-gray-400 hover:underline">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon className="text-gray-400 w-4 h-4" />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#/about" className="text-gray-400">About</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>
       <MyHeroAbout/>
       <MyOurValues/>
    </Layout>
  )
}

export default About
