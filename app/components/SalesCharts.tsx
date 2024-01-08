"use client"; 

import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  data: {
    day: string;
    sale: number;
  }[];
}

const SalesChart = ({ data }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <LineChart
      margin={{ left: 50, top: 20 }}
      width={600}
      height={400}
      data={data}
    >
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="day" />
      <YAxis dataKey="sale" tickFormatter={(value) => value} />
      <Tooltip formatter={(value, name) => [+value, name]} />
      <Line type="monotone" dataKey="sale" stroke="#8884d8" />
    </LineChart>
  );
};

export default SalesChart;
