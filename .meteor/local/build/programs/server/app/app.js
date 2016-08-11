var require = meteorInstall({"collection":{"languages.js":function(){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// collection/languages.js                                                  //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
languageList = ['JavaScript', 'Python', 'Java', 'Ruby'];                    // 1
//////////////////////////////////////////////////////////////////////////////

}},"server":{"main.js":["meteor/meteor",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////
//                                                                          //
// server/main.js                                                           //
//                                                                          //
//////////////////////////////////////////////////////////////////////////////
                                                                            //
var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});
                                                                            //
Meteor.startup(function () {                                                // 3
  // code to run on server at startup                                       //
});                                                                         // 5
//////////////////////////////////////////////////////////////////////////////

}]}},{"extensions":[".js",".json"]});
require("./collection/languages.js");
require("./server/main.js");
//# sourceMappingURL=app.js.map
