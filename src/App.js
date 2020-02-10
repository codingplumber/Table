import React from 'react';
import styled from 'styled-components';
import MainBody from './Containers/MainBody';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding: 2% 0;
`

function App() {
  return (
    <Wrapper>
      <MainBody />
    </Wrapper>
  );
}

export default App;
