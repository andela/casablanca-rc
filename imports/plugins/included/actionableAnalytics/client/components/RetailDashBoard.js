import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { formatPriceString } from "/client/api";
import { Box } from "../components/box/Box";


export const RetailDashBoard = (props) => {
  const { OrdersData } = props;
  const {
    totalSales,
    salesPerDay,
    ordersCancelled,
    ordersPlaced,
    totalItemsPurchased,
    grossProfit
  } = OrdersData;
  const revenuePerDay = totalSales / salesPerDay;
  return (
    <div
      id="tab1"
      style={{ display: OrdersData.selectedTab === "tab1" ? "block" : "none" }}
      className="col-sm-12 col-md-offset-1 col-lg-10 col-lg-offset-2 tabBox tab-pane fade in active"
    >
      {/* Revenue board */}
      <Box
        boxTitle="TOTAL REVENUE"
        boxValue={formatPriceString(totalSales)}
      />
      {/* Avaerage sales board */}
      <Box
        boxTitle="AVERAGE DAILY SALES"
        boxValue={formatPriceString(salesPerDay)}
      />
      {/* cancelled order box */}
      <Box
        boxTitle="ORDERS CANCELLED"
        boxValue={ordersCancelled}
      />
      {/* profit box */}
      <Box
        boxTitle="AVERAGE REVENUE PER DAY"
        boxValue={formatPriceString(revenuePerDay)}
      />
      {/* placed orders board */}
      <Box
        boxTitle="TOTAL ORDERS"
        boxValue={ordersPlaced}
      />
      {/* purchased item board */}
      <Box
        boxTitle="NUMBER OF PURCHASED PRODUCTS"
        boxValue={totalItemsPurchased}
      />
      <br /> <br /><br /> <br />
    </div>
  );
};
registerComponent("RetailDashBoard", RetailDashBoard);
export default RetailDashBoard;
