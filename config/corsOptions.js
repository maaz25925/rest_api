const { NO_CONTENT } = require('../config/status');

const whitelist = ['https://localhost:3000'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: NO_CONTENT.code,
};

module.exports = corsOptions;
