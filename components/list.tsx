import {
  Box,
  ScrollArea,
  EmptyState,
  VStack,
  ProgressCircle,
  Alert,
} from "@chakra-ui/react";
import ListFilters from "./listFilters";
import { MapCard } from "../types";
import MapCardComponent from "./mapCard";
import { useEffect, useState, useMemo } from "react";

export default function List({}) {
  const [cardList, setCardList] = useState<MapCard[]>([]);
  const [subLabelList, setSubLabelList] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchCardList = async () => {
      try {
        const res = await fetch(
          "https://cdn.urbansdk.com/exampledata/samples.json",
        );
        console.log("res", res);
        const cards = await res.json();

        const uniqueSubLabels: string[] = [];
        cards.forEach((c: MapCard) => {
          if (!uniqueSubLabels.includes(c.subLabel)) {
            uniqueSubLabels.push(c.subLabel);
          }
        });

        setSubLabelList(uniqueSubLabels);
        setCardList(cards);
        setTimeout(() => setLoading(false), 1000);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    fetchCardList();
  }, []);

  const filterBySearchText = (card: MapCard, searchText: string) => {
    const label = card.label.toLowerCase();
    const desc = card.description.toLowerCase();
    const search = searchText.toLowerCase();

    if (searchText === "") return true;

    return label.includes(search) || desc.includes(search);
  };

  const filterBySources = (card: MapCard, sources: string[]) => {
    if (sources.length === 0) return true;
    return sources.includes(card.subLabel);
  };

  const filteredCardList = useMemo(
    () =>
      cardList
        .filter((c) => filterBySearchText(c, searchText))
        .filter((c) => filterBySources(c, selectedSources)),
    [cardList, searchText, selectedSources],
  );

  return error ? (
    <Box padding="20px">
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Error Loading Maps</Alert.Title>
          <Alert.Description>Please try again.</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    </Box>
  ) : (
    <Box display="flex" flexDirection="column" h="100%">
      <ListFilters
        filterOptions={subLabelList}
        setSelectedSources={setSelectedSources}
        selectedSources={selectedSources}
        setSearchText={setSearchText}
      />

      <hr />

      <Box h="100%" bgColor="#ecf3fa">
        {loading && (
          <Box
            padding="20px"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <ProgressCircle.Root value={null} size="sm">
              <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range />
              </ProgressCircle.Circle>
            </ProgressCircle.Root>
          </Box>
        )}
        {!loading && (
          <ScrollArea.Root>
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <Box padding="20px">
                  {filteredCardList.length > 0 &&
                    filteredCardList.map((card, idx) => {
                      return <MapCardComponent card={card} key={idx} />;
                    })}
                  {filteredCardList.length === 0 && (
                    <EmptyState.Root>
                      <EmptyState.Content>
                        <EmptyState.Indicator></EmptyState.Indicator>
                        <VStack textAlign="center">
                          <EmptyState.Title>No Maps</EmptyState.Title>
                          <EmptyState.Description>
                            Your account does not have any map data.
                          </EmptyState.Description>
                        </VStack>
                      </EmptyState.Content>
                    </EmptyState.Root>
                  )}
                </Box>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
            <ScrollArea.Corner />
          </ScrollArea.Root>
        )}
      </Box>
    </Box>
  );
}
