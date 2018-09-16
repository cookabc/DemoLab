exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('item_ship_records', function(table) {
      table.string('note')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('item_ship_records', function(table) {
      table.dropColumn('note')
    }),
  ])
}
