function HtmlCompilerWatcher(options, callback) {
  this.options = options;
  this.callback = callback;
  // Configure your plugin with options...
}

HtmlCompilerWatcher.prototype.apply = function(compiler) {
  compiler.plugin('compilation', compilation => {
    // console.log('compilation: ', compilation);
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlPluginData, callback) => {
      // console.log('[HTML COMPILER : BEFORE PROCESSING] ', htmlPluginData);
      console.log(htmlPluginData);
      this.callback(htmlPluginData.html)
    });
    // compilation.plugin('html-webpack-plugin-before-html-generation', (htmlPluginData, callback) => {
    //   console.log('[HTML COMPILER : BEFORE GENERATION] ', htmlPluginData);
    //   callback();
    // });
    // compilation.plugin('html-webpack-plugin-after-html-processing', (htmlPluginData, callback) => {
    //   console.log('[HTML COMPILER : AFTER PROCESSING] ', htmlPluginData);
    //   callback();
    // });
    // compilation.plugin('html-webpack-plugin-after-emit', (htmlPluginData, callback) => {
    //   console.log('[HTML COMPILER : AFTER EMIT] : ', htmlPluginData.html.source);
    //   callback();
    // });
  });
};

module.exports = HtmlCompilerWatcher;
