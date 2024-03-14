const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");
const User = require("./Model/userModel");
const Usercontroller = require("./Controller/UserController");

// configure Google OAuth 2.0
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/api/v1/user/auth/google/callback",
            scope: ["profile", "email"],
        },
        async function (accessToken, refreshToken, profile, done) {
            try {
                // Check if the user already exists in your database
                let user = await User.findOne({ email: profile.email });

                // If the user doesn't exist, create a new user
                if (!user) {
                    // Call createUser controller to create a new user
                    await Usercontroller.createUser(profile, null, null);
                }

                // Call done() with the user object
                done(null, user);
            } catch (err) {
                console.error(err);
                done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
