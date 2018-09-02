const express = require('express')
const bodyParser = require('body-parser')
const storeItem = require('./store/item')
const storeSuite = require('./store/suite')
const app = express()
app.use(express.static('dist'))
app.use(bodyParser.json())
app.post('/api/createItem', (req, res) => {
  storeItem
    .createItem({
      item_no: req.body.itemNo,
      item_name: req.body.itemName,
      program_belong: req.body.programBelong,
      store_temperature: req.body.storeTemperature,
    })
    .then(() => res.sendStatus(200))
})
app.get('/api/getItem', (req, res) => {
  storeItem
    .getItem({
      id: req.query.id,
      item_no: req.query.itemNo,
      item_name: req.query.itemName,
      program_belong: req.query.programBelong,
      store_temperature: req.query.storeTemperature,
    })
    .then(data => {
      console.log({ data })
      if (data) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data }))
      } else {
        res.sendStatus(401)
      }
    })
})
app.get('/api/getItemStorage', (req, res) => {
  storeItem
    .getItemStorage({
      item_id: req.query.itemId,
    })
    .then(data => {
      console.log({ data })
      if (data) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data }))
      } else {
        res.sendStatus(401)
      }
    })
})
app.post('/api/saveItem', (req, res) => {
  storeItem
    .saveItem({
      item_id: req.body.itemId,
      store_position: req.body.storePosition,
      store_number: req.body.storeNumber,
      expired_date: req.body.expiredDate,
      note: req.body.note,
    })
    .then(() => res.sendStatus(200))
})
app.post('/api/shipItem', (req, res) => {
  storeItem
    .shipItem({
      id: req.body.id,
      ship_number: req.body.shipNumber,
    })
    .then(() => {
      storeItem
        .shipRecords({
          item_storage_id: req.body.id,
          item_id: req.body.itemId,
          initiator_name: req.body.initiatorName,
          initiator_pos_dep: req.body.initiatorPosDep,
          initiator_usage: req.body.initiatorUsage,
          create_date: new Date(),
        })
        .then(() => {
          res.sendStatus(200)
        })
    })
})
app.post('/api/createSuite', (req, res) => {
  storeSuite
    .createSuite({
      suite_no: req.body.suiteNo,
      suite_name: req.body.suiteName,
      program_belong: req.body.programBelong,
    })
    .then(() => res.sendStatus(200))
})
app.get('/api/getSuite', (req, res) => {
  storeSuite
    .getSuite({
      id: req.query.id,
      suite_no: req.query.suiteNo,
      suite_name: req.query.suiteName,
      program_belong: req.query.programBelong,
    })
    .then(data => {
      console.log({ data })
      if (data) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data }))
      } else {
        res.sendStatus(401)
      }
    })
})
app.post('/api/createSuiteComponent', (req, res) => {
  storeSuite
    .createSuiteComponent({
      suite_id: req.body.suiteId,
      item_id: req.body.itemId,
      item_number: req.body.itemNumber,
    })
    .then(() => res.sendStatus(200))
})
app.get('/api/getSuiteComponent', (req, res) => {
  storeSuite
    .getSuiteComponent({
      suite_id: req.query.suiteId,
    })
    .then(data => {
      console.log({ data })
      if (data) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data }))
      } else {
        res.sendStatus(401)
      }
    })
})
app.get('/api/getSuiteComponentItemCount', (req, res) => {
  storeSuite
    .getSuiteComponentItemCount({
      suite_id: req.query.suiteId,
    })
    .then(data => {
      console.log({ data })
      if (data) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify({ data }))
      } else {
        res.sendStatus(401)
      }
    })
})
app.listen(7555, () => {
  console.log('Server running on http://localhost:7555')
})
