const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);