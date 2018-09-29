exports.up = function(knex) {
  return knex.schema.createTable('cargo_suite', function(t) {
    t.increments('id').primary()
    t.string('suite_no')
    t.string('suite_name').notNullable()
    t.string('program_belong')
    t.integer('safe_number')
    t.unique(['suite_no', 'suite_name', 'program_belong'], 'uniqueIndex')
  })
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cargo_suite')
}
