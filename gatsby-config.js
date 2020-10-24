module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-chakra-ui',
      options: {
        isUsingColorMode: false
      }
    },
    {
      resolve: 'gatsby-source-apiserver',
      options: {
        url: 'https://www.googleapis.com/webfonts/v1/webfonts',
        params: {
          sort: 'popularity',
          key: process.env.GOOGLE_API_KEY
        },
        name: 'webfont',
        entityLevel: 'items'
      }
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        defaultLayouts: {
          default: require.resolve('./src/components/App')
        }
      }
    }
  ]
};
