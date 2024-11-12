const Url = require('../models/urlModel');

const getHome = (req, res) => {
    const locals = { title: "Home | SnapURL!" };
    return res.render("index", {
        locals,
        layout: "layout/mainLayout",
    });
};

const shortenUrl = async (req, res) => {

}

const getAbout = (req, res) => {
    const locals = { title: "About Us | SnapURL!" };
    return res.render("about", {
        locals,
        layout: "layout/mainLayout",
    });
};

const getContact = (req, res) => {
    const locals = { title: "Contact Us | SnapURL!" };
    return res.render("contact", {
        locals,
        layout: "layout/mainLayout",
    });
};

const getShortenedUrl = (req, res) => {
    const locals = { title: "Shortened Url | SnapURL!" };
    return res.render("result", {
        locals,
        layout: "layout/mainLayout",
    });
};

module.exports ={
    getHome,
    getAbout,
    getContact,
    getShortenedUrl,
};