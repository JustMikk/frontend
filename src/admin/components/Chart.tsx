import {
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2200,
  },
];

// const averages = {
//   name: "Average",
//   uv: data.reduce((sum, entry) => sum + entry.uv, 0) / data.length,
//   pv: data.reduce((sum, entry) => sum + entry.pv, 0) / data.length,
//   amt: data.reduce((sum, entry) => sum + entry.amt, 0) / data.length,
// };

// Add averages to data
// const dataWithAverages = [...data, averages];

const Chart = () => {
  return (
    <ResponsiveContainer width="99%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" strokeWidth={2} />
        <Line type="monotone" dataKey="amt" stroke="#ffc658" strokeWidth={2} />
        <XAxis dataKey={"name"} />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;
