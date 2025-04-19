'use client';

import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', 'Helvetica Neue', sans-serif;
    background-color: #f9fbfd;
    color: #333;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: #2b6cb0;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;
