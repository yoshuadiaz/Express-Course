const express = require('express')
const router = express.Router()
const ProductService = require('../../services/products')

const productsService = new ProductService()

router.get('/', async function (req, res, next) {
  const {
    tags
  } = req.query

  try {
    const products = await productsService.getProducts({
      tags
    }) || []

    res.status(200).json({
      data: products,
      message: 'products listed'
    })
  } catch (error) {
    next(error)
  }
})

router.get('/:productId', async function (req, res, next) {
  try {
    const {
      productId
    } = req.params
    const product = await productsService.getProduct(productId)
    res.status(200).json({
      data: product,
      message: 'product retrieve'
    })
  } catch (error) {
    next(error)
  }
})

router.post('/', async function (req, res, next) {
  try {
    const {
      body: product
    } = req
    const newProduct = await productsService.createProduct({
      product
    })
    res.status(201).json({
      data: newProduct,
      message: 'products listed'
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:productId', async function (req, res, next) {
  try {
    const {
      productId
    } = req.params
    const {
      body: product
    } = req

    const productUpdated = await productsService.updateProduct({
      productId,
      product
    })

    res.status(200).json({
      data: productUpdated,
      message: 'product updated'
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:productId', async function (req, res, next) {
  try {
    const {
      productId
    } = req.params

    const productDeleted = await productsService.deleteProduct(productId)
    res.status(200).json({
      data: productDeleted,
      message: 'product deleted'
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
