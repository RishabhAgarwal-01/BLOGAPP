import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { FaLinkedin } from 'react-icons/fa';
import { BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

function FooterComp() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full max-w-7xl mx-auto'>
            <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
               <div className='mt-5'>
               <Link to="/" className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                  <span className='px-2 py-1 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg'>Rishabh's</span>
                Blog
               </Link>
               </div>
               <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  ReactProjects
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Rishabh's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/RishabhAgarwal-01'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='https://www.linkedin.com/in/rishabhagarwal11'
                 target='_blank'
                 rel='noopener noreferrer'>LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="Rishabh's BLog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='https://www.linkedin.com/in/rishabhagarwal11' icon={FaLinkedin }/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/RishabhAgarwal-01' icon={BsGithub}/>
            <Footer.Icon href='#' icon={BsDribbble}/>

          </div>
            </div>
         </div>    
    </Footer>  
  )
}

export default FooterComp;