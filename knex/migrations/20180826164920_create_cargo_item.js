exports.up = function(knex) {
  return knex.schema.createTable('cargo_item', function(t) {
    t.increments('id').primary()
    t.string('item_no')
    t.string('item_name').notNullable()
    t.string('program_belong')
    t.string('store_temperature')
    t.integer('safe_number')
    t.unique(['item_no', 'item_name', 'program_belong', 'store_temperature', 'safe_number'], 'uniqueIndex')
  })
}
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cargo_item')
}
