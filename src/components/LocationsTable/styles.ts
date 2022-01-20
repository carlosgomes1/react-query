import styled from "styled-components";

export const Container = styled.div`
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: #969cb3;
      font-weight: 400;

      padding: 1rem 2rem;

      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;

      border: 0;
      background-color: #fff;

      font-weight: 400;

      border-radius: 0.25rem;

      button {
        background-color: transparent;
        border: 0;
      }

      & > button:first-child {
        svg {
          margin-right: 1rem;
        }
      }
    }
  }
`;
