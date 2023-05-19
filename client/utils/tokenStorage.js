// tokenStorage.js

const fs = require('fs');
const path = require('path');

const TOKEN_FILE_PATH = path.join(__dirname, 'token.txt');

// Function to store the token in a file
async function storeToken(token) {
    try {
        await fs.writeFileSync(TOKEN_FILE_PATH, token);
    } catch (error) {
        console.error('Failed to store token:', error);
    }
}

// Function to retrieve the token from the file
function retrieveToken() {
    try {
        const token = fs.readFileSync(TOKEN_FILE_PATH, 'utf8');
        return token;
    } catch (error) {
        console.error('Failed to retrieve token:', error);
        return null;
    }
}

module.exports = { storeToken, retrieveToken };