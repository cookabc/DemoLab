const knex = require('knex')(require('../knex'))
module.exports = {
  //
  createSuite({ suite_no, suite_name, program_belong, safe_number }) {
    console.log(`Add suite: ${suite_name}`)
    return knex('cargo_suite')
      .insert({
        suite_no,
        suite_name,
        program_belong,
        safe_number,
      })
      .debug()
      .catch(error => error)
  },
  getSuite({ id = '', suite_no = '', suite_name = '', program_belong = '' }) {
    console.log(`Query suite: ${suite_no} ${suite_name} ${program_belong}`)
    let queryString = {}
    if (id) {
      queryString.id = id
    }
    if (suite_no) {
      queryString.suite_no = suite_no
    }
    return knex('cargo_suite')
      .debug()
      .where('suite_name', 'like', `%${suite_name}%`)
      .andWhere('program_belong', 'like', `%${program_belong}%`)
      .andWhere(queryString)
      .select()
      .then(res => res)
      .catch(error => error)
  },
  getSuiteAndStorage() {
    console.log(`Query all suites`)
    return knex('cargo_suite')
      .debug()
      .leftJoin('suite_item_relation', 'cargo_suite.id', 'suite_item_relation.suite_id')
      .leftJoin('item_storage', 'suite_item_relation.item_id', 'item_storage.item_id')
      .leftJoin('cargo_item', 'suite_item_relation.item_id', 'cargo_item.id')
      .select([
        'cargo_suite.id',
        'cargo_suite.suite_no',
        'cargo_suite.suite_name',
        'cargo_suite.safe_number as safe_suite',
        'suite_item_relation.item_number',
        'item_storage.store_position',
        'item_storage.store_number',
        'item_storage.expired_date',
        'item_storage.note',
        'item_storage.item_id',
        'cargo_item.item_no',
        'cargo_item.item_name',
        'cargo_item.store_temperature',
        'cargo_item.safe_number as safe_item',
      ])
      .orderBy('id', 'asc')
      .then(res => res)
      .catch(error => error)
  },
  updateSuite({ id, suite_no, suite_name, program_belong, safe_number }) {
    console.log(`Update suite: ${suite_name}`)
    return knex('cargo_suite')
      .where({ id })
      .update({
        suite_no,
        suite_name,
        program_belong,
        safe_number,
      })
      .debug()
      .catch(error => error)
  },
  deleteSuite({ id }) {
    console.log(`Delete suite: ${id}`)
    return knex('cargo_suite')
      .debug()
      .where({ id })
      .del()
      .then(res => res)
      .catch(error => error)
  },

  //
  createSuiteComponent({ suite_id, item_id, item_number }) {
    console.log(`Add suite component: ${suite_id} composed of ${item_number} ${item_id}`)
    return knex('suite_item_relation')
      .insert({
        suite_id,
        item_id,
        item_number,
      })
      .debug()
      .catch(error => error)
  },
  getSuiteComponent({ suite_id = '' }) {
    console.log(`Query suite component: ${suite_id}`)
    let queryString = {}
    if (suite_id) {
      queryString.suite_id = suite_id
    }
    return knex('suite_item_relation')
      .debug()
      .where(queryString)
      .select()
      .innerJoin('cargo_item', 'suite_item_relation.item_id', 'cargo_item.id')
      .then(res => res)
      .catch(error => error)
  },
  getSuiteComponentStorage({ suite_id = '' }) {
    console.log(`Query suite component: ${suite_id}`)
    let queryString = {}
    if (suite_id) {
      queryString.suite_id = suite_id
    }
    return knex('suite_item_relation')
      .debug()
      .where(queryString)
      .select()
      .innerJoin('item_storage', 'suite_item_relation.item_id', 'item_storage.item_id')
      .then(res => res)
      .catch(error => error)
  },
  deleteSuiteComponent({ suite_id, item_id }) {
    console.log(`Delete suite component: ${item_id}`)
    return knex('suite_item_relation')
      .debug()
      .where({ suite_id, item_id })
      .del()
      .then(res => res)
      .catch(error => error)
  },
}
