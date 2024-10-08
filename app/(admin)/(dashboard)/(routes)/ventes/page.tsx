import OrderModel from "@/app/models/orderModel";
import React from "react";
import dateFormat from "dateformat";
import SalesChart from "@components/SalesCharts";
import GridView from "@/app/components/GridView";
import connectMongoDB from "@/app/lib/mongodb";


const sevenDaysSalesHistory = async () => {
  // Calculate the date: 7 days ago
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const dateList: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(sevenDaysAgo);
    date.setDate(date.getDate() + i);
    const dateString = date.toISOString().split("T")[0];
    dateList.push(dateString);
  }

  // Fetch data from within those 7 days
  await connectMongoDB();
  const last7DaysSales: { _id: string; totalAmount: number }[] =
    await OrderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: sevenDaysAgo },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);

  // Compare the date and fill empty sales with 0
  // [{sale: number, day: string}] => [{sale: 1000, day: "mon"}, {sale: 0, day: "thu"}, ...]
  const sales = dateList.map((date) => {
    const matchedSale = last7DaysSales.find((sale) => sale._id === date);
    return {
      day: dateFormat(date, "ddd"),
      sale: matchedSale ? matchedSale.totalAmount : 0,
    };
  });

  const totalSales = last7DaysSales.reduce((prevValue, { totalAmount }) => {
    return (prevValue += totalAmount);
  }, 0);

  return { sales, totalSales };
};

export default async function Sales() {
  const salesData = await sevenDaysSalesHistory();

  return (
    <div>
      <GridView>
        <div className="bg-blue-500 p-4 rounded space-y-4">
          <h1 className="font-semibold text-3xl text-white">
            {(salesData.totalSales)} €
          </h1>

          <div className="text-white">
            <p>Total des ventes</p>
            <p>Sur les 7  derniers jours</p>
          </div>
        </div>
      </GridView>
      <div className="mt-10">
        <h1 className="font-semibold text-3xl mb-4">
        Historique des ventes des 7 derniers jours
        </h1>
        <SalesChart data={salesData.sales} />
      </div>
    </div>
  );
}