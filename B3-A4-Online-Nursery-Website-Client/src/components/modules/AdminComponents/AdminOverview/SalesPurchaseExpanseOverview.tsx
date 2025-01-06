import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const SalesPurchaseExpanseOverview = () => {
  const data = [
    {
      name: "Dec 8",
      sales: 4000,
      purchase: 2400,
      expanse: 2400,
      amt: 2400,
    },
    {
      name: "Dec 9",
      sales: 3000,
      purchase: 1398,
      expanse: 2400,
      amt: 2210,
    },
    {
      name: "Dec 10",
      sales: 2000,
      purchase: 9800,
      expanse: 2400,
      amt: 2290,
    },
    {
      name: "Dec 11",
      sales: 2780,
      purchase: 3908,
      expanse: 2400,
      amt: 2000,
    },
    {
      name: "Dec 12",
      sales: 1890,
      purchase: 4800,
      expanse: 2400,
      amt: 2181,
    },
    {
      name: "Dec 13",
      sales: 2390,
      purchase: 3800,
      expanse: 2400,
      amt: 2500,
    },
    {
      name: "Dec 14",
      sales: 3490,
      purchase: 4300,
      expanse: 2400,
      amt: 2100,
    },
  ];

  return (
    <div className="bg-white p-5 rounded-lg">
      <p className="text-2xl font-semibold">Sales & Purchase</p>

      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={data} margin={{ top: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
          <YAxis />
          <Tooltip />
          <Legend />

          <Line type="monotone" dataKey="sales" stroke="#4CAF50">
            <LabelList position="top" offset={10} />
          </Line>

          <Line
            type="monotone"
            dataKey="purchase"
            stroke="#2196F3"
            activeDot={{ r: 8 }}
          >
            <LabelList position="top" offset={10} />
          </Line>

          <Line
            type="monotone"
            dataKey="expanse"
            stroke="#F44336"
            activeDot={{ r: 8 }}
          >
            <LabelList position="top" offset={10} />
          </Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesPurchaseExpanseOverview;
