const knex = require('knex')(require('../knex'))
module.exports = {
  createRecord({ item_id, item_storage_id, initiator_name, initiator_pos_dep, initiator_usage, ship_number, create_date, note }) {
    console.log(`Creating shipping record: ${item_id}`)
    return knex('item_ship_records')
      .insert({
        item_id,
        item_storage_id,
        initiator_name,
        initiator_pos_dep,
        initiator_usage,
        ship_number,
        create_date,
        note,
      })
      .debug()
      .catch(error => error)
  },
  getRecords() {
    console.log(`Query shipping records`)
    return knex('item_ship_records as records')
      .innerJoin('cargo_item as item', 'item.id', 'records.item_id')
      .innerJoin('item_storage as storage', 'storage.id', 'records.item_storage_id')
      .select([
        'records.id',
        'records.item_id',
        'records.create_date',
        'records.initiator_name',
        'records.initiator_pos_dep',
        'records.initiator_usage',
        'records.ship_number',
        'records.note',
        'storage.store_position',
        'storage.expired_date',
        'item.item_no',
        'item.item_name',
        'item.store_temperature',
      ])
      .debug()
      .then(res => res)
      .catch(error => error)
  },
  updateRecord({ id, note }) {
    console.log(`Update shipping record ${id}`)
    return knex('item_ship_records')
      .where({ id })
      .update({ note })
      .debug()
      .catch(error => error)
  },
  deleteRecord({ id }) {
    console.log(`Delete shipping record ${id}`)
    return knex('item_ship_records')
      .where({ id })
      .del()
      .debug()
      .catch(error => error)
  },
}
