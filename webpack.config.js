const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

const isProduction = process.env.NODE_ENV === 'prod';
const mode = isProduction ? 'production' : 'development';
const devtool = isProduction ? false : 'inline-source-map';
module.exports = [
    {
        entry: './src/main.ts',
        target: 'node',
        mode,
        devtool,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: ["/environment/", "/node_modules/"]
                },
                {
                    test: [/.css$|.scss$/],
                    use: [
                        process.env.NODE_ENV == 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                minimize: true,
                            },
                        }
                    ]
                }
            ]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },

        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/dist/'
        },
        node: {
            __dirname: false,
            __filename: false,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                }
            }),
            new LiveReloadPlugin()
        ]
    }
];
