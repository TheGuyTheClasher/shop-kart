import express from "express";
import data from './data.js'

const app = express();
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Hello world!')
});

app.get('/api/products', (req, res) => {
    // console.log(req)
    res.send(data.products)
});

app.get(`/api/products/slug/:slug`, (req, res) => {
    const product = data.products.find(product => product.slug == req.params.slug)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product Not Found' })
    }
})

app.get('/api/products/:id', (req, res) => {
    // console.log(req.params)
    const product = data.products.find((product) => product._id == req.params.id);
    console.log(product)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found.' })
    }
})

app.listen(port, () => {
    console.log(`server started on port ${port}`)
});


