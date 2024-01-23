export const validateSignup = (values) => {
  const { username, email, password } = values;
  if (username === "" || email === "" || password === "") {
    throw new Error("Please fill in all fields");
  }
  if (username.length < 4) {
    throw new Error("Username must be at least 4 characters");
  }
  if (password.length < 8) {
    throw new Error("Password must be at least 8 characters");
  }
  const re = /\S+@\S+\.\S+/;
  const isEmail = re.test(email);
  if (!isEmail) {
    throw new Error("Please enter a valid email");
  }
};
export const validateLogin = (values) => {
  const { email, password } = values;
  if (email === "" || password === "") {
    throw new Error("Please fill in all fields");
  }
  const re = /\S+@\S+\.\S+/;
  const isEmail = re.test(email);
  if (!isEmail) {
    throw new Error("Please enter a valid email");
  }
};

export const validateUpdate = (values, user) => {
  const { username, email, phone, name } = values;

  if (name === "" || username === "" || email === "" || phone === "") {
    throw new Error("Please fill in all fields");
  }
  const userChanged = Object.keys(values).some((key) => {
    if (key === "updatedAt") return false;
    if (key === "createdAt") return false;
    if (key === "id") return false;
    if (key === "_id") return false;
    return values[key] !== user[key];
  });
  if (!userChanged) {
    throw new Error("You have not made any changes");
  }
  if (username.length < 4) {
    throw new Error("Username must be at least 4 characters");
  }
  // validate phone number
  const re1 = /^\d{10}$/;
  const isPhone = re1.test(phone);
  if (!isPhone) {
    throw new Error("Please enter a valid phone number");
  }
  const re = /\S+@\S+\.\S+/;
  const isEmail = re.test(email);
  if (!isEmail) {
    throw new Error("Please enter a valid email");
  }
};
export const validateFoodPreferences = (values, user) => {
  if (values === null) throw new Error("Empty food preferences");
  if (user === null) throw new Error("User not found");
};
