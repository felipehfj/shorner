const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '.env.' + process.env.NODE_ENV)
});

export default {
    NODE_ENV: process.env.NODE_ENV || 'production',
    PORT: process.env.PORT || 3333
}