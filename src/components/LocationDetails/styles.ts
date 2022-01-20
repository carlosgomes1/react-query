import styled from "styled-components";

export const Container = styled.div`
  & > h1 {
    text-align: center;
  }

  & > div {
    margin-top: 2rem;

    display: flex;
    align-items: center;
    justify-content: center;

    & > ul {
      display: flex;
      align-items: center;
      flex-direction: column;

      li {
        display: flex;
        align-items: center;

        min-width: 450px;

        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

        padding: 1rem 0;

        & + li {
          margin-top: .5rem;
        }

        h2 {
          padding: 0 1rem;

          font-size: 1.3rem;
        }

        span {
          font-size: 1.1rem;
          color: #777;
        }
      }
    }
  }
`;