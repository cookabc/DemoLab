exports.up = function(knex) {
  return knex.schema.createTable('item_storage', function(t) {
    t.increments('id').primary()
    t.integer('item_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('cargo_item')
    t.string('store_position').notNullable()
    t.integer('store_number').notNullable()
    t.string('expired_date').notNullable()
    t.string('note')
  })
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('item_storage')
}
