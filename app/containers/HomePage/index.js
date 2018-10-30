/**
 *
 * HomePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  selectSessionValidState,
  selectUserCreatedState,
} from 'containers/App/selectors';

import * as actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  componentWillMount() {
    const { fetchSessionValid, fetchUserCreated } = this.props;
    fetchUserCreated();
    fetchSessionValid();
  }

  isRequesting() {
    const requesting = 'requesting';
    const { sessionValidState, userCreatedState } = this.props;
    return sessionValidState[requesting] || userCreatedState[requesting];
  }

  render() {
    const {
      history,
      // sessionValidState,
      userCreatedState,
    } = this.props;

    if (this.isRequesting()) {
      return <div>requesting</div>;
    }

    // check if there is a user
    if (userCreatedState.data === null) {
      history.push('/signUp');
      return null;
    }

    //  check if the user is valid, if not redirect to the login page
    // if (sessionValidState && !sessionValidState.data) {
    //   history.push('/logIn');
    //   return null;
    // }

    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
  fetchUserCreated: PropTypes.func.isRequired,
  userCreatedState: PropTypes.object.isRequired,
  fetchSessionValid: PropTypes.func.isRequired,
  sessionValidState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  userCreatedState: selectUserCreatedState(),
  sessionValidState: selectSessionValidState(),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homePage', reducer });
const withSaga = injectSaga({ key: 'homePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
