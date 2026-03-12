use rusqlite::Connection;
use tauri::Manager;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            init_db(app.handle());

            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            save_invoice,
            load_invoices,
            delete_invoice,
            find_invoice,
            get_last_invoice,
            get_next_invoice_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn get_connection(app: &tauri::AppHandle) -> Connection {
    let mut path = app.path().app_data_dir().unwrap();

    std::fs::create_dir_all(&path).unwrap();

    path.push("invoices.db");

    println!("{:?}", path);

    Connection::open(path).unwrap()
}

fn init_db(app: &tauri::AppHandle) {
    let conn = get_connection(app);

    conn.execute(
        "CREATE TABLE IF NOT EXISTS invoices (row_id INTEGER PRIMARY KEY AUTOINCREMENT, id TEXT UNIQUE NOT NULL, data TEXT NOT NULL)",
        [],
    )
    .unwrap();

    conn.execute(
        "CREATE TABLE IF NOT EXISTS invoice_counters (
            year INTEGER PRIMARY KEY,
            last_number INTEGER NOT NULL
            )",
        [],
    )
    .unwrap();
}

#[tauri::command]
fn save_invoice(app: tauri::AppHandle, id: String, data: String) {
    let conn = get_connection(&app);

    conn.execute(
        "INSERT OR REPLACE INTO invoices (id, data) VALUES (?1, ?2)",
        [id, data],
    )
    .unwrap();
}

#[tauri::command]
fn load_invoices(app: tauri::AppHandle) -> Vec<String> {
    let conn = get_connection(&app);

    let mut stmt = conn.prepare("SELECT data FROM invoices").unwrap();

    stmt.query_map([], |row| row.get(0))
        .unwrap()
        .map(|r| r.unwrap())
        .collect()
}

#[tauri::command]
fn delete_invoice(app: tauri::AppHandle, id: String) {
    let conn = get_connection(&app);

    conn.execute("DELETE FROM invoices WHERE id = (?1)", [id])
        .unwrap();
}

#[tauri::command]
fn find_invoice(app: tauri::AppHandle, id: String) -> Option<String> {
    let conn = get_connection(&app);

    let mut stmt = conn
        .prepare("SELECT data FROM invoices WHERE id = ?1")
        .unwrap();

    let result = stmt.query_row([id], |row| row.get(0)).ok();

    result
}

#[tauri::command]
fn get_last_invoice(app: tauri::AppHandle) -> Option<String> {
    let conn = get_connection(&app);

    let mut stmt = conn
        .prepare("SELECT data FROM invoices ORDER BY rowid DESC LIMIT 1")
        .unwrap();

    let result = stmt.query_row([], |row| row.get(0)).ok();

    result
}

#[tauri::command]
fn get_next_invoice_id(app: tauri::AppHandle, year: i32) -> i32 {
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
