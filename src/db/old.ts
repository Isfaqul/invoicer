// export const customerTable = sqliteTable("customers", {
//   id: int().primaryKey({ autoIncrement: true }),
//   name: text().notNull(),
//   address: text().notNull(),
//   createdAt: text().default(sql`(CURRENT_DATE)`),
// });

// export const invoicesTable = sqliteTable("invoices", {
//   id: int().primaryKey({ autoIncrement: true }),
//   customerId: int()
//     .notNull()
//     .references(() => customerTable.id),
//   customerName: text().notNull(),
//   customerAddress: text().notNull(),
//   date: int().notNull(),
//   status: text().notNull(),
//   refId: text(),
//   createdAt: text().default(sql`(CURRENT_DATE)`),
// });

// export const itemsTable = sqliteTable("items", {
//   id: int().primaryKey({ autoIncrement: true }),
//   invoiceId: int()
//     .notNull()
//     .references(() => invoicesTable.id),
//   name: text().notNull(),
//   rate: real().notNull(),
//   quantity: int().notNull(),
//   HSN: text(),
// });
