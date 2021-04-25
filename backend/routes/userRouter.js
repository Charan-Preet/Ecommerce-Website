const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const User = require("../models/userModel");


router.post("/register", async (req, res) => {
    try {
        const { email, password, passwordVerify } = req.body;

        // validation

        if (!email || !password || !passwordVerify)
            return res.status(400).json({ msg: "Not all field have been entered." });
        if (password !== passwordVerify)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification." });
        if (password.length < 6)
            return res
                .status(400)
                .json({ msg: "The password need to be atleast 5 character long" });
        if (password !== passwordVerify)
            return res
                .status(400)
                .json({ msg: "Enter the same password twice for verification" });

        const existingUser = await User.findOne({ email: email });
        if (existingUser)
            return res
                .status(400)
                .json({ msg: "An account with this email already exists." });

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        // save a new user account to the db

        const newUser = new User({
            email: email,
            passwordHash: passwordHash,
        })
        const savedUser = await newUser.save()

        //sign the token

        const token = jwt.sign(
            {
                user: savedUser._id,
            },
            process.env.JWT_SECRET
        );
        // send the token in a HTTP-only cookie
        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            .send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// log in

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // validate

        if (!email || !password)
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields." });

        const existingUser = await User.findOne({ email });
        if (!existingUser)
            return res.status(401).json({ errorMessage: "Wrong email or password." });

        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );
        if (!passwordCorrect)
            return res.status(401).json({ errorMessage: "Wrong email or password." });

        // sign the token

        const token = jwt.sign(
            {
                user: existingUser._id,
            },
            process.env.JWT_SECRET
        );

        // send the token in a HTTP-only cookie

        res
            .cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            .send();
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
});

router.get("/logout", (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
  });

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.json(false);

        jwt.verify(token, process.env.JWT_SECRET);
        res.send(true);
    } catch (err) {
        res.json(false);
    }
});

module.exports = router;

