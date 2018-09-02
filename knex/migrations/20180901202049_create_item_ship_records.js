exports.up = function(knex) {
  return knex.schema.createTable('item_ship_records', function(t) {
    t.increments('id').primary()
    t.string('item_id').notNullable()
    t.string('item_storage_id').notNullable()
    t.string('initiator_name').notNullable()
    t.string('initiator_pos_dep').notNullable()
    t.string('initiator_usage').notNullable()
    t.string('create_date').notNullable()
  })
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cargo_item')
}
