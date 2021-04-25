const router = require("express").Router();
const Item = require("../models/itemModel");

router.post('/data', (req, res) => {
    const data = new Item(req.body)
    data.save().then(() => {
        res.status(201).send(data)
    }).catch((e) => {
        res.status(400).send(e)
    })
})

router.get('/data', async (req, res) => {
    try {
        const itemData = await Item.find()
        res.send(itemData)
    } catch (e) {
        res.send(e)
    }

})

module.exports = router;
