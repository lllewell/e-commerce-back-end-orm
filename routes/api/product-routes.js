const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
});

// get one product
router.get('/:id', (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {

    const product = await Product.create(req.body);
    if (req.body?.tagIds.length) {
      await product.setTags(req.body.tagIds);
      await product.save();
    }
    return res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
    const product = await Product.findbyPk(req.params.id);
    await product.update(req.body);
    if (req.body?.tagIds.length) {
      await product.setTags(req.body.tagIds);
    }
    return res.status(200).json(product);
    await product.save();
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
  // Product.update(req.body, {
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((product) => {
  //     if (req.body.tagIds && req.body.tagIds.length) {

  //       ProductTag.findAll({
  //         where: { product_id: req.params.id }
  //       }).then((productTags) => {
  //         // create filtered list of new tag_ids
  //         const productTagIds = productTags.map(({ tag_id }) => tag_id);
  //         const newProductTags = req.body.tagIds
  //           .filter((tag_id) => !productTagIds.includes(tag_id))
  //           .map((tag_id) => {
  //             return {
  //               product_id: req.params.id,
  //               tag_id,
  //             };
  //           });

  //         // figure out which ones to remove
  //         const productTagsToRemove = productTags
  //           .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  //           .map(({ id }) => id);
  //         // run both actions
  //         return Promise.all([
  //           ProductTag.destroy({ where: { id: productTagsToRemove } }),
  //           ProductTag.bulkCreate(newProductTags),
  //         ]);
  //       });
  //     }

  //     return res.json(product);
  //   })
  //   .catch((err) => {
  //     // console.log(err);
  //     res.status(400).json(err);
  //   });
});

router.delete('/:id', (req, res) => {
  // delete one product by its `id` value
});

module.exports = router;
