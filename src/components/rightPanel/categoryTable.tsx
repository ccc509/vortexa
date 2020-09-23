import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { RadialChart } from "react-vis";
import {
  rightPanel,
  rampsTable,
  rampsTableHeader,
  selectedProp,
  unselectedProp,
} from "../../constants/styles";

type Props = {
    categoryLookUp : Map<string, number>;
    title : string; 
    selectAction: Function;
    selectedAttributes: string[]
}

const CategoryTable = (props : Props) => {
  const {categoryLookUp, title, selectAction, selectedAttributes} = props;
  console.log()
  const dispatch = useDispatch();

  const handleClick = (property: string) => {
    dispatch(selectAction(property));
  };

  const pieChartData = Array.from(categoryLookUp.values()).map(count => ({angle: count}));

  return (
    <div className={rightPanel}>
      <table className={rampsTable}>
        <thead>
          <tr>
            <th className={rampsTableHeader}>{title}</th>
            <th className={rampsTableHeader}>Number of ramps</th>
          </tr>
        </thead>
        <tbody>
          {Array.from(categoryLookUp.keys()).map((c: string) => (
            <tr>
              <th
                className={
                  selectedAttributes.includes(c)
                    ? selectedProp
                    : unselectedProp
                }
                onClick={() => handleClick(c)}
              >
                {c}
              </th>
              <th>{categoryLookUp.get(c)}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <RadialChart
        data={pieChartData}
        width={280}
        height={280}
      />
    </div>
  );
};

export { CategoryTable };
