import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../Footer';

const Landing = ({ isAuthenticated }) => {
  if( isAuthenticated) {
    return <Navigate to='/dashboard' />;
  }

  
  return (
    
    <section className="landing">

      
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Mate</h1>
          
          <p className="lead">
            Create a Developer Profile/Portfolio & Share Posts and get Help from
            Other Web Developers/Programmers
          </p>
          <div className="buttons">
        
            <Link to="/register" className="btn btn-primary"><i className="fas fa-user-plus"></i>{' '}Sign Up</Link>
            <Link to="/login" className="btn btn-light"><i className="fas fa-sign-in-alt"></i>{' '}Login</Link>
          </div>
          <Footer></Footer>
        </div>
      
      </div>
      
    </section>
    
    
  )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
