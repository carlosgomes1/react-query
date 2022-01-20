import { useCallback, useMemo, useState } from "react";

import { Form } from "../../components/Form";
import { Header } from "../../components/Header";
import { LocationDetails } from "../../components/LocationDetails";
import { LocationsTable } from "../../components/LocationsTable";

import { Container } from "./styles";

export function Main() {
  const [selectedLocation, setSelectedLocation] = useState<number>(0);
  const [activeComponent, setActiveComponent] = useState<
    "table" | "form" | "detail"
  >("table");

  const handleNavigation = useCallback(
    (newActiveComponent: "table" | "form" | "detail") => {
      setActiveComponent(newActiveComponent);
    },
    []
  );

  const handleSelectLocation = useCallback((id: number) => {
    setSelectedLocation(id);
  }, []);

  const renderComponent = useCallback(() => {
    switch (activeComponent) {
      case "detail":
        return <LocationDetails selectedLocation={selectedLocation} />;
      case "form":
        return <Form onNavigation={handleNavigation} />;
      default:
        return (
          <LocationsTable
            onNavigation={handleNavigation}
            onSelectLocation={handleSelectLocation}
          />
        );
    }
  }, [
    activeComponent,
    handleNavigation,
    selectedLocation,
    handleSelectLocation,
  ]);

  const header = useMemo(
    () => (
      <Header
        activeComponent={activeComponent}
        onHandleNavigation={handleNavigation}
      />
    ),
    [activeComponent, handleNavigation]
  );

  return (
    <Container>
      {header}

      {renderComponent()}
    </Container>
  );
}
