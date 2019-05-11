var express = require('express');
var router = express.Router();
var models = require('../models');

module.exports = function(app){


  app.get('/inventory', function (req, res) {
    models.Products
        .findAll()
        .then(products => {
            // res.render('shop/index', {title: 'Express', products: products});
            res.json(products)
        })
        .catch(err => {
            console.log(err.message)
        });

});

app.get('/shopping-cart', function (req, res) {
    models.ProductCart.findAll({
        where: {
            cartId: "models.cart.id",
        },
        include: [{
            model: models.Products,
            as: 'product'
        }]
    })
        .then(productCart => {
            productsCart = productCart;
            return res.render('shop/shopping-cart',
                {
                    totalPrice: totalPrice,
                    productsCart: productsCart
                })
        })
        .catch(err => {
            console.log('ERROR:', err);
            return res.redirect('/');
        });
});

app.get('/add-to-cart/:id', async function (req, res) {

    var productId = req.params.id;
    var userId = req.user.id;
    var productsCart = [];
    var totalPrice = 0;
    try {
        
        var product = await models.Products.findById(productId);
        var cart = await models.Cart.findOne({
            where: {
                UserId: req.user.id
            }
        });
        if (cart === null) {
            var newCart = await models.Cart
                .build({
                    UserId: userId,
                    totalPrice: product.price,
                    totalQty: 1
                })
                .save();

            var productCart = await models.ProductCart.build({
                cartId: newCart.id,
                productId: productId,
                totalPrice: product.price,
                totalQty: 1
            })
                .save();
            await productsCart.push(productCart)
        }

        if (cart !== null) {
            totalPrice = cart.totalPrice;
            var productCart = await models.ProductCart.findOne({
                where: {
                    cartId: cart.id,
                    productId: product.id
                }
            });
            if (productCart === null) {
                await models.ProductCart.build({
                    cartId: cart.id,
                    productId: product.id,
                    totalPrice: product.price,
                    totalQty: 1
                }).save();
            } else {
                await productCart.update({
                    totalQty: productCart.totalQty + 1
                });
            }

            productsCart = await models.ProductCart.findAll({
                where: {
                    cartId: cart.id,
                },
                include: [{
                    model: models.Products,
                    as: 'product'
                }]
            });
        }
        return await res.render('shop/shopping-cart',
            {
                totalPrice: totalPrice,
                productsCart: productsCart
            });
    } catch (err) {
        console.log('Http error', err);
        return res.status(500).send();
    }


});



}
