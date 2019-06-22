const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');




module.exports = {  
	entry: [ 
		'./src/index.js',
	],  
	output: {    
		path: path.resolve(__dirname, './dist'),
		filename: './js/main.js', 
	},
	module: {  
		rules: [   
			{
				test: /\.scss$/,
				use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.pug$/,
				loader: 'pug-loader',
				options: {
					pretty: true,
				},
			},
			{
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
							name: '[name].[ext]',
							outputPath: './img',
            },
          },
				],
				exclude: [/fonts/],
			},
			{
        test: /\.(eot|svg|ttf|woff)$/,
        use: [
          {
						loader: 'file-loader',
            options: {
							publicPath: '../fonts/',
							name: '[name].[ext]',
							outputPath: './fonts',
						},
          },
        ],
      },    
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin(
			{
			filename: 'css/style.css',
		}
		),
		new HtmlWebpackPlugin(
			{
			//filename: './html/index.html',
			filename: 'index.html',
			template: './src/pug/index.pug',
		}
		),
		new webpack.ProvidePlugin(
			{
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}
		),
	]
};