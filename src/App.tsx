import { Button, ChakraProvider, defaultSystem } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './router/Router';
import { LoginUserProvider } from './providers/LoginUserProvider';

function App() {
  return (
    <ChakraProvider value={defaultSystem} >
      <LoginUserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </LoginUserProvider>
    </ChakraProvider>
  );
}

export default App;
