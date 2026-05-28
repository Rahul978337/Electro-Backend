const mongoose = require('mongoose')

const sliderSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    buttonText: { type: String, default: 'Shop Now' },
    image: { type: String },
    status: { type: Boolean, default: true },
}, { timestamps: true })

module.exports = mongoose.model('slider', sliderSchema)
