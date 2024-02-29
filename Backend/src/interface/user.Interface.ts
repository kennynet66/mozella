// Define the user details expected from the request body
export interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
}

// Define the login details expected from the request body
export interface login {
    email: string,
    password: string
}