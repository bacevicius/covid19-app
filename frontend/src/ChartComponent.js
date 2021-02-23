import React, { PureComponent } from "react";
import {
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

class Chart extends PureComponent {

  render() {
    return (
      <div style={{ width: "80vw", height: "50vh" }}>
        <ResponsiveContainer>
          <AreaChart
            data={this.props.data}
            margin={{ top: 5, right: 50, left: 50, bottom: 90 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year_week" interval={this.props.data} angle={-30} tickMargin={25} tick={{ fontSize: "1.3rem", width: 250 }} />
            <YAxis tick={{ fontSize: "1.3rem", width: 250 }}  />
            <Tooltip />
            <Legend  verticalAlign="top" align="right"
 />
            <Area
              type="monotone"
              dataKey="case_count"
              name="Cases"
              stroke="#004fa4"
              fill="#0477c2"
            />
            <Area
              type="monotone"
              dataKey="death_count"
              name="Deaths"
              stroke="#eb1629"
              fill="#FF4C4C"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
export default Chart;
