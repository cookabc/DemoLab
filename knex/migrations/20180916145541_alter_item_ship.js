exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('item_ship_records', function(table) {
      table.string('note')
    }),
    knex.schema.alterTable('item_ship_records', function(table) {
      table.integer('ship_number').notNullable()
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('item_ship_records', function(table) {
      table.dropColumn('note')
    }),
    knex.schema.alterTable('item_ship_records', function(table) {
      table.dropColumn('ship_number')
    }),
  ])
}
