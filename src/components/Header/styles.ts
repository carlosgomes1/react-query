import styled from "styled-components";

export const Container = styled.header`
  width: 100%;

  margin-bottom: 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 2rem;
  }

  button {
    padding: 0 4rem;

    border: 0;
    border-radius: 0.25rem;

    background-color: #3498db;
    color: #fff;

    height: 3rem;

    font-size: 1.1rem;

    transition: filter 0.3s;

    &:hover {
      filter: brightness(0.9);
    }
  }

  span {
    cursor: pointer;
  }
`;
