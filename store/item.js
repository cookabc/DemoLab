const knex = require('knex')(require('../knex'))
module.exports = {
  //
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
    if (store_temperature) {
      queryString.store_temperature = store_temperature
    }
    return knex('cargo_item')
      .debug()
      .where('item_name', 'like', `%${item_name}%`)
      .andWhere('program_belong', 'like', `%${program_belong}%`)
      .andWhere(queryString)
      .select()
      .then(res => res)
      .catch(error => error)
  },
  updateItem({ id, item_no, item_name, program_belong, store_temperature }) {
    console.log(`Update item ${item_name}`)
    return knex('cargo_item')
      .where({ id })
      .update({
        item_no,
        item_name,
        program_belong,
        store_temperature,
      })
      .debug()
      .catch(error => error)
  },

  //
  createItemStorage({ item_id, store_position, store_number, expired_date, note = '' }) {
    console.log(`Create item storage: ${item_id}`)
    return knex('item_storage')
      .insert({
        item_id,
        store_position,
        store_number,
        expired_date,
        note,
      })
      .debug()
      .catch(error => error)
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
      .catch(error => error)
  },
  updateItemStorage({ id, store_position, store_number, expired_date, note = '' }) {
    console.log(`Update item storage: ${id}`)
    return knex('item_storage')
      .where({ id })
      .update({
        store_position,
        store_number,
        expired_date,
        note,
      })
      .debug()
      .catch(error => error)
  },
  deleteItemStorage({ id }) {
    console.log(`Delete item storage: ${id}`)
    return knex('item_storage')
      .debug()
      .where({ id })
      .del()
      .then(res => res)
      .catch(error => error)
  },
  shipItem({ id, ship_number = 0 }) {
    console.log(`Ship item storage: ${id}`)
    return knex('item_storage')
      .debug()
      .where({ id })
      .decrement('store_number', ship_number)
      .then(res => res)
      .catch(error => error)
  },
}
