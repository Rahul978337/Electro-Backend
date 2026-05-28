const express = require('express')
const router = express.Router()
const sliderController = require('../controller/SliderController')
const { sliderUploads } = require('../middleware/imageUploads')

// Add slider
router.post('/api/add-slider', sliderUploads.single('image'), sliderController.addSlider)

// Get all sliders (admin)
router.get('/api/get-all-sliders', sliderController.getAllSliders)

// Update slider
router.put('/api/update-slider/:id', sliderUploads.single('image'), sliderController.updateSlider)

// Delete slider
router.delete('/api/delete-slider/:id', sliderController.deleteSlider)

module.exports = router
