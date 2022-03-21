import styled, { keyframes, css } from "styled-components";

const FadeInOutAnimation = keyframes`
  0%, 100%{
    opacity: 1;
  }

  50%{
    opacity: 0.7
  }
`;

export const Title = styled.h1`
  color: var(--primary);
`;

export const Subtitle = styled.h2`
  color: var(--primary);
  animation: ${(props) =>
    props.fadeInOut === true
      ? css`
          ${FadeInOutAnimation} 1.5s infinite
        `
      : ""};
`;

export const Text = styled.p`
  color: var(--primary);
  margin: 0 20px;
`;

export const Bold = styled.strong``;
