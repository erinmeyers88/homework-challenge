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
} from "@chakra-ui/react";
import { RxFilter } from "react-icons/rx";
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

  return (
    <Box
      display="flex"
      flexDirection="row"
      w="100%"
      h="75px"
      padding="20px"
      justifyContent="flex-end"
      gap="20px"
    >
      <Input
        placeholder="Search by title or description"
        onChange={(e) => debouncedSetSearch(e.target.value)}
      ></Input>
      <Popover.Root positioning={{ placement: "bottom-start" }}>
        <Popover.Trigger asChild>
          <Button size="sm" variant="solid">
            <RxFilter /> Filter Data
            {selectedSources.length > 0 && (
              <Badge variant="solid" colorPalette="blue" marginLeft="10px">
                {1}
              </Badge>
            )}
          </Button>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
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
                  <Select.Label></Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select Data Source(s)" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.ClearTrigger />
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
