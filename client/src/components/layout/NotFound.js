import React,{ Fragment } from 'react'

 const NotFound = () => {
  return (
    <section className='container'>
        <h1 className="x-large text-primary">
            <i className="fas fa-exclamation-triangle"></i> Page Not Found
        </h1>
        <p className='large'>Sorry, This Page Doesn't Exist.</p>
    </section>
  )
}

export default NotFound
