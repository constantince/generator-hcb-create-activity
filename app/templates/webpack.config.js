const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
var glob = require('glob');
const env = process.env.NODE_ENV;
const isProd = env === 'production';

const proxyLink = {
    'production': '<%=proDomain%>',
    'development': '<%=testDomain%>',
    'none': '<%=localDomain%>'
}
var getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/html/${name}.html`,
        filename: `${name}.html`,
        inject: true,
        hash: false,
        chunks: [name]
    }
}

var getHtmlConfig = function (name, chunks) {
    return {
        template: `./src/html/${name}.html`,
        filename: `${name}.html`,
        inject: true,
        hash: false,
        chunks: [name]
    }
}

function getEntry() {
    var entry = {};
    //读取src目录所有page入口 
    glob.sync('./src/js/*.js').forEach(function (name) {
        var start = name.indexOf('js/');
        var end = name.length - 3;
        var eArr = [];
        var n = name.slice(start, end);
        n = n.split('/')[1];
        eArr.push(name);
        eArr.push('babel-polyfill');
        entry[n] = eArr;
    })
    return entry;
}

module.exports = {
    mode: env,//development|production|none
    entry: getEntry(),
    output: {
        path: path.resolve(__dirname, '<%=project%>'),
        filename: isProd ? '[name].[hash].js' : '[name].js',
        chunkFilename: '[name].bundle.js'//输出thunk文件配置项目

    },
    module: {
        rules: [
            {
                test: /\.(c|sc)ss$/,
                use: [!isProd ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }, //按数组顺序编译 style-loader, css-loader
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            {
                test: /\.(htm|html)$/i,
                loader: 'html-withimg-loader'
            }
        ]
    },
    devtool: "source-map",//用源文件调试
    devServer: {
        contentBase: './<%=project%>/', //告诉dev 在哪里查找更新的文件
        port: 9000,
        hot: true,
		host: '<%=host%>',
        proxy: {
            '<%=prefix%>': {
              target: proxyLink[env],
              pathRewrite: { '^<%=prefix%>': '' },
              changeOrigin: true
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(['<%=project%>']),

        new MiniCssExtractPlugin({//将css文件与js文件分离
            filename: "[name].css", //打包文件名称
            disable: !isProd
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()//模块热加载

    ]

};

var entryObj = getEntry(); 

var htmlArray = []; 
Object.keys(entryObj).forEach(function (element) {
    htmlArray.push({
        _html: element, title: '', chunks: [element]
    })
}) //自动生成html模板 
htmlArray.forEach(function (element) {
    module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
})
