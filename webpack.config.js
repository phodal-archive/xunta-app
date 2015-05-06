var webpack = require('webpack');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var config = require('./build.configs.js');
module.exports = {
    context: __dirname + '/src',
    watch: false,
    entry: './index.jsx',
    output: {
        path: __dirname + '/' + config.targetDirectory + '/www/js',
        filename: 'bundle.js',
        publicPath: '/',
        chunkFilename: '[chunkhash].js'
    },
    resolve: {
        root: [
            __dirname + '/assets-src/bower/', 
            __dirname +'/node_modules/'
        ],
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['assets-src/bower', 'node_modules'],
        alias: {'snapjs': __dirname + '/assets-src/bower/snapjs/snap.js'}
    },
    module: {
        loaders: [{ test: /\.jsx$/, loaders: ['jsx'] }],
        noParse: /\.min\.js/
    },
    externals: {

    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
    };
