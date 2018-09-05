exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('cargo_item', function(table) {
      table.unique(['item_no', 'item_name', 'program_belong', 'store_temperature'], 'uniqueIndex')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('cargo_item', function(table) {
      table.dropColumn(['item_no', 'item_name', 'program_belong', 'store_temperature'])
    }),
  ])
}
