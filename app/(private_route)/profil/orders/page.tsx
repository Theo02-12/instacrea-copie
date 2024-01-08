import OrderListPublic, { Orders } from "@/app/components/OrderListPublic";
import connectMongoDB from "@/app/lib/mongodb";
import OrderModel from "@/app/models/orderModel";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import Loading from "./loading";

const fetchOrders = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  await connectMongoDB();
  const orders = await OrderModel.find({ userId: session.user.id }).sort(
    "-createdAt"
  );
  const result: Orders[] = orders.map((order) => {
    return {
      id: order._id.toString(),
      paymentStatus: order.paymentStatus,
      date: order.createdAt.toString(),
      total: order.totalAmount,
      deliveryStatus: order.deliveryStatus,
      products: order.orderItems,
    };
  });

  return JSON.stringify(result);
};

export default async function Order() {
  const result = await fetchOrders();
  if (!result) {
    return redirect("/404");
  }

  const ordersInProgressCount = JSON.parse(result).filter((prod: any) => {
    return (
      prod.deliveryStatus === "ordered" || prod.deliveryStatus === "shipped"
    );
  }).length;

  return (
    <Suspense fallback={<Loading />}>
      <div className="w-5/6 mx-auto p-5 shadow-xl my-8 rounded-xl">
        <p className="text-center text-2xl font-semibold py-2">
          {ordersInProgressCount} commandes en cours
        </p>
      </div>
      <div className="w-5/6 mx-auto p-5 shadow-2xl my-8 rounded-xl">
        <p className="font-semibold text-center text-lg">
          Historique de vos commandes
        </p>
        <OrderListPublic orders={JSON.parse(result)} />
      </div>
    </Suspense>
  );
}
