"use client";
import { Box } from "@chakra-ui/react";
import List from "../components/list";
export default function Home() {
  return (
    <Box display="flex" flexDirection="row" w="100vw" h="100vh">
      <Box backgroundColor="pink" hideBelow="md" w="calc(100% - 550px)">
        Map placeholder
      </Box>
      <Box w={{ base: "100%", md: "550px" }}>
        <List />
      </Box>
    </Box>
  );
}
