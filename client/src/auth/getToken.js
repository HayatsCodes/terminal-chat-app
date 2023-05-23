const axios = require('axios');

module.exports = async (username) => {
    try {
        const response = await axios.get(`https://terminal-chat-app-production.up.railway.app/auth/tokens/${username}`);
        const token = response.data
        return token;
    } catch(error) {
        console.error(error.response.data); 
    }
    
}