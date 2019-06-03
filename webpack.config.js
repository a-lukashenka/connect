const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const autoPrefixer = require('autoprefixer');
const dotEnv =  require('dotenv');

const env = process.env;
const mode = env.PROD ? 'production' : 'development';
const devtool = env.PROD ? false : 'inline-source-map';
dotEnv.config();

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
                        'style-loader',
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoPrefixer({
                                        browsers:['ie >= 8', 'last 4 version']
                                    }),
                                ],
                                sourceMap: true,
                            }
                        },
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
        optimization: {
            minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
        },
        plugins: [
            new OptimizeCSSAssetsPlugin({
                cssProcessorPluginOptions: {
                    preset: ['default', {discardComments: {removeAll: true}}],
                }
            }),
            new LiveReloadPlugin(),
            new DefinePlugin({
                CONFIG: JSON.stringify({
                    apiUrl: env.API_URL,
                }),
            }),
        ]
    }
];
