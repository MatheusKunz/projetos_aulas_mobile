import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('exercicios.db');

export function initDb() {
  db.execSync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS exercicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT NOT NULL
    );
`);
}