const BasicAuth = (req, res, next) => {
  const {
    name,
    email,
    password,
    postalcode,
    contact,
    country,
    street,
    city,
    state,
  } = req.body;

  // Check if all required fields are present
  if (
    !name ||
    !email ||
    !password ||
    !postalcode ||
    !contact ||
    !country ||
    !street ||
    !city ||
    !state
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Validate email format using a regular expression
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  const mobileRegex = /^\d{10}$/;
  if (!mobileRegex.test(contact)) {
    return res.status(400).json({
      error:
        "Mobile number should be of 10 digits and Enter mobile number without country code.",
    });
  }

  // Validate password complexity (at least 8
  // characters, numbers, and special characters)
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error: `Password must be at least 8 characters 
        long and contain at least one letter, one number,
         and one special character`,
    });
  }
  // Validate postal code format
  const postalCodeRegex = /^\d{6}$/;
  if (!postalCodeRegex.test(postalcode)) {
    return res.status(400).json({ error: "Invalid postal code format" });
  }
  next();
};
module.exports = { BasicAuth };
