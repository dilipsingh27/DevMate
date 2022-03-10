import React,{ useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const Dashboard = ({getCurrentProfile,auth,profile}) => {
    useEffect(() => {
      getCurrentProfile();
    }, [getCurrentProfile]);

  return <div>Dashboard</div>
  
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,               //anything in the auth reducer state will get here in this component
    profile: state.profile          //anything that is there in profile reducer will be here also in this component for use
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);


