import styled from 'styled-components';
import { large } from 'styles/fontSize';
import { grey, lightBlue } from 'styles/colors';

export const Wrapper = styled.div``;

export const UtxosListTitle = styled.div`
  color: ${grey};
  margin-top: 20px;
  width: 100%;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Utxo = styled.div`
  width: calc(100% - 6px);
  height: 80px;
  border: 1px solid ${grey};
  border-radius: 5px;
  margin: 5px 3px;
  margin-top: 10px;
  color: ${grey};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;

  > div {
    width: 100%;
    display: flex;
    flex-direction: row;
    > span {
      width: 50%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
`;

export const Amount = styled.span`
  font-size: ${large};
  font-weight: bold;
  color: ${lightBlue};
`;
