const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags
router.get('/', (req, res) => {
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: [
      "id",
      "tag_name"
    ],
    include: [
      {
        model: Product,
        attributes: [
          "id",
          "product_name",
          "price",
          "stock",
          "category_id"
        ]
      }
    ]
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

// find a single tag
router.get('/:id', (req, res) => {
  // be sure to include its associated Product data
});

// create a new tag
router.post('/', (req, res) => {

});

// update a tag's name
router.put('/:id', (req, res) => {

});

// delete a tag
router.delete('/:id', (req, res) => {

});

module.exports = router;
