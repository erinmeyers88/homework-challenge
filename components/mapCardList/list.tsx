import {
  Box,
  ScrollArea,
  EmptyState,
  VStack,
  ProgressCircle,
  Alert,
} from "@chakra-ui/react";
import ListFilters from "./listFilters";
import { MapCard } from "../../types";
import MapCardComponent from "./mapCard";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { filterBySearchText, filterBySources } from "./listUtils";
import { uniqBy, uniq } from "lodash";

export default function List({
  selectedDatasets,
  setSelectedDatasets,
}: {
  selectedDatasets: MapCard[];
  setSelectedDatasets: Dispatch<SetStateAction<MapCard[]>>;
}) {
  const [cardList, setCardList] = useState<MapCard[]>([]);
  const [dataSourceList, setDataSourceList] = useState<string[]>([]);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchCardList = async () => {
      try {
        const res = await fetch(
          "https://cdn.urbansdk.com/exampledata/samples.json",
        );
        const cards: MapCard[] = await res.json();
        const uniqueCards = uniqBy(cards, "id");
        const subLabels = uniqueCards.map((c) => c.subLabel);
        const uniqueSubLabels = uniq(subLabels);
        setDataSourceList(uniqueSubLabels);
        setCardList(uniqueCards);
        setTimeout(() => setLoading(false), 750);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    };
    fetchCardList();
  }, []);

  const filteredCardList = cardList
    .filter((c) => filterBySearchText(c, searchText))
    .filter((c) => filterBySources(c, selectedDataSources));

  const handleToggleCard = (card: MapCard) => {
    setSelectedDatasets((prev) => {
      const foundIndex = prev.findIndex((c) => c.id === card.id);
      if (foundIndex > -1) {
        return prev.filter((c) => c.id !== card.id);
      }
      return [...prev, card];
    });
  };

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
        filterOptions={dataSourceList}
        setSelectedSources={setSelectedDataSources}
        selectedSources={selectedDataSources}
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
                      const isSelected =
                        selectedDatasets.findIndex((c) => c.id === card.id) >
                        -1;
                      return (
                        <MapCardComponent
                          card={card}
                          key={idx}
                          onClick={handleToggleCard}
                          isSelected={isSelected}
                        />
                      );
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
