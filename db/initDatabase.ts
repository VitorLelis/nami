import { type SQLiteDatabase } from 'expo-sqlite';

export async function initDatabase(db: SQLiteDatabase) {
  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS wallets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );`);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );`);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS budgets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tag_id INTEGER NOT NULL,
            limit_amount REAL,
            FOREIGN KEY (tag_id) REFERENCES tags(id)
        );`);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS savings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tag_id INTEGER NOT NULL,
            goal REAL,
            FOREIGN KEY (tag_id) REFERENCES tags(id)
        );`);

  await db.execAsync(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            wallet_id INTEGER NOT NULL,
            tag_id INTEGER NOT NULL,
            value REAL,
            desc TEXT,
            date TEXT,
            FOREIGN KEY (wallet_id) REFERENCES wallets(id),
            FOREIGN KEY (tag_id) REFERENCES tags(id)
        );`);
}