const {Router} = require("express");
const router = Router();
const authController = require("../controllers/authController");
const chatRoomCtl = require("../controllers/chatRoomController");
const requireAuth = require("../midlewares/authMidleware");
router.get("*",requireAuth.checkUser);
router.get('/', (req, res) => res.render('home'));
router.get('/chatroom', requireAuth.requireAuth, chatRoomCtl.chatroom_get);
router.get("/signup",requireAuth.requireLoggedout, authController.singup_get);
router.post("/signup",authController.singup_post);
router.get("/login",requireAuth.requireLoggedout,authController.login_get);
router.post("/login",authController.login_post);
router.get("/logout",requireAuth.requireAuth,authController.logout_get);



module.exports = router;