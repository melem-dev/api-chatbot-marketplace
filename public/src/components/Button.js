import styled from "styled-components";

export const Button = styled.button`
  padding: 8px 14px;
  min-width: 150px;
  border: none;
  color: ${({ color }) => (color ? `var(--${color})` : `var(--white)`)};
  background-color: ${({ background }) =>
    background ? `var(--${background})` : `var(--primary)`};
`;
