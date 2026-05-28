const statuscode = require('http-status-codes')
const SliderModel = require('../../models/SliderModel')

// GET ACTIVE SLIDERS (Public — used on home page)
module.exports.getActiveSliders = async (req, res) => {
    try {
        const sliders = await SliderModel.find({ status: true }).sort({ createdAt: -1 })

        const SITEURL = `${process.env.SITEURL}/uploads/slider/`

        const updated = sliders.map((s) => ({
            ...s._doc,
            image: s.image ? SITEURL + s.image : null,
        }))

        res.json({
            status: statuscode.OK,
            success: true,
            message: 'Active sliders fetched successfully',
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
