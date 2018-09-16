exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('cargo_item', function(table) {
      table.unique(['item_no', 'item_name', 'program_belong', 'store_temperature'], 'uniqueIndex')
    }),
    knex.schema.table('cargo_item', function(table) {
      table.string('item_no').alter()
    }),
    knex.schema.alterTable('cargo_item', function(table) {
      table.integer('safe_number')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('cargo_item', function(table) {
      table.dropColumn(['item_no', 'item_name', 'program_belong', 'store_temperature'])
    }),
    knex.schema.table('cargo_item', function(table) {
      table.dropColumn(['item_no'])
    }),
    knex.schema.alterTable('cargo_item', function(table) {
      table.dropColumn(['safe_number'])
    }),
  ])
}
