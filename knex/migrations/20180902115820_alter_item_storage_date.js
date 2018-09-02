exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('item_storage', function(table) {
      table.string('expired_date').alter()
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('item_storage', function(table) {
      table.dropColumn('expired_date')
    }),
  ])
}
