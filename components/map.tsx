import { Box, EmptyState, VStack } from "@chakra-ui/react";
import { MapCard } from "../types";
import { PiGlobeHemisphereWest } from "react-icons/pi";

export default function Map({
  selectedDatasets,
}: {
  selectedDatasets: MapCard[];
}) {
  return (
    <EmptyState.Root>
      <EmptyState.Content>
        <PiGlobeHemisphereWest size="4em" color="primary" />
        <VStack textAlign="center">
          <EmptyState.Title>Map Placeholder</EmptyState.Title>

          {selectedDatasets.map((d) => {
            return <Box key={d.id}>{d.label}</Box>;
          })}
        </VStack>
      </EmptyState.Content>
    </EmptyState.Root>
  );
}
