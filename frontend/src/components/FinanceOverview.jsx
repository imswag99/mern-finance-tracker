import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
    const colors = ["#875cf5", "#ffd32a", "#f53b57"]
    const balanceData = [
        {
            name: "Total Balance",
            amount: totalBalance,
        },
        {
            name: "Total Income",
            amount: totalIncome,
        },
        {
            name: "Total Expense",
            amount: totalExpense,
        },
    ];

    return (
        <div className="flex flex-col gap-10">
            <h1 className="text-xl">Finance Overview</h1>
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`}
                colors={colors}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;
