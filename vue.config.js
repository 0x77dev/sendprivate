module.exports = {
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/encrypt',
        '/decrypt',
        '/about'
      ],
      useRenderEvent: false,
      headless: true,
      onlyProduction: true
    }
  }
}
