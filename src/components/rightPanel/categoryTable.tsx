import {
  rampsTable,
  rampsTableHeader,
  rightPanel,
  selectedProp,
  unselectedProp,
} from "../../constants/styles";

import { RadialChart } from "react-vis";
import React from "react";
import { useDispatch } from "react-redux";

type Props = {
  categoryLookUp: Array<{ name: string, count: number }>;
  title: string;
  selectAction: Function;
  selectedAttributes: string[];
};

const CategoryTable = (props: Props) => {
  const { categoryLookUp, title, selectAction, selectedAttributes } = props;
  const dispatch = useDispatch();

  const pieChartData = categoryLookUp.map(i => ({ angle: i.count}));

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
          {categoryLookUp.map(i => (
            <tr>
              <th
                className={
                  selectedAttributes.includes(i.name) ? selectedProp : unselectedProp
                }
                onClick={() => dispatch(selectAction(i.name))}
              >
                {i.name}
              </th>
              <th>{i.count}</th>
            </tr>
          ))}
        </tbody>
      </table>
      <RadialChart data={pieChartData} width={280} height={280} />
    </div>
  );
};

export { CategoryTable };
