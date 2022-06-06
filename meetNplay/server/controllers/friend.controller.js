const createFriend = (req, res) => {
    Friend.init().then(() => Friend.create(req.body))
    .then((newFriend) => {
        res.status(201).json({newFriend})
    }).catch(err => {
        res.status(500).json({err});
        console.log(err);
    })
}
module.exports = {
    createFriend
}