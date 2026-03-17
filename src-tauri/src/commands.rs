use rusqlite::Connection;
use tauri::Manager;

pub fn get_connection(app: &tauri::AppHandle) -> Connection {
    let mut path = app.path().app_data_dir().unwrap();

    std::fs::create_dir_all(&path).unwrap();

    path.push("invoices.db");

    println!("{:?}", path);

    Connection::open(path).unwrap()
}

#[tauri::command]
pub fn save_invoice(app: tauri::AppHandle, id: String, data: String) {
    let conn = get_connection(&app);

    conn.execute(
        "INSERT OR REPLACE INTO invoices (id, data) VALUES (?1, ?2)",
        [id, data],
    )
    .unwrap();
}

#[tauri::command]
pub fn load_invoices(app: tauri::AppHandle) -> Vec<String> {
    let conn = get_connection(&app);

    let mut stmt = conn.prepare("SELECT data FROM invoices").unwrap();

    stmt.query_map([], |row| row.get(0))
        .unwrap()
        .map(|r| r.unwrap())
        .collect()
}

#[tauri::command]
pub fn load_invoices_with_meta(app: tauri::AppHandle) -> Vec<String> {
    let conn = get_connection(&app);

    let mut stmt = conn.prepare("SELECT * FROM invoices").unwrap();

    stmt.query_map([], |row| row.get(0))
        .unwrap()
        .map(|r| r.unwrap())
        .collect()
}

#[tauri::command]
pub fn delete_invoice(app: tauri::AppHandle, id: String) {
    let conn = get_connection(&app);

    conn.execute("DELETE FROM invoices WHERE id = (?1)", [id])
        .unwrap();
}

#[tauri::command]
pub fn find_invoice(app: tauri::AppHandle, id: String) -> Option<String> {
    let conn = get_connection(&app);

    let mut stmt = conn
        .prepare("SELECT data FROM invoices WHERE id = ?1")
        .unwrap();

    let result = stmt.query_row([id], |row| row.get(0)).ok();

    result
}

#[tauri::command]
pub fn get_next_invoice_id(app: tauri::AppHandle, year: i32) -> i32 {
    let conn = get_connection(&app);

    conn.execute(
        "INSERT INTO invoice_counters (year, last_number)
         VALUES (?1, 0)
         ON CONFLICT(year) DO NOTHING",
        [year],
    )
    .unwrap();

    conn.execute(
        "UPDATE invoice_counters
         SET last_number = last_number + 1
         WHERE year = ?1",
        [year],
    )
    .unwrap();

    conn.query_row(
        "SELECT last_number FROM invoice_counters WHERE year = ?1",
        [year],
        |row| row.get(0),
    )
    .unwrap()
}
