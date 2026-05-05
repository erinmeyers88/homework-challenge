"use client";
import { Box, EmptyState, VStack } from "@chakra-ui/react";
import List from "../components/mapCardList/list";
import { useState } from "react";
import { MapCard } from "../types";

export default function Home() {
  const [selectedDatasets, setSelectedDatasets] = useState<MapCard[]>([]);

  return (
    <Box display="flex" flexDirection="row" w="100vw" h="100vh">
      <Box
        backgroundColor="#d9ead3"
        hideBelow="md"
        w="calc(100% - 550px)"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <EmptyState.Root>
          <EmptyState.Content>
            <EmptyState.Indicator></EmptyState.Indicator>
            <VStack textAlign="center">
              <EmptyState.Title>Map Placeholder</EmptyState.Title>
              <EmptyState.Description>
                {selectedDatasets.map((d) => {
                  return <Box key={d.id}>{d.label}</Box>;
                })}
              </EmptyState.Description>
            </VStack>
          </EmptyState.Content>
        </EmptyState.Root>
      </Box>
      <Box w={{ base: "100%", md: "550px" }}>
        <List
          setSelectedDatasets={setSelectedDatasets}
          selectedDatasets={selectedDatasets}
        />
      </Box>
    </Box>
  );
}
