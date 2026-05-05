import { filterBySearchText, filterBySources } from "./listUtils";
import { MapCard } from "@/types";

const testCard: MapCard = {
  id: "1",
  label: "Card 1",
  queryType: "typeA",
  imageUrl: "img1.png",
  description: "description",
  subLabel: "sub",
  visible: true,
  dataUrl: "/data1",
  configUrl: "/config1",
};

describe("filterBySearchText", () => {
  test("should return true if empty string", () => {
    expect(filterBySearchText(testCard, "")).toBe(true);
  });

  test("should return true if search text is in label", () => {
    expect(filterBySearchText(testCard, "Card")).toBe(true);
  });

  test("should return true if search text is in description", () => {
    expect(filterBySearchText(testCard, "desc")).toBe(true);
  });

  test("returns false if search text not in label or description", () => {
    expect(filterBySearchText(testCard, "xyz")).toBe(false);
  });
  test("is case insensitive", () => {
    expect(filterBySearchText(testCard, "cARD")).toBe(true);
  });
});

describe("filterBySources", () => {
  test("should return true if sources is an empty array", () => {
    expect(filterBySources(testCard, [])).toBe(true);
  });
  test("should return true if subLabel is in sources", () => {
    expect(filterBySources(testCard, ["sub", "other"])).toBe(true);
  });
});
