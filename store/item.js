const knex = require('knex')(require('../knex'))
module.exports = {
  createItem({ item_no, item_name, program_belong, store_temperature }) {
    console.log(`Add item ${item_name}`)
    return knex('cargo_item')
      .insert({
        item_no,
        item_name,
        program_belong,
        store_temperature,
      })
      .debug()
      .catch(error => error)
  },
  getItem({ id = '', item_no = '', item_name = '', program_belong = '', store_temperature = '' }) {
    console.log(`Query item: ${item_no} ${item_name} ${program_belong} ${store_temperature}`)
    let queryString = {}
    if (id) {
      queryString.id = id
    }
    if (item_no) {
      queryString.item_no = item_no
    }
    if (item_name) {
      queryString.item_name = item_name
    }
    if (program_belong) {
      queryString.program_belong = program_belong
    }
    if (store_temperature) {
      queryString.store_temperature = store_temperature
    }
    return knex('cargo_item')
      .debug()
      .where(queryString)
      .select()
      .then(res => res)
  },
  saveItem({ item_id, store_position, store_number, expired_date, note = '' }) {
    console.log(`Save item: ${item_id}`)
    return knex('item_storage')
      .insert({
        item_id,
        store_position,
        store_number,
        expired_date,
        note,
      })
      .debug()
  },
  getItemStorage({ item_id = '' }) {
    console.log(`Query item storage: ${item_id}`)
    let queryString = {}
    if (item_id) {
      queryString.item_id = item_id
    }
    return knex('item_storage')
      .debug()
      .where(queryString)
      .select()
      .then(res => res)
  },
  shipItem({ id, ship_number = 0 }) {
    console.log(`Ship item: ${id}`)
    return knex('item_storage')
      .debug()
      .where('id', id)
      .decrement('store_number', ship_number)
      .then(res => res)
  },
  shipRecords({ item_id, item_storage_id, initiator_name, initiator_pos_dep, initiator_usage, create_date = new Date() }) {
    console.log(`Record shipping: ${item_id}`)
    return knex('item_ship_records')
      .insert({
        item_id,
        item_storage_id,
        initiator_name,
        initiator_pos_dep,
        initiator_usage,
        create_date,
      })
      .debug()
  },
}
