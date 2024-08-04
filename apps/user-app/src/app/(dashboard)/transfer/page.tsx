import { db } from "../../../lib/db";
import { AddMoney } from "../../../components/dashboard/AddMoneyCard";
import { BalanceCard } from "../../../components/dashboard/BalanceCard";
import { OnRampTransactions } from "../../../components/dashboard/OnRampTransactions";
import { auth } from "../../../auth";
import { getSession } from "../../../actions/session";

async function getBalance() {
  const user = await getSession();
  const balance = await db.balance.findFirst({
    where: {
      userId: Number(user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const user = await getSession();
  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: Number(user?.id),
    },
  });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

async function getp2pTransfers() {
  const user = await getSession();
  console.log(user?.id);

  const p2pTrans = await db.p2pTransfer.findMany({
    where: {
      OR: [{ toUserId: Number(user?.id) }, { fromUserId: Number(user?.id) }],
    },
    select: {
      amount: true,
      timestamp: true,
      fromUser: {
        select: {
          name: true,
        },
      },
      toUser: {
        select: {
          name: true,
        },
      },
    },
  });

  return p2pTrans;
}

export default async function page() {
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();
  const p2pTransfers = await getp2pTransfers();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
