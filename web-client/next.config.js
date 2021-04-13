module.exports = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        "js-cookie": 'empty'
      }
    }

    return config
  }
}
