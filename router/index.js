const router = require("express").Router();

const {
    getUserSessionInfo,
    getAccessToRoute,
    loginControl,
} = require("../middlewares/authorization/auth");
const {
    renderLoginPage,
    renderMenuPage,
    renderMenuControlPage,
    login,
    setMenu,
    logout,
} = require("../controller/menuController");

router.use(getUserSessionInfo);

router.get("/", renderMenuPage);
router.get("/menucontrol", getAccessToRoute, renderMenuControlPage);
router.post("/menucontrol", getAccessToRoute, setMenu);
router.post("/login", login);
router.get("/login", loginControl, renderLoginPage);
router.get("/logout", logout);

module.exports = router;
