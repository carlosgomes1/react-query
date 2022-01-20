import { useCallback, useEffect, useState } from "react";
import { FiTrash, FiEye } from "react-icons/fi";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { Loading } from "../Loading";

import api from "../../services/api";

import { Container } from "./styles";

interface ILocationsData {
  id: number;
  name: string;
  state: string;
  capacity: string;
}

interface ILocationsTableProps {
  onNavigation(
    newActiveComponent: "table" | "form" | "detail",
    isViewer?: boolean
  ): void;
  onSelectLocation(id: number): void;
}

export function LocationsTable({
  onNavigation,
  onSelectLocation,
}: ILocationsTableProps) {
  // const [locations, setLocations] = useState<ILocationsData[]>([]);
  // const [isLoading, setIsLoading] = useState<boolean>(false);

  // const getLocations = useCallback(() => {
  //   setIsLoading(true);

  //   api
  //     .get<ILocationsData[]>("/locations")
  //     .then((response) => setLocations(response.data))
  //     .finally(() => setIsLoading(false));
  // }, []);

  // useEffect(() => {
  //   getLocations();
  // }, []);

  const getLocations = useCallback(async (): Promise<ILocationsData[]> => {
    const response = await api.get<ILocationsData[]>("/locations");

    return response.data;
  }, []);

  const { data: locations, isLoading } = useQuery<ILocationsData[]>(
    ["locations"],
    async () => getLocations()
  );

  const queryClient = useQueryClient();

  const handleDeleteLocation = useCallback(
    async (id: number) => {
      await api.delete(`/locations/${id}`);
      await queryClient.invalidateQueries("locations");
      await queryClient.invalidateQueries(`locations/${id}`);
    },
    [queryClient]
  );

  const mutation = useMutation(handleDeleteLocation);

  const handleNavigateToDetails = useCallback(
    (id: number) => {
      onSelectLocation(id);
      onNavigation("detail");
    },
    [onNavigation, onSelectLocation]
  );

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Estado</th>
            <th>Capacidade de atendimento</th>
            <th>Ações</th>
          </tr>
        </thead>

        {!isLoading && !mutation.isLoading && (
          <tbody>
            {locations?.map((location) => (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.state}</td>
                <td>{location.capacity}</td>
                <td>
                  <button onClick={() => mutation.mutate(location.id)}>
                    <FiTrash size={24} color="#e74c3c" />
                  </button>
                  <button onClick={() => handleNavigateToDetails(location.id)}>
                    <FiEye size={24} color="#333" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {(isLoading || mutation.isLoading) && <Loading />}

      {/* {!isLoading && (
          <tbody>
            {locations?.map((location) => (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.state}</td>
                <td>{location.capacity}</td>
                <td>
                  <button onClick={() => {}}>
                    <FiTrash size={24} color="#e74c3c" />
                  </button>
                  <button>
                    <FiEye size={24} color="#333" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {isLoading && <Loading />} */}
    </Container>
  );
}
