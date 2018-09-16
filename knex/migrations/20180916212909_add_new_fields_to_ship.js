exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('item_ship_records', function(table) {
      table.string('item_position')
    }),
    knex.schema.alterTable('item_ship_records', function(table) {
      table.string('item_expired_date')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('item_ship_records', function(table) {
      table.dropColumn('item_position')
    }),
    knex.schema.alterTable('item_ship_records', function(table) {
      table.dropColumn('item_expired_date')
    }),
  ])
}
