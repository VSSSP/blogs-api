const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes = require('./routers/usersRoutes');
const loginRouter = require('./routers/loginRouter');
const categoriesRouter = require('./routers/categoryRoutes');
const postRoutes = require('./routers/postRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/user', usersRoutes);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postRoutes);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send('');
});
