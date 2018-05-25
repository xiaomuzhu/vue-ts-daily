const path = require('path')
const fs = require('fs')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
    lintOnSave: false,
    pwa: {
        name: 'My App',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',

        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            // swSrc is required in InjectManifest mode.
            swSrc: 'src/sw.js',
            // ...other Workbox options...
        }
    },
    configureWebpack(config) {
        if (process.env.NODE_ENV !== 'production') return;
        return {
            plugins: [
                new PrerenderSPAPlugin({
                    // Required - The path to the webpack-outputted app to prerender.
                    staticDir: path.join(__dirname, 'dist'),
                    // Required - Routes to render.
                    routes: ['/', '/habit', '/setting'],
                }),
            ],
        }
    },
}