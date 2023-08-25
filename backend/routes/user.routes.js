const express = require('express')
const {
  login,
  register,
  get_donor,
  edit_donor,
  delete_donor,
} = require('../lib/user_functions')
const route = express.Router()

route.post('/user-login', async (req, res) => {
  //console.log('req ', req)
  const { err, msg } = await login(req.body)
  console.log(err, msg)
  res.status(200).send({ err, msg })
})

route.post('/user-register', async (req, res) => {
  //console.log('req ', req)
  const { err, msg } = await register(req.body)
  res.status(200).send({ err, msg })
})

route.post('/get-donor', async (req, res) => {
  //console.log('req ', req)
  const { err, msg } = await get_donor()
  res.status(200).send({ err, msg })
})

route.post('/edit-donor', async (req, res) => {
  //console.log('req ', req)
  const { err, msg } = await edit_donor(req.body)
  res.status(200).send({ err, msg })
})

route.post('/delete-donor', async (req, res) => {
  //console.log('req ', req)
  const { err, msg } = await delete_donor(req.body.id)
  res.status(200).send({ err, msg })
})

module.exports = route
