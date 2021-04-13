export const FILTER_BY_RANGE_PRICE = [
  {
    id: 1,
    name: "Tất cả giá",
    value: { from: "", to: "" },
  },
  {
    id: 2,
    name: "Giá dưới 1.000.000đ",
    value: { from: "", to: 1000000 },
  },
  {
    id: 3,
    name: "1.000.000đ - 2.000.000đ",
    value: { from: 1000000, to: 2000000 },
  },
  {
    id: 4,
    name: "2.000.000đ - 3.000.000đ",
    value: { from: 2000000, to: 3000000 },
  },
  {
    id: 5,
    name: "3.000.000đ - 5.000.000đ",
    value: { from: 3000000, to: 5000000 },
  },
  {
    id: 6,
    name: "Trên 5.000.000đ",
    value: { from: 5000000, to: undefined },
  },
];
