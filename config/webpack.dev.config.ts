import * as merge from 'webpack-merge'
import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'

import commonConfig from './webpack.common.config'

const config: webpack.Configuration = merge(commonConfig, {
    mode: 'development',
    entry: {
        app: ['webpack-hot-middleware/client?path=/__webpack_hmr', './src/index.tsx', 'whatwg-fetch']
    },
    output: {
        path: path.join(__dirname, '..', '/dist'),
        filename: 'bundle.js',
        chunkFilename: '[name].bundle.js',
        publicPath: '/'
    },
    resolve: {
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new BundleAnalyzerPlugin({
            openAnalyzer: false
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
})

export default config
