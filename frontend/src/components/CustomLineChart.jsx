import moment from "moment";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const CustomLineChart = ({ allTransactions }) => {
    const data = [];
    
    allTransactions.map(item => {
        data.push({
            name: moment(item.date).format("DD MMM YYYY"),
            amount: item.amount
        })
    });

    return (
        <ResponsiveContainer width="100%" height={250}>
            <LineChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="amount" stroke="#875cf5" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;
