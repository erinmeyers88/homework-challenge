import {
  Box,
  ScrollArea,
  Card,
  HStack,
  Badge,
  Image,
  Button,
} from "@chakra-ui/react";
import { MapCard } from "../types";

export default function MapCardComponent({ card }: { card: MapCard }) {
  return (
    <Card.Root
      variant="elevated"
      flexDirection="row"
      marginBottom="20px"
      width="510px"
      size="sm"
    >
      <Image maxW="150px" src={card.imageUrl} alt="Map card image" />
      <Box>
        <Card.Body>
          <HStack mb="4">
            <Badge>{card.subLabel}</Badge>
          </HStack>
          <Card.Title mb="2">{card.label}</Card.Title>
          <Card.Description>{card.description}</Card.Description>
        </Card.Body>
        <Card.Footer>
          <Button>Add To Map</Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}
