import { MapCard } from "@/types";
export const filterBySearchText = (card: MapCard, searchText: string) => {
  const label = card.label.toLowerCase();
  const desc = card.description.toLowerCase();
  const search = searchText.toLowerCase();

  if (searchText === "") return true;

  return label.includes(search) || desc.includes(search);
};

export const filterBySources = (card: MapCard, sources: string[]) => {
  if (sources.length === 0) return true;
  return sources.includes(card.subLabel);
};
