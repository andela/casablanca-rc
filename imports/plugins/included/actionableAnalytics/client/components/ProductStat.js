import React from "react";
import { registerComponent } from "@reactioncommerce/reaction-components";
import { SimpleChart } from "./charts/SimpleChart";
import { SelectOption, DisplayOption } from "../components/selectOption/option";
import { SearchInput } from "../components/input/SearchInput";

export const ProductStat = (props) => {
  const {
    salesData, selectedTab, handleOptionChange, statValue,
    handleProductStatInputChange, productStatSearchTerm, filterValue
  } = props;
  return (
    <div
      id="tab4"
      style={{ display: selectedTab === "tab4" ? "block" : "none" }}
      className="col-sm-12 col-md-12 col-lg-10 col-lg-offset-1 tabBox tab-pane fade"
    >
      <div className="container" />
      <div className="row">
        <DisplayOption
          handleOptionChange={handleOptionChange}
          firstValue="quantitySold"
          secondValue="customerCount"
          thirdValue="totalSales"
          fourthValue="averageSalesPerDay"
          firstOption="Quantity Sold"
          secondOption="Customer Count"
          thirdOption="Total Sales"
          fourthOption="Average Sales"
          chartClass="col-md-3 col-md-offset-3"
        />
        <SearchInput
          inputName="productSearchInput"
          inputPlaceholder="Type product name"
          handleInputChange={handleProductStatInputChange}
          inputClass="col-md-4 col-md-offset-2"
        />
      </div>
      <SimpleChart
        fetchedData={salesData}
        statValue={statValue}
        filterValue={filterValue}
        productStatSearchTerm={productStatSearchTerm}
      />
    </div>
  );
};
registerComponent("ProductStat", ProductStat);

export default ProductStat;
