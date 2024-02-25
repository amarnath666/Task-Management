import jwt from "jsonwebtoken";

// Middleware to verify the authenticity of a JSON Web Token (JWT)
export const verifyToken = async (req, res, next) => {
    try {
          // Retrieve the token from the Authorization header
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

         // If the token starts with "Bearer", remove it to get the actual token
        if (token.startsWith("Bearer")){
            token = token.slice(7, token.length).trimLeft();
        }

        // Verify the token using the secret key
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the verified user information to the request object
        req.user = verified;
        
        next();
        } catch (err) {
        res.status(500).json({ error: err.message })
    }
}