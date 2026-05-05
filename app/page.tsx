"use client";
import { Box, IconButton } from "@chakra-ui/react";
import List from "../components/mapCardList/list";
import { useState } from "react";
import { MapCard } from "../types";
import { PiMapTrifold, PiList } from "react-icons/pi";
import Map from "../components/map";

export default function Home() {
  const [selectedDatasets, setSelectedDatasets] = useState<MapCard[]>([]);
  const [selectedView, setSelectedView] = useState<string>("list");

  return (
    <Box
      display={{ mdDown: "block", md: "flex" }}
      flexDirection={{ md: "row" }}
      w="100vw"
      h="100vh"
    >
      <Box
        backgroundColor="#d9ead3"
        width={{
          mdDown: "100%",
          md: "calc(100% - 550px)",
        }}
        alignItems="center"
        justifyContent="center"
        display={{
          mdDown: selectedView === "map" ? "flex" : "none",
          md: "flex",
        }}
        height="100%"
      >
        <Map selectedDatasets={selectedDatasets} />
      </Box>
      <Box
        width={{
          mdDown: "100%",
          md: "550px",
        }}
        height="100%"
        display={{
          mdDown: selectedView === "list" ? "block" : "none",
          md: "block",
        }}
      >
        <List
          setSelectedDatasets={setSelectedDatasets}
          selectedDatasets={selectedDatasets}
        />
      </Box>
      <IconButton
        rounded="full"
        position="fixed"
        bottom="20px"
        left="50%"
        transform="translateX(-50%)"
        onClick={() => setSelectedView(selectedView === "map" ? "list" : "map")}
        hideFrom="md"
        size="2xl"
        boxShadow="0 10px 15px rgba(0, 0, 0, 0.5)"
      >
        {selectedView === "list" ? <PiMapTrifold /> : <PiList />}
      </IconButton>
    </Box>
  );
}
