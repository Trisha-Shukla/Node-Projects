import express from "express"
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Validation Middleware
app.post("/register", (req, res, next) => {
  const { firstName, lastName, password, email, phoneNumber } = req.body;

  try {
    // Validate First Name and Last Name
    const nameRegex = /^[A-Z][a-z]*$/;
    if (!nameRegex.test(firstName)) {
      throw new Error(
        "First Name must start with an uppercase letter and contain only alphabets."
      );
    }
    if (!nameRegex.test(lastName)) {
      throw new Error(
        "Last Name must start with an uppercase letter and contain only alphabets."
      );
    }

    // Validate Password
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must have at least 8 characters, including one uppercase letter, one special character, and one number."
      );
    }

    // Validate Email Address
    if (!email.includes("@")) {
      throw new Error("Email address must contain the '@' symbol.");
    }

    // Validate Phone Number
    if (!/^\d{10,}$/.test(phoneNumber)) {
      throw new Error("Phone number must have at least 10 digits.");
    }

    // If all validations pass
    res.status(200).json({ message: "User registration successful!" });
  } catch (error) {
    // Pass error to error handling middleware
    next(error);
  }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(400).json({ error: err.message });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
