import { FiArrowLeft } from "react-icons/fi";

import { Container } from "./styles";

interface IHeaderProps {
  activeComponent: "table" | "form" | "detail";
  onHandleNavigation(newActiveComponent: "table" | "form" | "detail"): void;
}

export function Header({ activeComponent, onHandleNavigation }: IHeaderProps) {
  return (
    <Container>
      {activeComponent === "table" ? (
        <>
          <strong>Lista de filiais</strong>

          <button onClick={() => onHandleNavigation("form")}>
            Nova filial
          </button>
        </>
      ) : (
        <span onClick={() => onHandleNavigation("table")}>
          <FiArrowLeft size={32} color="#3498db" />
        </span>
      )}
    </Container>
  );
}
