import styled from 'styled-components';

export const Card = styled.div`
  background: #333333;
  min-width: 50%;
  width: 50%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  color: white;
  border-bottom: 2px solid grey;

  @media only screen and (min-width: 768px) {
    min-width: 25%;
    width: 25%;
    padding: 10px;
  }
`;
