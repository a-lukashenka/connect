const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const dotenv =  require('dotenv');

const env = process.env;
const mode = env.PROD ? 'production' : 'development';
const devtool = env.PROD ? false : 'inline-source-map';
dotenv.config();
console.log({
    apiUrl: env.BASE_URL,
    production: env.PROD,
});
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
                        !env.PROD ? 'style-loader' : MiniCssExtractPlugin.loader,
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
            new LiveReloadPlugin(),
            new DefinePlugin({
                CONFIG: JSON.stringify({
                    apiUrl: env.BASE_URL,
                    production: env.PROD,
                }),
                PRODUCTION: JSON.stringify(env.PROD),
            }),
        ]
    }
];
