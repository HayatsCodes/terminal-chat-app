const axios = require('axios');

module.exports = async (username) => {
    try {
        const response = await axios.get(`https://command-line-chat-app.onrender.com/auth/tokens/${username}`);
        const token = response.data
        return token;
    } catch(error) {
        console.error(error.response.data); 
    }
    
}