import { Card } from "@repo/shadcn/components/dashboard/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Transactions">
      <div className="p-1">
        {transactions.map((t) => (
          <div className="flex justify-between" key={t.time.toISOString()}>
            <div className="my-2">
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs font-light">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center font-medium">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
