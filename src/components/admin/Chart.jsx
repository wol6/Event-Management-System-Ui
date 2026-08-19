import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const data = [
    { name: "Paid Seated", value: 500 },
    { name: "Free Seated", value: 300 },
    { name: "Paid Open", value: 386 },
    { name: "Free Open", value: 242 },
];

function Chart() {
    return (
        <div className="mt-13" style={{ width: "60%", height: 150 }}>
            <ResponsiveContainer>
                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="name" />

                    <YAxis />

                    <Tooltip />

                    <Bar
                        dataKey="value"
                        fill="#1a3972"
                        barSize={55}
                    />

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default Chart;