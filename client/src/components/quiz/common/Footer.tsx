import React from 'react'

type Props = {
  children: React.ReactNode
}

/**
 * Displays a footer with children placed starting from the right end of the footer bar.
 */
const Footer = ({ children }: Props) => {
  return (
    <footer className="footer">
      <div className="container-fluid h-100">
        <div className="col-sm-8 mx-auto h-100 d-flex align-items-center justify-content-end">
          {children}
        </div>
      </div>
    </footer>
  )
}

export default Footer
