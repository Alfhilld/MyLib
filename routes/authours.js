const express = require('express')
const router = express.Router()
const Authour = require('../models/authour')

// Every Authour
router.get('/', async (req, res) => {
  let searchOptions = {}
  if(req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const authours = await Authour.find(searchOptions)
    res.render('authours/index', {
      authours: authours,
      searchOptions: req.query })
  } catch {
    res.redirect('/')
  }
})

// New Authour Display
router.get('/new', (req, res) => {
  res.render('authours/new', { authour: new Authour() })
})

// Add New Authour
router.post('/', async (req, res) => {
  const authour = new Authour({
    name: req.body.name
  })
  try{
    const newAuthour = await authour.save()
    //res.redirect(`authours/${newAuthour.id}`)
    res.redirect(`authours`)
  }catch{
    res.render('authours/new', {
      authour: authour,
      errorMessage: 'Error whilst creating Authour. (27)'
    })
  }
})

module.exports = router
