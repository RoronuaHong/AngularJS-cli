const webpack = require("webpack");
const path = require("path");
const glob = require("glob");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/*遍历获取所有的html文件*/
const htmlPages = Object.keys(getEntry("./src/**/*.html", ""));

const distPath = path.join(__dirname, "dist");

//生成页面的title
const confTitle = [
    {
        name: "index",
        dir: "",
        title: "My AngularJS"
    }
];

/*设置入口文件*/
const config = {
    /*添加js入口*/
    entry: {
        index: "./src/js/index"
    },
    output: {
        publicPath: "",
        path: distPath,
        filename: "js/[name].[hash].bundle.js",
        chunkFilename: "js/[id].chunk.js"
    },
    resolve: {
        extensions: [".css", ".scss", ".js", ".png", ".jpg", ".jpeg", ".gif"]
    },
    module: {
        rules: [
            /*将ES6转换成ES5*/
            {
                test: /\.js$/,
                exclude: [
                    path.join(__dirname, "node_modules")
                ],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"],
                        plugins: [
                            "transform-runtime"
                        ]
                    }
                }
            },
            /*压缩css*/
            {
                test: /\.css$/,
                exclude: [
                    path.join(__dirname, "node_modules")
                ],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({
                                        browsers: [
                                            'Chrome >= 35',
                                            'Firefox >= 38',
                                            'Edge >= 12',
                                            'Explorer >= 10',
                                            'iOS >= 8',
                                            'Safari >= 8',
                                            'Android 2.3',
                                            'Android >= 4',
                                            'Opera >= 12'
                                        ],
                                        cascade: true,
                                        add: true,
                                        remove: true
                                    })
                                ]
                            }
                        }
                    ]
                })
            },
            /*压缩sass并转换为css*/
            {
                test: /\.scss$/,
                exclude: [
                    path.join(__dirname, "node_modules")
                ],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        // /*将px转换成rem*/
                        // {
                        //     loader: "webpack-px-to-rem",
                        //     query: {
                        //         // 1rem=npx 默认为 75
                        //         basePx: 75,
                        //         // 只会转换大于min的px 默认为0
                        //         // 因为很小的px（比如border的1px）转换为rem后在很小的设备上结果会小于1px，有的设备就会不显示
                        //         min: 1,
                        //         // 转换后的rem值保留的小数点后位数 默认为3
                        //         floatWidth: 2
                        //     }
                        // },
                        /*压缩css*/
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "sass-loader"
                        },
                        /*配置自动前缀*/
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: 'postcss',
                                plugins: [
                                    require('autoprefixer')({
                                        browsers: [
                                            'Chrome >= 35',
                                            'Firefox >= 38',
                                            'Edge >= 12',
                                            'Explorer >= 10',
                                            'iOS >= 8',
                                            'Safari >= 8',
                                            'Android 2.3',
                                            'Android >= 4',
                                            'Opera >= 12'
                                        ],
                                        cascade: true,
                                        add: true,
                                        remove: true
                                    })
                                ]
                            }
                        }
                    ],
                })
            },
            /*压缩图片*/
            {
                test: /\.(png|svg|jpg|gif|jpeg)$/,
                use: [
                    // "file-loader",
                    "url-loader?limit=8192&name=images/[name].[ext]",
                    "image-webpack-loader?{pngquant:{quality: '50-70', speed: 8}, mozjpeg: {quality: 50}}"
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            Angular: "_angular@1.5.11@angular"
        }),
        new ExtractTextPlugin({
            filename: "css/[name].[hash].bundle.css",
            allChunks: true
        })
    ]
}

module.exports = config;

//生成的html存放路径
htmlPages.forEach(pathname => {

    //将路径进行分割，使得生成的路径在dist根目录下, 必须使用\\, 防止生成的路径出错
    const resolvePath = pathname.split("src\\");

    let conf = {
        filename: resolvePath[1] + ".html",
        template: pathname + ".html",
        inject: true,
        minify: {
            removeComments: true,                   //移除注释
            collapseWhitespace: true                //删除空白符与换行符
        }
    }

    /*合并公共js代码*/
    const reg = /\/?(\w+)$/;
    const currentPath = (reg.exec(resolvePath[1]))[1];

    // const currentPath = resolvePath[1].split("\\")[resolvePath[1].split("\\").length - 1];
    // conf.chunks = ["vendor", "flexible", currentPath];
    conf.chunks = ["flexible", currentPath];

    for(let i in confTitle) {
        if ((confTitle[i].dir + confTitle[i].name) === resolvePath[1]) {
            conf.title = confTitle[i].title;
        }
    }

    //设置头部
    config.plugins.push(new HtmlWebpackPlugin(conf));
});

/*按文件名来获取入口文件(即需要生成的模板文件数量)*/
function getEntry(globPath, dirPath) {
    //匹配当前路径所得到的文件数组
    let files = glob.sync(globPath),
        entries = {},
        entry, dirname, basename, pathname, extname;

    for (let i = 0; i < files.length; i++) {
        entry = files[i];

        //返回所在路径的文件夹名称
        dirname = path.dirname(entry);

        //返回指定文件名的扩展名称
        extname = path.extname(entry);

        //返回制定的文件名, 返回结果可排除[ext]后缀字符串
        basename = path.basename(entry, extname);

        //格式化路径
        pathname = path.normalize(path.join(dirname, basename));

        //格式化路径
        dirPath = path.normalize(dirPath);

        if (pathname.startsWith(dirPath)) {
            pathname = pathname.substring(dirPath);
        }
        entries[pathname] = ["./" + entry];
    }

    return entries;
}