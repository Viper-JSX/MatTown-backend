class UserController {
    getUser (req, res) {
        res.json({ message: "Getting user", id: req.params.id });
    }

    getFollowers (req, res) {
        res.json({ message: "Getting folllowers", id: req.params.id });
    }

    subscribe (req, res) {
        //console.log("Getting user folllowers", req.params.id);
        res.json({ message: "Subscribing" });
    }
}

export default new UserController