const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const autoPrefixer = require('autoprefixer');
const dotEnv = require('dotenv');

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
                                        browsers: ['ie >= 8', 'last 4 version']
                                    }),
                                ],
                                sourceMap: false,
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
            filename: 'via_chat.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/dist/'
        },
        node: {
            __dirname: false,
            __filename: false,
        },
        plugins: [
            new LiveReloadPlugin(),
            new DefinePlugin({
                CONFIG: JSON.stringify({
                    apiUrl: env.API_URL,
                    s3Url: env.S3_URL,
                    prod: env.PROD,
                }),
            }),
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                sourceMap: false,
            }),
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
            }),
            new OptimizeCSSAssetsPlugin({}),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.optimize\.css$|.scss$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true,
            }),
        ]
    }
];
