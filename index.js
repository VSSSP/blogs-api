const express = require('express');
const usersRoutes = require('./routers/usersRoutes');

const app = express();

app.use('/user', usersRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('');
});
