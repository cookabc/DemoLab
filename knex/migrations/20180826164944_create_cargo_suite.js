exports.up = function(knex) {
  return knex.schema.createTable('cargo_suite', function(t) {
    t.increments('id').primary()
    t.string('suite_no').notNullable()
    t.string('suite_name').notNullable()
    t.string('program_belong')
  })
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cargo_suite')
}
