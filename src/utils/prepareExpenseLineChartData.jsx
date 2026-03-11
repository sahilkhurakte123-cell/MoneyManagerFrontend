export const prepareExpenseLineChartData = (transactions) => {
  const groupedData = {};

  transactions.forEach((transaction) => {
    const date = transaction.date.split("T")[0]; // "2025-07-06"

    if (!groupedData[date]) {
      const dateObj = new Date(date);

      const day = dateObj.getDate();
      const month = dateObj.toLocaleDateString("en-US", { month: "short" }); // "Jul"
      const year = dateObj.getFullYear();

      groupedData[date] = {
        date,
        month: `${day} ${month} ${year}`, // "6 Jul 2025"
        totalAmount: 0,
        items: [],
      };
    }

    groupedData[date].totalAmount += transaction.amount;
    groupedData[date].items.push(transaction);
  });

  return Object.values(groupedData).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
};