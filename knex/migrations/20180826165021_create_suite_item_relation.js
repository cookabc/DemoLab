exports.up = function(knex) {
  return knex.schema.createTable('suite_item_relation', function(t) {
    t.increments('id').primary()
    t.integer('suite_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cargo_suite')
    t.integer('item_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cargo_item')
    t.integer('item_number').notNullable()
  })
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('suite_item_relation')
}
