import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };

  body {
    background-color: var(--primary);
    font-family: 'Roboto',sans-serif;
  }

  :root {
    --primary: #595959;
  }
`;

export default Global;
