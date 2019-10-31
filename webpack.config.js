const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {  
	entry: [ 
		'./src/index.js',
	],  
	output: {    
		path: path.resolve(__dirname, './dist'),
		filename: './js/main.js', 
		// publicPath: '/dist',
  },
  /* resolve: {
    alias: {
      src: path.resolve(__dirname, 'src')
    }
  }, */
	module: {  
		rules: [   
			{
				test: /\.scss$/,
				// use:  [  'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
				use: [{
					loader: 'style-loader',
			},	{
					loader: MiniCssExtractPlugin.loader,
			},
			 {
					loader: 'css-loader',
					options: {
						url: true,
					},
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: function () { // post css plugins, can be exported to postcss.config.js
            return [
              require('autoprefixer')
            ];
          }
        }
      },
			 {
					loader: 'sass-loader',
			}]
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
							publicPath: '../img/',
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
			filename: 'index.html',
			template: './src/pug/index.pug',
		}
		),
		new CopyWebpackPlugin([
			{ from: './src/img', to: './img' },
			{ from: './src/static', to: './img' },
    ]),
		new webpack.ProvidePlugin(
			{
			$: 'jquery',
			jQuery: 'jquery',
      'window.jQuery': 'jquery',
      noUiSlider: 'nouislider',
      'wNumb': 'wnumb'
		}
    ),
	]
};