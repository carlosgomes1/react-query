import { FormEvent, useCallback, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Loading } from "../Loading";

import api from "../../services/api";

import { Container } from "./styles";

interface IFormProps {
  onNavigation(newActiveComponent: "table" | "form" | "detail", isViewer?: boolean): void;
}

export function Form({ onNavigation }: IFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    name: "",
    state: "",
    capacity: "",
  });

  const handleChange = useCallback(
    (name: string, value: string) => {
      setFormValues({ ...formValues, [name]: value });
    },
    [formValues]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      setIsLoading(true);

      event.preventDefault();

      return api
        .post("/locations", formValues)
        .finally(() => setIsLoading(false));
    },
    [formValues]
  );

  const queryClient = useQueryClient();

  const mutation = useMutation(handleSubmit, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("locations");

      onNavigation("table");
    },
  });

  return (
    <Container onSubmit={(event) => mutation.mutate(event)}>
      <h1>Cadastrar nova filial</h1>
      {isLoading ? (
        <Loading />
      ) : (
        <form>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formValues.name}
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="state"
            placeholder="Estado"
            value={formValues.state}
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
          />
          <input
            type="text"
            name="capacity"
            placeholder="Capacidade de atendimento"
            value={formValues.capacity}
            onChange={(event) =>
              handleChange(event.target.name, event.target.value)
            }
          />

          <button type="submit">Criar filial</button>
        </form>
      )}
    </Container>
  );
}
