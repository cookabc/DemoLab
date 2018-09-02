exports.up = function (knex) {
  return knex.schema.createTable('cargo_item', function (t) {
    t.increments('id').primary()
    t.string('item_no').notNullable()
    t.string('item_name').notNullable()
    t.string('program_belong')
    t.string('store_temperature').notNullable()
  })
}
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cargo_item')
}
