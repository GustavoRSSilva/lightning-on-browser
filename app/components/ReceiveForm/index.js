/**
 *
 * ReceiveForm
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

import TextField from 'components/common/TextField';

import appMessages from 'containers/App/messages';

import { TESTNET } from 'utils/constants';

import {
  AMOUNT_CRYPTO,
  UNIT_CRYPTO,
  AMOUNT_FIAT,
  UNIT_FIAT,
} from 'containers/Receive/constants';

import {
  Wrapper,
  PrimaryInputContainer,
  PrimaryUnit,
  SecondaryInputContainer,
  SecondaryUnit,
} from './styles';

const onFocus = evt => evt.target.select();

function ReceiveForm(props) {
  const {
    networkId,
    handleChangeAmount,
    formValue,
    availableCryptoUnits,
    handleChangeUnit,
  } = props;
  const { formatMessage } = props.intl;

  const amountCrypto = formValue[AMOUNT_CRYPTO];
  const unitCrypto = formValue[UNIT_CRYPTO];
  const amountFiat = formValue[AMOUNT_FIAT];
  const unitFiat = formValue[UNIT_FIAT];

  return (
    <Wrapper>
      <PrimaryInputContainer>
        <TextField
          type="text"
          pattern="^\d+(\.\d*)?$"
          id={AMOUNT_CRYPTO}
          value={amountCrypto.toString()}
          onChange={evt => handleChangeAmount(evt, AMOUNT_CRYPTO)}
          onFocus={onFocus}
          variant="standard"
          textAlign="center"
        />
        <PrimaryUnit>
          <select
            value={unitCrypto}
            onChange={evt => handleChangeUnit(evt, UNIT_CRYPTO)}
          >
            {availableCryptoUnits.map(cryptoUnit => (
              <option key={cryptoUnit} value={cryptoUnit}>
                {formatMessage(appMessages[cryptoUnit])}
              </option>
            ))}
          </select>
        </PrimaryUnit>
      </PrimaryInputContainer>
      {(() => {
        if (networkId === TESTNET) {
          return null;
        }

        return (
          <SecondaryInputContainer>
            <TextField
              type="text"
              pattern="^\d*(\.\d*)?$"
              value={amountFiat.toString()}
              onChange={evt => handleChangeAmount(evt, AMOUNT_FIAT)}
              onFocus={onFocus}
              variant="standard"
              textAlign="center"
            />
            <SecondaryUnit>
              <FormattedMessage {...appMessages[unitFiat]} />
            </SecondaryUnit>
          </SecondaryInputContainer>
        );
      })()}
    </Wrapper>
  );
}

ReceiveForm.propTypes = {
  intl: intlShape.isRequired,
  networkId: PropTypes.string.isRequired,
  handleChangeAmount: PropTypes.func.isRequired,
  formValue: PropTypes.object.isRequired,
  availableCryptoUnits: PropTypes.array.isRequired,
  handleChangeUnit: PropTypes.func.isRequired,
};

export default injectIntl(ReceiveForm);
