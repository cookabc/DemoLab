exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('item_storage', function(table) {
      table.string('expired_date')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('item_storage', function(table) {
      table.dropColumn('expired_date')
    }),
  ])
}
