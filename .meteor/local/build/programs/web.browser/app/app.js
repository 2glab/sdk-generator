var require = meteorInstall({"client":{"modal":{"template.modal.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/modal/template.modal.js                                                                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.__checkName("uiGenerateSDKModal");                                                                        // 2
Template["uiGenerateSDKModal"] = new Template("Template.uiGenerateSDKModal", (function() {                         // 3
  var view = this;                                                                                                 // 4
  return [ HTML.DIV({                                                                                              // 5
    "class": "modal fade"                                                                                          // 6
  }, "\n  ", HTML.DIV({                                                                                            // 7
    "class": "modal-dialog",                                                                                       // 8
    role: "document"                                                                                               // 9
  }, "\n    ", HTML.DIV({                                                                                          // 10
    "class": "modal-content"                                                                                       // 11
  }, "\n      ", HTML.Raw('<div class="modal-header">\n        <h4 class="modal-title">Generate SDK from YAML file</h4>\n      </div>'), "\n      ", HTML.DIV({
    "class": "modal-body"                                                                                          // 13
  }, "\n        ", HTML.Raw("<legend>\n          <p>Select language</p>\n        </legend>"), "\n          ", HTML.DIV({
    "class": "select-language"                                                                                     // 15
  }, "    \n            ", HTML.SELECT({                                                                           // 16
    "class": "form-control",                                                                                       // 17
    name: "selectLanguageDropdown"                                                                                 // 18
  }, "\n            ", Blaze.Each(function() {                                                                     // 19
    return {                                                                                                       // 20
      _sequence: Spacebars.call(view.lookup("languages")),                                                         // 21
      _variable: "lang"                                                                                            // 22
    };                                                                                                             // 23
  }, function() {                                                                                                  // 24
    return [ "\n            ", HTML.OPTION(Blaze.View("lookup:lang", function() {                                  // 25
      return Spacebars.mustache(view.lookup("lang"));                                                              // 26
    })), "\n            " ];                                                                                       // 27
  }), "\n            "), "\n          "), "\n\n        ", HTML.Raw("<legend>\n          <p>Add link to your documentation</p>\n        </legend>"), "\n          ", HTML.Raw('<input class="form-control" type="text" name="linkToDocumantation" placeholder="Link to documantation">'), "\n        \n      "), "\n      ", HTML.Raw('<div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="button" class="btn btn-primary" id="download">Download</button>\n      </div>'), "\n    "), HTML.Raw("<!-- /.modal-content -->"), "\n  "), HTML.Raw("<!-- /.modal-dialog -->"), "\n"), HTML.Raw("<!-- /.modal -->") ];
}));                                                                                                               // 29
                                                                                                                   // 30
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"modal.js":["meteor/http","meteor/templating",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/modal/modal.js                                                                                           //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var HTTP;module.import('meteor/http',{"HTTP":function(v){HTTP=v}});var Template;module.import('meteor/templating',{"Template":function(v){Template=v}});
                                                                                                                   // 2
                                                                                                                   //
Template.uiGenerateSDKModal.helpers({                                                                              // 4
    'languages': function () {                                                                                     // 5
        function languages() {                                                                                     // 4
            return languageList;                                                                                   // 6
        }                                                                                                          // 7
                                                                                                                   //
        return languages;                                                                                          // 4
    }()                                                                                                            // 4
});                                                                                                                // 4
                                                                                                                   //
Template.uiGenerateSDKModal.events({                                                                               // 10
    // Create POST request to swagger                                                                              //
    'click #download': function () {                                                                               // 12
        function clickDownload(event, template) {                                                                  // 12
            //Read selected language                                                                               //
            var selectedLanguage = template.find("[name=selectLanguageDropdown]").selectedOptions[0].value;        // 14
                                                                                                                   //
            //Read path to file                                                                                    //
            var pathToFile = template.find("[name=linkToDocumantation]").value;                                    // 17
                                                                                                                   //
            //Create URL to send request                                                                           //
            var url = "https://generator.swagger.io/api/gen/clients/" + selectedLanguage.toLowerCase();            // 20
                                                                                                                   //
            //Create post options                                                                                  //
            var options = {                                                                                        // 23
                "swaggerUrl": pathToFile                                                                           // 24
            };                                                                                                     // 23
                                                                                                                   //
            // POST request                                                                                        //
            HTTP.post(url, { data: options }, function (err, result) {                                             // 28
                var response = JSON.parse(result.content);                                                         // 29
                window.location.href = response.link;                                                              // 30
            });                                                                                                    // 31
        }                                                                                                          // 32
                                                                                                                   //
        return clickDownload;                                                                                      // 12
    }()                                                                                                            // 12
});                                                                                                                // 10
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"main.html":["./template.main.js",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/main.html                                                                                                //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
module.exports = require("./template.main.js");                                                                    // 1
                                                                                                                   // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}],"template.main.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/template.main.js                                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
                                                                                                                   // 1
Template.body.addContent((function() {                                                                             // 2
  var view = this;                                                                                                 // 3
  return HTML.Raw('<div class="container">\n   <h1>Welcome to board</h1>\n  <button class="btn btn-defaut" id="sdk-generate"> SDK Generator</button>\n </div>');
}));                                                                                                               // 5
Meteor.startup(Template.body.renderToDocument);                                                                    // 6
                                                                                                                   // 7
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":["meteor/templating","./main.html",function(require,exports,module){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// client/main.js                                                                                                  //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
var Template;module.import('meteor/templating',{"Template":function(v){Template=v}});module.import('./main.html');
                                                                                                                   // 2
                                                                                                                   //
Template.body.events({                                                                                             // 4
  'click button': function () {                                                                                    // 5
    function clickButton(event, instance) {                                                                        // 4
      //Show to modal form                                                                                         //
      Modal.show('uiGenerateSDKModal');                                                                            // 7
    }                                                                                                              // 8
                                                                                                                   //
    return clickButton;                                                                                            // 4
  }()                                                                                                              // 4
});                                                                                                                // 4
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}]},"collection":{"languages.js":function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                 //
// collection/languages.js                                                                                         //
//                                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                   //
languageList = ['JavaScript', 'Python', 'Java', 'Ruby'];                                                           // 1
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/modal/template.modal.js");
require("./client/template.main.js");
require("./client/modal/modal.js");
require("./collection/languages.js");
require("./client/main.js");