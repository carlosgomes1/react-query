import { useCallback } from "react";
import { useQuery } from "react-query";

import { Loading } from "../Loading";

import api from "../../services/api";

import { Container } from "./styles";

interface ILocationData {
  id: number;
  name: string;
  state: string;
  capacity: string;
}

interface ILocationDetailsProps {
  selectedLocation: number;
}

export function LocationDetails({ selectedLocation }: ILocationDetailsProps) {
  const getLocationDetails = useCallback(async () => {
    const response = await api.get<ILocationData>(
      `/locations/${selectedLocation}`
    );

    return response.data;
  }, [selectedLocation]);

  const { data: location, isLoading } = useQuery<ILocationData>(
    `/locations/${selectedLocation}`,
    async () => getLocationDetails()
  );

  return (
    <Container>
      <h1>Detalhes da filial</h1>

      {!isLoading && (
        <div>
          <ul>
            <li>
              <h2>ID</h2>
              <span>{location?.id}</span>
            </li>
            <li>
              <h2>Nome</h2>
              <span>{location?.name}</span>
            </li>
            <li>
              <h2>Estado</h2>
              <span>{location?.state}</span>
            </li>
            <li>
              <h2>Capacidade</h2>
              <span>{location?.capacity}</span>
            </li>
          </ul>
        </div>
      )}

      {isLoading && <Loading />}
    </Container>
  );
}
