import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useSelector } from "react-redux";

export default function Graph() {
  const products = useSelector((state) => state.products);
  // Calculate the average price for each category
  const categoryData = products.products.reduce((acc, product) => {
    const { category, price } = product;
    if (!acc[category]) {
      acc[category] = { total: 0, count: 0 };
    }
    acc[category].total += price;
    acc[category].count += 1;
    return acc;
  }, {});

  const pieChartData = Object.entries(categoryData).map(
    ([category, { total, count }], index) => ({
      id: index,
      value: total / count,
      label: "Average price of " + category,
    })
  );

  return (
    <PieChart
      series={[
        {
          data: pieChartData,
          highlightScope: { faded: "global", highlighted: "item" },
          faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
        },
      ]}
      height={400}
    />
  );
}
