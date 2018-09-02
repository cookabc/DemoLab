exports.up = function(knex) {
  return knex.schema.createTable('suite_storage', function(t) {
    t.increments('id').primary()
    t.integer('suite_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cargo_suite')
    t.integer('store_valid_number').notNullable()
    t.integer('store_expired_number').notNullable()
  })
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('suite_storage')
}
