import styled from "styled-components";

export const Container = styled.div`
  h1 {
    text-align: center;
  }

  form {
    margin-top: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    input {
      padding: 0 2rem;
      height: 4rem;
      width: 30rem;

      border: 1px solid #3498db;
      border-radius: .25rem;

      font-size: 1.2rem;

      & + input {
        margin-top: 0.5rem;
      }
    }

    button {
      margin-top: 1rem;

      height: 4rem;
      width: 30rem;

      border: 0;
      border-radius: 0.25rem;

      background-color: #3498db;
      color: #fff;

      font-size: 1.2rem;
      font-weight: 600;

      transition: filter 0.3s;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;
