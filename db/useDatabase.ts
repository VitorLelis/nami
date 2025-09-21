import { useSQLiteContext } from "expo-sqlite";

export type Transaction = {
  id: number;
  value: number;
  desc: string;
  date: string;
  wallet_id: number;
  wallet_name: string;
  tag_id: number;
  tag_name: string;
  tag_icon: string
}

export type Wallet = {
  id: number;
  name: string
}

export type Tag = {
  id: number;
  name: string;
  icon: string
}

export type WalletBalance = {
  id: number;
  name: string;
  balance: number;
}

export type Budget = {
  id: number;
  limit_amount: number;
  tag_id:number;
  tag_name: string;
  tag_icon: string;
  spent: number;
}

export type Saving = {
  id: number;
  goal: number;
  tag_id: number;
  tag_name: string;
  tag_icon: string;
  saved: number;
}

export function useDatabase(){
    const db = useSQLiteContext();

    async function getWallet(id: number) {
      const query = `
          SELECT id, name
          FROM wallets
          WHERE id = ?
        `;

        try {
          const response = await db.getFirstAsync<Wallet>(query, [id]);
          return response!;
        } catch (error) {
          throw error;
        }
    }

    async function getBudget(id: number) {
      const query = `
          SELECT b.id, b.limit_amount,b.tag_id, g.name AS tag_name, g.icon AS tag_icon, IFNULL(SUM(t.value),0) AS spent
          FROM budgets b
          JOIN tags g ON b.tag_id = g.id
          LEFT JOIN transactions t ON t.tag_id = b.tag_id
          WHERE b.id = ${id}
        `;

        try {
          const response = await db.getFirstAsync<Budget>(query);
          return response!;
        } catch (error) {
          throw error;
        }
    }

    async function getSaving(id: number) {
      const query = `
          SELECT s.id, s.goal, s.tag_id, g.name AS tag_name, g.icon AS tag_icon, IFNULL(SUM(t.value),0) AS saved
          FROM savings s
          JOIN tags g ON s.tag_id = g.id
          LEFT JOIN transactions t ON t.tag_id = s.tag_id
          WHERE s.id = ${id}
        `;

        try {
          const response = await db.getFirstAsync<Saving>(query);
          return response!;
        } catch (error) {
          throw error;
        }
    }

    async function getMonthTransactions(): Promise<Transaction[]> {
        const query = `
          SELECT t.id,t.value,t.desc,t.date,t.wallet_id, w.name AS wallet_name, t.tag_id, g.name AS tag_name, g.icon AS tag_icon
          FROM transactions t
          LEFT JOIN wallets w ON t.wallet_id = w.id
          LEFT JOIN tags g ON t.tag_id = g.id
          WHERE strftime('%Y-%m', t.date) = strftime('%Y-%m', 'now')
          ORDER BY t.date DESC;
        `;

        try {
          const rows = await db.getAllAsync<Transaction>(query);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function getRecentTransactions(): Promise<Transaction[]> {
        const query = `
          SELECT t.id,t.value,t.desc,t.date, t.wallet_id, w.name AS wallet_name, t.tag_id, g.name AS tag_name, g.icon AS tag_icon
          FROM transactions t
          LEFT JOIN wallets w ON t.wallet_id = w.id
          LEFT JOIN tags g ON t.tag_id = g.id
          ORDER BY t.date DESC
          LIMIT 4;
        `;

        try {
          const rows = await db.getAllAsync<Transaction>(query);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function getBudgetCount(): Promise<number> {
        const query = 'SELECT COUNT(*) AS budget_count FROM budgets';
        try {
          const response = await db.getFirstAsync<{ budget_count: number }>(query);
          return response!.budget_count;
        } catch (error) {
          throw error;
        }
    }

    async function getWalletCount(): Promise<number> {
        const query = 'SELECT COUNT(*) AS wallet_count FROM wallets';
        try {
          const response = await db.getFirstAsync<{ wallet_count: number }>(query);
          return response!.wallet_count;
        } catch (error) {
          throw error;
        }
    }

    async function getSavingsCount(): Promise<number> {
        const query = 'SELECT COUNT(*) AS saving_count FROM savings';
        try {
          const response = await db.getFirstAsync<{saving_count: number }>(query);
          return response!.saving_count;
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

    async function addTag(name:string, icon: string) {
        const query = await db.prepareAsync(
          'INSERT INTO tags (name, icon) VALUES (?,?)',
        );

        try {
          const result = await query.executeAsync([name,icon]);

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

    async function addTransaction(value:number,
      desc: string,
      date:string,
      tag_id:number,
      wallet_id:number) {

      const query =
        'INSERT INTO transactions (value,desc,date,tag_id,wallet_id) VALUES (?,?,?,?,?)';
      try {
        await db.getAllAsync(query, [
          value,
          desc,
          date,
          tag_id,
          wallet_id
        ]);
      } catch (error) {
        throw error;
      }
    }

    async function getTagList() {
      const query = `
          SELECT g.id, g.name, g.icon
          FROM tags g
          ORDER BY g.name
        `;

        try {
          const rows = await db.getAllAsync<Tag>(query);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function getWalletList() {
      const query = `
          SELECT w.id, w.name
          FROM wallets w
          ORDER BY w.id
        `;

        try {
          const rows = await db.getAllAsync<Wallet>(query);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function getWalletBalanceList() {
      const query = `
          SELECT w.id, w.name, IFNULL(SUM(t.value),0) AS balance
          FROM wallets w
          LEFT JOIN transactions t ON t.wallet_id = w.id
          GROUP BY w.id, w.name
          ORDER BY w.id
        `;

        try {
          const rows = await db.getAllAsync<WalletBalance>(query);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function getBudgetList() {
      const query = `
          SELECT b.id, b.limit_amount,b.tag_id, g.name AS tag_name, g.icon AS tag_icon, IFNULL(SUM(t.value),0) AS spent
          FROM budgets b
          JOIN tags g ON b.tag_id = g.id
          LEFT JOIN transactions t 
                    ON t.tag_id = b.tag_id
                    AND strftime('%Y-%m', t.date) = strftime('%Y-%m', 'now') 
          GROUP BY b.id, b.limit_amount, g.name
          ORDER BY b.id
        `;

        try {
          const rows = await db.getAllAsync<Budget>(query);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function getSavingList() {
      const query = `
          SELECT s.id, s.goal,s.tag_id, g.name AS tag_name, g.icon AS tag_icon, IFNULL(SUM(t.value),0) AS saved
          FROM savings s
          JOIN tags g ON s.tag_id = g.id
          LEFT JOIN transactions t ON t.tag_id = s.tag_id
          GROUP BY s.id, s.goal, g.name
          ORDER BY s.id
        `;

        try {
          const rows = await db.getAllAsync<Saving>(query);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function getTransactionsFromWallet(wallet_id: number) {
      const query = `
          SELECT t.id, t.value, t.desc, t.date,t.wallet_id, w.name AS wallet_name,t.tag_id, g.name AS tag_name, g.icon AS tag_icon
          FROM transactions t
          LEFT JOIN wallets w ON t.wallet_id = w.id
          LEFT JOIN tags g ON t.tag_id = g.id
          WHERE t.wallet_id = ?
          ORDER BY t.date DESC
        `;

        try {
          const rows = await db.getAllAsync<Transaction>(query,wallet_id);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function getTransactionsFromTag(tag_id: number) {
      const query = `
          SELECT t.id, t.value, t.desc, t.date,t.wallet_id, w.name AS wallet_name,t.tag_id, g.name AS tag_name, g.icon AS tag_icon
          FROM transactions t
          LEFT JOIN wallets w ON t.wallet_id = w.id
          LEFT JOIN tags g ON t.tag_id = g.id
          WHERE t.tag_id = ${tag_id}
          ORDER BY t.date DESC
        `;

        try {
          const rows = await db.getAllAsync<Transaction>(query);
          return rows;
        } catch (error) {
          throw error;
        }
    }

    async function updateWallet(id: number, newName: string) {
      try {
        await db.execAsync(`UPDATE wallets SET name = '${newName}' WHERE id = ${id}`);
      } catch (error) {
        throw error;
      }
    }

    async function updateTag(id: number, newName: string, newIcon: string) {
      try {
        await db.execAsync(`UPDATE tags SET name = '${newName}', icon = '${newIcon}' WHERE id = ${id}`);
      } catch (error) {
        throw error;
      }
    }

    async function updateBudget(id: number, newLimit: number) {
      try {
        await db.execAsync(`UPDATE budgets SET limit_amount = '${newLimit}' WHERE id = ${id}`);
      } catch (error) {
        throw error;
      }
    }

    async function updateSaving(id: number, newGoal: number) {
      try {
        await db.execAsync(`UPDATE savings SET goal = '${newGoal}' WHERE id = ${id}`);
      } catch (error) {
        throw error;
      }
    }

    async function deleteWallet(id: number) {
      try {
        await db.execAsync(`DELETE FROM transactions WHERE wallet_id = ${id}`);
        await db.execAsync(`DELETE FROM wallets WHERE id = ${id}`);
      } catch (error) {
        throw error;
      }
    }

    async function deleteTag(id: number) {
      try {
        await db.execAsync(`DELETE FROM transactions WHERE tag_id = ${id}`);
        await db.execAsync(`DELETE FROM budgets WHERE tag_id = ${id}`);
        await db.execAsync(`DELETE FROM savings WHERE tag_id = ${id}`);
        await db.execAsync(`DELETE FROM tags WHERE id = ${id}`);
      } catch (error) {
        throw error;
      }
    }

    return {
        getWallet,
        getBudget,
        getSaving,
        getMonthTransactions,
        getRecentTransactions,
        getBudgetCount,
        getWalletCount,
        getSavingsCount,
        addWallet,
        addTag,
        addBudget,
        addSaving,
        addTransaction,
        getTagList,
        getWalletList,
        getWalletBalanceList,
        getBudgetList,
        getSavingList,
        getTransactionsFromWallet,
        getTransactionsFromTag,
        updateWallet,
        updateTag,
        updateBudget,
        updateSaving,
        deleteWallet,
        deleteTag,
    };

}