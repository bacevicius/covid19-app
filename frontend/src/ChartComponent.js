import React, {PureComponent } from "react";
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
    <ResponsiveContainer width="80%" height={400}>
        <AreaChart
          data={this.props.data}
          width={1000}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year_week" interval={8} />
          <YAxis width={150}/>
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="case_count" name="Cases" stroke="#004fa4" fill="#0477c2" />
          <Area type="monotone" dataKey="death_count" name="Deaths" stroke="#eb1629" fill="#FF4C4C" />
        </AreaChart>
      </ResponsiveContainer>
    );
  }
}
export default Chart;