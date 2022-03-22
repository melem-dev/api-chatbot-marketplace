const router = require("express").Router();
const _Products = require("../controllers/products.controller");
const _Options = require("../controllers/options.controller");

router.post("/products", _Products.create);
router.get("/products", _Products.read);
router.put("/products/search/:id", _Products.update);
router.get("/products/search/:id", _Products.details);
router.delete("/products/search/:id", _Products.exclude);

router.post("/products/options", _Options.create);
router.get("/products/options", _Options.read);

router.get("/products/item", _Products.items);

module.exports = router;
