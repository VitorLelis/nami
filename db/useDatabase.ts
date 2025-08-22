import { useSQLiteContext } from "expo-sqlite";

export type Transaction = {
    id: number;
    value: number;
    desc: string;
    date: string;
    wallet_name: string;
    tag_name: string;
}

export type Wallet = {
    id: number;
    name: string
}

export function useDatabase(){
    const db = useSQLiteContext();

    /*async function getMonthTransactions(): Promise<Transaction[]> {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const currentMonth = `${year}-${month}`;

        const query = `
          SELECT t.id,t.value,t.desc,t.date,w.name AS wallet_name,g.name AS tag_name
          FROM transactions t
          LEFT JOIN wallets w ON t.wallet_id = w.id
          LEFT JOIN tags g ON t.tag_id = g.id
          WHERE strftime('%Y-%m', t.date) = ?
          ORDER BY t.date DESC;
        `;

        try {
          const rows = await db.getAllAsync<Transaction>(query, currentMonth);
          return rows;
        } catch (error) {
          throw error;
        }
    }*/

    async function getBudgetCount(): Promise<number> {
        const query = 'SELECT COUNT(*) AS budget_count FROM budgets';
        try {
          const response = await db.getAllAsync<{ budget_count: number }>(query);
          return response[0].budget_count;
        } catch (error) {
          throw error;
        }
    }

    async function getWalletCount(): Promise<number> {
        const query = 'SELECT COUNT(*) AS wallet_count FROM wallets';
        try {
          const response = await db.getAllAsync<{ wallet_count: number }>(query);
          return response[0].wallet_count;
        } catch (error) {
          throw error;
        }
    }

    async function getSavingsCount(): Promise<number> {
        const query = 'SELECT COUNT(*) AS saving_count FROM savings';
        try {
          const response = await db.getAllAsync<{saving_count: number }>(query);
          return response[0].saving_count;
        } catch (error) {
          throw error;
        }
    }

    async function addWallet(name:string) {
        const query = await db.prepareAsync(
          'INSERT INTO wallets (name) VALUES (?)',
        );

        try {
          const result = await query.executeAsync(name);

          const insertedRowId = result.lastInsertRowId;

          return { insertedRowId };
        } 
        catch (error) {
          throw error;
        } 
        finally {
          await query.finalizeAsync();
        }
    }

    async function addTag(name:string) {
        const query = await db.prepareAsync(
          'INSERT INTO tags (name) VALUES (?)',
        );

        try {
          const result = await query.executeAsync(name);

          const insertedRowId = result.lastInsertRowId;

          return { insertedRowId };
        } 
        catch (error) {
          throw error;
        } 
        finally {
          await query.finalizeAsync();
        }
    }

    async function addBudget(tag_id: number,limit_amount:number) {
      const query =
        'INSERT INTO budgets (tag_id,limit_amount) VALUES (?,?)';
      try {
        await db.getAllAsync(query, [tag_id,limit_amount]);
      } catch (error) {
        throw error;
      }
    }

    async function addSaving(tag_id: number,goal:number) {
      const query =
        'INSERT INTO savings (tag_id,goal) VALUES (?,?)';
      try {
        await db.getAllAsync(query, [tag_id,goal]);
      } catch (error) {
        throw error;
      }
    }

    return {
        //getMonthTransactions,
        getBudgetCount,
        getWalletCount,
        getSavingsCount,
        addWallet,
        addTag,
        addBudget,
        addSaving,
    };

}