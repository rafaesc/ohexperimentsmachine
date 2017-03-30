const path = require("path");
const fs = require('fs');
const webpack = require('webpack');

exports.minify = function(dropConsole) {
  return {
      
        
    plugins: [
        
        new webpack.optimize.UglifyJsPlugin({
            // Don't beautify output (enable for neater output)
            sourceMap: (dropConsole) ? false : true,
            beautify: false,
            comments: false,
            // Compression specific options
            compress: {
                warnings: false,

                // Drop `console` statements
                drop_console: dropConsole
            },

            // Mangling specific options
            mangle: {
                // Don't mangle $
                except: ['$', 'System', 'new','_','Vue', 'vue'],

                // Don't care about IE8
                screw_ie8 : true,

                // Don't mangle function names
                keep_fnames: true
            }
        })
    ]
  };
}
