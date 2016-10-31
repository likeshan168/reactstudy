// var webpack = require('webpack');
// module.exports = {
//     entry: {
//         index: ['./src/index.js', './src/style.css'],
//         vendor: [
//             'react',
//             'react-dom'
//         ]
//     },
//     output: {
//         path: './dist',
//         filename: '[name].js',
//         publicPath: '/dist'
//     },
//     module: {
//         loaders: [{
//             test: /\.js$/,
//             exclude: /node_modules/,
//             loader: 'babel',
//             query: {
//                 presets: ['es2015', 'stage-0', 'react']
//             }
//         }, {
//             test: /\.css$/,
//             loader: 'style-loader!css-loader'
//         }]
//     },
//     plugins: [
//         new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
//         new webpack.HotModuleReplacementPlugin()
//     ],
//     devServer: {
//         hot: true,
//         inline: true
//     }
// }


var webpack = require('webpack');
const glob = require('glob');

var config = {
    entry: {
        vendor: ['react', 'react-dom','redux']
    },
    output: {
        path: __dirname + '/dist/js',
        filename: '[name].js'
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "eslint-loader",
                exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: { presets: ['es2015', 'stage-0', 'react'] }
            }
        ]
    },
    eslint:{
        configFile:'./.eslintrc'
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ]
};

var files = glob.sync('./src/js/*/index.js');
var newEntries = files.reduce(function (memo, file) {
    var name = /.*\/(.*?)\/index\.js/.exec(file)[1];
    memo[name] = entry(name);
    return memo;
}, {});

config.entry = Object.assign({}, config.entry, newEntries);
function entry(name) {
    return './src/js/' + name + '/index.js';
}

module.exports = config;