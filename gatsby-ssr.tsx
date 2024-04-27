import React from 'react';
import { QueryClient } from '@tanstack/react-query';
import './src/assets/css/common.css';
import RootElement from './src/components/rootElement';

export const queryClient = new QueryClient();

export const wrapRootElement: React.FC<{ element: React.ReactNode }> = ({
  element,
}) => {
  return <RootElement>{element}</RootElement>;
};
