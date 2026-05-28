const Contact = require("../../models/contactModel");
const statuscode= require("http-status-codes");


module.exports.submitContact = async (req, res) => {
  try {
    const { name, email, mobile, project, subject, message } = req.body;

  
    if (!name || !email || !mobile || !project || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

  
    const contact = await Contact.create({
      name,
      email,
      mobile,
      project,
      subject,
      message
    });

    return res.status(200).json({
      success: true,
      message: "Message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};


module.exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "All contacts fetched successfully",
      data: contacts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};