import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from './src/assets/css/theme';
import { Provider } from 'react-redux';
import store from './src/store/store';
import './src/assets/css/common.css';

export const queryClient = new QueryClient();

export const wrapRootElement: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>{element}</Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
