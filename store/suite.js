const knex = require('knex')(require('../knex'))
module.exports = {
  createSuite({ suite_no, suite_name, program_belong }) {
    console.log(`Add suite ${suite_name}`)
    return knex('cargo_suite')
      .insert({
        suite_no,
        suite_name,
        program_belong,
      })
      .debug()
      .catch(error => error)
  },
  updateSuite({ id, suite_no, suite_name, program_belong }) {
    console.log(`Update Suite ${suite_name}`)
    return knex('cargo_suite')
      .where({ id })
      .update({
        suite_no,
        suite_name,
        program_belong,
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
    if (suite_name) {
      queryString.suite_name = suite_name
    }
    if (program_belong) {
      queryString.program_belong = program_belong
    }
    return knex('cargo_suite')
      .debug()
      .where(queryString)
      .select()
      .then(res => res)
      .catch(error => error)
  },
  createSuiteComponent({ suite_id, item_id, item_number }) {
    console.log(`Add suite_item_relation: ${suite_id} composed of ${item_number} ${item_id}`)
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
  getSuiteComponentItemCount({ suite_id = '' }) {
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
}
