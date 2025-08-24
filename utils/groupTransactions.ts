import { Transaction } from "@/db/useDatabase";

type MonthGroup = { transactions: Transaction[]; balance: number };

export function groupTransactions(transactions: Transaction[]): Map<string, MonthGroup> {
  // 1) Group + sum
  const tmp = new Map<string, MonthGroup>();

  for (const tx of transactions) {
    const key = tx.date.slice(0, 7); // YYYY-MM
    const entry = tmp.get(key) ?? { transactions: [], balance: 0 };
    entry.transactions.push(tx);
    entry.balance += tx.value;
    tmp.set(key, entry);
  }

  // 2) Sort months desc and sort txs within each month desc by date
  const months = Array.from(tmp.keys()).sort((a, b) => b.localeCompare(a));
  const result = new Map<string, MonthGroup>();

  for (const m of months) {
    const entry = tmp.get(m)!;
    entry.transactions.sort((a, b) => b.date.localeCompare(a.date));
    result.set(m, entry);
  }

  return result;
}
