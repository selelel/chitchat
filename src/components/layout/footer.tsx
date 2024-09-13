import React from 'react'

export default function Footer() {
  return (
    <footer className='text-xs text-custom-grey space-y-2'>
        <div className='flex flex-wrap items-center space-x-1'>
            <p>About -  </p>
            <p>Contact -</p>
            <p>Portfolio -</p>
            <p>Consent -</p>
            <p>Agreements</p>
            
        </div>
        <p>© 2024 ChitChat by <strong>{`<seleleI/>`}</strong></p>
    </footer>

  )
}