mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
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
            commands::save_invoice,
            commands::load_invoices,
            commands::delete_invoice,
            commands::find_invoice,
            commands::get_next_invoice_id,
            commands::load_invoices_with_meta,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

fn init_db(app: &tauri::AppHandle) {
    let conn = commands::get_connection(app);

    conn.execute(
        "CREATE TABLE IF NOT EXISTS invoices (
        row_id INTEGER PRIMARY KEY AUTOINCREMENT, 
        id TEXT UNIQUE NOT NULL, 
        data TEXT NOT NULL,
        isPaid INTEGER NOT NULL DEFAULT 0 CHECK (isPaid IN (0, 1)),
        created TEXT DEFAULT CURRENT_TIMESTAMP
        )",
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
