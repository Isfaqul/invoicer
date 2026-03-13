use tauri::{
    menu::{MenuBuilder, MenuItemBuilder, SubmenuBuilder},
    Emitter,
};
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
        .menu(|app| {
            let save = MenuItemBuilder::with_id("save", "Save")
                .accelerator("CmdOrCtrl+S")
                .build(app)?;

            let preview = MenuItemBuilder::with_id("preview", "Preview")
                .accelerator("CmdOrCtrl+P")
                .build(app)?;

            let quit = MenuItemBuilder::with_id("quit", "Quit")
                .accelerator("CmdOrCtrl+Q")
                .build(app)?;

            let file_menu = SubmenuBuilder::new(app, "File")
                .items(&[&save, &preview, &quit])
                .build()?;

            MenuBuilder::new(app).items(&[&file_menu]).build()
        })
        .on_menu_event(
            |app_handle: &tauri::AppHandle, event| match event.id().0.as_str() {
                "save" => {
                    println!("Save Event");
                    let _ = app_handle.emit("menu-save", ());
                }
                "preview" => {
                    println!("Preview Event");
                    let _ = app_handle.emit("menu-preview", ());
                }
                "quit" => {
                    println!("Quit Event");
                    app_handle.exit(0);
                }
                _ => {}
            },
        )
        .invoke_handler(tauri::generate_handler![
            commands::save_invoice,
            commands::load_invoices,
            commands::delete_invoice,
            commands::find_invoice,
            commands::get_next_invoice_id
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
        data TEXT NOT NULL
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
