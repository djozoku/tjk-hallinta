import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Router } from '@reach/router';

import apolloClient from './apollo';
import theme from './theme';
import IndexPage from './pages/index';

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <IndexPage path="/" />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
