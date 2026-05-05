import {
  Box,
  Select,
  Portal,
  createListCollection,
  Popover,
  Button,
  SelectValueChangeDetails,
  Badge,
  Input,
  useBreakpointValue,
} from "@chakra-ui/react";
import { PiFunnelSimple } from "react-icons/pi";
import { useMemo } from "react";
import { debounce } from "lodash";

export default function ListFilters({
  filterOptions,
  setSelectedSources,
  selectedSources,
  setSearchText,
}: {
  filterOptions: string[];
  setSelectedSources: (value: string[]) => void;
  selectedSources: string[];
  setSearchText: (value: string) => void;
}) {
  const dataSourceListCollection = useMemo(
    () => createListCollection({ items: filterOptions }),
    [filterOptions],
  );

  const debouncedSetSearch = debounce(setSearchText, 200);

  const sameWidth = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      h="fit-content"
      padding="20px"
      justifyContent="flex-end"
      gap="20px"
    >
      <Input
        placeholder="Search by title or description"
        onChange={(e) => debouncedSetSearch(e.target.value)}
      ></Input>
      <Popover.Root positioning={{ sameWidth, placement: "bottom-end" }}>
        <Popover.Trigger asChild>
          <Button size="sm" variant="solid">
            <PiFunnelSimple /> Filter
            {selectedSources.length > 0 && (
              <Badge variant="solid" colorPalette="blue" marginLeft="10px">
                {1}
              </Badge>
            )}
          </Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content width={{ base: "auto", md: "300px" }}>
              <Popover.Arrow />
              <Popover.Body>
                <Select.Root
                  multiple
                  collection={dataSourceListCollection}
                  size="sm"
                  onValueChange={(
                    details: SelectValueChangeDetails<string>,
                  ) => {
                    setSelectedSources(details.value);
                  }}
                >
                  <Select.HiddenSelect />
                  <Select.Label>
                    Data Source
                    {selectedSources.length > 0 && (
                      <Badge
                        variant="solid"
                        colorPalette="blue"
                        marginLeft="10px"
                      >
                        {selectedSources.length}
                      </Badge>
                    )}
                  </Select.Label>
                  <Select.Control>
                    <Select.Trigger cursor="pointer">
                      <Select.ValueText placeholder="Select Data Source(s)" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.ClearTrigger cursor="pointer" />
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Portal>
                    <Select.Positioner>
                      <Select.Content>
                        {filterOptions.map((o) => (
                          <Select.Item item={o} key={o}>
                            {o}
                            <Select.ItemIndicator />
                          </Select.Item>
                        ))}
                      </Select.Content>
                    </Select.Positioner>
                  </Portal>
                </Select.Root>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>
    </Box>
  );
}
