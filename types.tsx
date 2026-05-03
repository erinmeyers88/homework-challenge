export type MapCard = {
  id: string;
  label: string;
  queryType: string; // could narrow later if needed
  imageUrl: string;
  description: string;
  subLabel: string;
  visible: boolean;
  dataUrl: string;
  configUrl: string;
};
