const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    attributes: [
      "id",
      "category_name"
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

// get one category
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  Category.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      "id",
      "category_name"
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
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No categories found with that id!" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// create a category
router.post('/', (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      category_name: "Toys"
    }
  */
  Category.create({
    category_name: req.body.category_name
  })
    .then(dbCategoryData => res.json(dbCategoryData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// update a category
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: "No categories found with that id!" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// delete a category
router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
