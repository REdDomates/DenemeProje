const fs = require("fs");

const asyncErrorWrapper = require("express-async-handler");
const { validateUserInput } = require("../helpers/input/inputHelpers");
const CustomError = require("../helpers/error/CustomError");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");

const renderLoginPage = asyncErrorWrapper(async (req, res, next) => {
    res.render("login");
});

const renderMenuPage = asyncErrorWrapper(async (req, res, next) => {
    res.render("menu");
});

const renderMenuControlPage = asyncErrorWrapper(async (req, res, next) => {
    res.render("menuControl");
});

const login = asyncErrorWrapper(async (req, res, next) => {
    const { email, password } = req.body;

    if (!validateUserInput(email, password)) {
        return next(new CustomError("Please check your inputs", 400));
    }

    const user = {
        userName: process.env.LOGIN_USER_NAME,
        password: process.env.LOGIN_PASWORD,
    };

    //check mail
    if (!password) {
        res.render("login", {
            mailError: "Please check your e-mail address.",
        });
        return next();
    }

    //check password
    if (user.password !== password) {
        res.render("login", {
            passwordError: "Please check your password.",
        });
        return next();
    }

    sendJwtToClient(user, res);

    res.redirect("/menucontrol");
});

const logout = asyncErrorWrapper(async (req, res, next) => {
    return res.status(200).clearCookie("access_token").redirect("/");
});

const setMenu = asyncErrorWrapper(async (req, res, next) => {
    const data = req.body;
    const menu = [];
    for (let i = 0; i < data.productName.length; i++) {
        menu.push({
            productName: data.productName[i],
            productPrice: data.productPrice[i],
            oldPrice: data.oldPrice[i],
            productQty: data.productQty[i],
        });
    }

    const result = { menu };
    fs.writeFile("./public/menu.json", JSON.stringify(result), (err) => {
        if (err) {
            console.log("Hata: ", err);
        } else {
            console.log("Veriler dosyaya yazıldı!");
        }
    });

    res.redirect("menucontrol");
    // console.log(JSON.stringify(result));
});
module.exports = {
    renderLoginPage,
    renderMenuPage,
    login,
    renderMenuControlPage,
    setMenu,
    logout,
};
