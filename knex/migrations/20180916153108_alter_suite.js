exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('cargo_suite', function(table) {
      table.unique(['suite_no', 'suite_name', 'program_belong'], 'uniqueIndex')
    }),
    knex.schema.alterTable('cargo_suite', function(table) {
      table.integer('safe_number')
    }),
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.alterTable('cargo_suite', function(table) {
      table.dropColumn(['suite_no', 'suite_name', 'program_belong'])
    }),
    knex.schema.alterTable('cargo_suite', function(table) {
      table.dropColumn(['safe_number'])
    }),
  ])
}
