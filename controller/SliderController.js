const statuscode = require('http-status-codes')
const SliderModel = require('../models/SliderModel')

// Helper: build full image URL
const imageUrl = (filename) =>
    filename ? `${process.env.SITEURL}/uploads/slider/${filename}` : null

// ADD SLIDER (Admin)
module.exports.addSlider = async (req, res) => {
    try {
        const { title, subtitle, description, buttonText } = req.body
        const image = req.file ? req.file.filename : null

        const slider = await SliderModel.create({
            title,
            subtitle,
            description,
            buttonText,
            image,
        })

        res.json({
            status: statuscode.OK,
            success: true,
            message: 'Slider added successfully',
            data: { ...slider._doc, image: imageUrl(slider.image) },
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            status: statuscode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
        })
    }
}

// GET ALL SLIDERS (Admin)
module.exports.getAllSliders = async (req, res) => {
    try {
        const sliders = await SliderModel.find().sort({ createdAt: -1 })
        const updated = sliders.map((s) => ({
            ...s._doc,
            image: imageUrl(s.image),
        }))
        res.json({
            status: statuscode.OK,
            success: true,
            message: 'All sliders fetched successfully',
            data: updated,
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            status: statuscode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
            data: [],
        })
    }
}

// UPDATE SLIDER (Admin)
module.exports.updateSlider = async (req, res) => {
    try {
        const { id } = req.params
        const { title, subtitle, description, buttonText, status } = req.body
        const updateData = { title, subtitle, description, buttonText, status }

        if (req.file) {
            updateData.image = req.file.filename
        }

        const updated = await SliderModel.findByIdAndUpdate(id, updateData, { new: true })

        if (!updated) {
            return res.json({
                status: statuscode.NOT_FOUND,
                success: false,
                message: 'Slider not found',
            })
        }

        res.json({
            status: statuscode.OK,
            success: true,
            message: 'Slider updated successfully',
            data: { ...updated._doc, image: imageUrl(updated.image) },
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            status: statuscode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
        })
    }
}

// DELETE SLIDER (Admin)
module.exports.deleteSlider = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await SliderModel.findByIdAndDelete(id)

        if (!deleted) {
            return res.json({
                status: statuscode.NOT_FOUND,
                success: false,
                message: 'Slider not found',
            })
        }

        res.json({
            status: statuscode.OK,
            success: true,
            message: 'Slider deleted successfully',
        })
    } catch (error) {
        console.log(error.message)
        res.json({
            status: statuscode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
        })
    }
}
