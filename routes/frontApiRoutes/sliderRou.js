const express = require('express')
const router = express.Router()
const sliderCon = require('../../controller/frontApi/sliderCon')

// Public API — get active sliders for home page
router.get('/api/front/sliders', sliderCon.getActiveSliders)

module.exports = router
