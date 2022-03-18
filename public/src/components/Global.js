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
    --white: #fff;
  }
`;

export default Global;
