const productsController = require("../controllers/porducts.controller");
const { requireSignIn, isAdmin } = require("../middleware/auth.middleware");
const router = require("express").Router();

router.get("/products", requireSignIn, productsController.getAllProduct);
router.get("/products/:id", requireSignIn, productsController.getProductById);
router.post("/products", requireSignIn, productsController.createProduct);
router.delete("/products/:id", requireSignIn, productsController.deleteProduct);

module.exports = router;
