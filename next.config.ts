const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  output: 'export',
  basePath: isProd ? '/my-portofolio' : '', 
  trailingSlash: true,
};
