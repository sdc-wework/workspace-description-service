import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
    background-color: #fff;
    color: #000;
    font-family: Roboto, sans-serif;
    font-size: 62.5%;
    line-height: 1.375;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    margin: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 32px;
  }
`;

export default GlobalStyles;
