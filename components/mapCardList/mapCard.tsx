import { Box, Card, HStack, Badge, Image, Button } from "@chakra-ui/react";
import { MapCard } from "../../types";
import { RxPlus, RxMinus } from "react-icons/rx";

export default function MapCardComponent({
  card,
  onClick,
  isSelected,
}: {
  card: MapCard;
  onClick: (value: MapCard) => void;
  isSelected: boolean;
}) {
  return (
    <Card.Root
      variant="elevated"
      flexDirection="row"
      marginBottom="20px"
      width="100%"
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
          <Button
            variant={isSelected ? "outline" : "solid"}
            onClick={() => onClick(card)}
          >
            {isSelected ? <RxMinus /> : <RxPlus />}
            {isSelected ? "Remove" : "Add to Map"}
          </Button>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}
