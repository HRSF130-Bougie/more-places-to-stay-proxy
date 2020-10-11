const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(cors());
app.use(morgan('dev'));

app.use(express.static('public'));


app.use('/listing', createProxyMiddleware({target:'http://54.67.5.9/', changeOrigin: true}));
app.use('/favorites', createProxyMiddleware({target:'http://54.67.5.9/', changeOrigin: true}));
app.use('/api/booking/listing/', createProxyMiddleware({target:'http://3.101.63.34', changeOrigin: true}));
// app.use('/api/booking/listing/:reservations', createProxyMiddleware({target:'http://localhost:3002', changeOrigin: true}));
app.use('/api/reviews/:id', createProxyMiddleware({target:'http://54.67.90.25/', changeOrigin: true}));
app.use('/api/more-places', createProxyMiddleware({target:'http://13.57.209.191/', changeOrigin: true}));

app.listen(port, () => {
  console.log(`Proxy listening at http://localhost:${port}`)
})