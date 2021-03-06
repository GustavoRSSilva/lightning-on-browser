/**
 *
 * SignUp
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import SignUpForm from 'components/SignUpForm';
import PageTitle from 'components/common/PageTitle';

import * as actions from './actions';

import {
  selectPassword,
  selectConfirmPassword,
  selectErrorMessage,
  selectSubmitFormState,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Wrapper } from './styles';

/* eslint-disable react/prefer-stateless-function */
export class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleSetPassword = this.handleSetPassword.bind(this);
    this.handleSetConfirmPassword = this.handleSetConfirmPassword.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  componentDidUpdate() {
    const { submitFormState, history } = this.props;

    //  Checks if the submit form is successful
    //  If so redirect to the homepage
    if (submitFormState.data) {
      history.push('/mnemonic');
    }
  }

  validatePasswords(password, confirmPassword) {
    const { setErrorMessage } = this.props;
    const { formatMessage } = this.props.intl;

    if (!password || !confirmPassword) {
      setErrorMessage(formatMessage(messages.missing_information));
      return false;
    }

    if (password.length < 8 || confirmPassword.length < 8) {
      setErrorMessage(formatMessage(messages.invalid_length));
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMessage(formatMessage(messages.passwords_do_not_match));
      return false;
    }

    return password === confirmPassword;
  }

  handleSetPassword(evt) {
    const { setPassword, setErrorMessage } = this.props;
    const { value } = evt.target;
    setErrorMessage(null);
    setPassword(value);
  }

  handleSetConfirmPassword(evt) {
    const { setConfirmPassword, setErrorMessage } = this.props;
    const { value } = evt.target;
    setErrorMessage(null);
    setConfirmPassword(value);
  }

  handleSubmitForm(evt) {
    evt.preventDefault();
    const { submitForm, password, confirmPassword } = this.props;
    const valid = this.validatePasswords(password, confirmPassword);
    if (valid) {
      submitForm(password);
    }
  }

  render() {
    const { password, confirmPassword, errorMessage } = this.props;
    return (
      <Wrapper>
        <PageTitle>
          <FormattedMessage {...messages.header} />
        </PageTitle>
        <SignUpForm
          password={password}
          confirmPassword={confirmPassword}
          handleSubmitForm={this.handleSubmitForm}
          handleSetPassword={this.handleSetPassword}
          handleSetConfirmPassword={this.handleSetConfirmPassword}
          errorMessage={errorMessage}
        />
      </Wrapper>
    );
  }
}

SignUp.propTypes = {
  intl: intlShape.isRequired,
  history: PropTypes.object.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  confirmPassword: PropTypes.string.isRequired,
  setConfirmPassword: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  setErrorMessage: PropTypes.func.isRequired,
  submitForm: PropTypes.func.isRequired,
  submitFormState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  password: selectPassword(),
  confirmPassword: selectConfirmPassword(),
  errorMessage: selectErrorMessage(),
  submitFormState: selectSubmitFormState(),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signUp', reducer });
const withSaga = injectSaga({ key: 'signUp', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(injectIntl(SignUp));
