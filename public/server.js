const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');


const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors());
app.use(morgan('dev'));
// app.use('/', express.static(path.join(__dirname, 'public')))
app.use(express.static('public'));
// app.use(express.static('client'))

app.use('/listing', createProxyMiddleware({target:'http://localhost:3001', changeOrigin: true}));
app.use('/favorites', createProxyMiddleware({target:'http://localhost:3001', changeOrigin: true}));
app.use('/api/booking/listing/:listingId', createProxyMiddleware({target:'http://localhost:3002', changeOrigin: true}));
// app.use('/api/booking/listing/:reservations', createProxyMiddleware({target:'http://localhost:3002', changeOrigin: true}));
app.use('/api/reviews/:id', createProxyMiddleware({target:'http://localhost:3003', changeOrigin: true}));
app.use('/api/more-places', createProxyMiddleware({target:'http://localhost:3004', changeOrigin: true}));

// app.get('/', (req, res) => {
//   res.send('Hello World from Jacob proxy!')
// })

app.listen(port, () => {
  console.log(`Proxy listening at http://localhost:${port}`)
})