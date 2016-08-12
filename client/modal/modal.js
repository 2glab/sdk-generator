import { HTTP } from 'meteor/http'
import { Template } from 'meteor/templating'

Template.uiGenerateSDKModal.helpers({
    'languages' () {
        return languageList;
    }, 
    'linkValid' () {
        schema = new SimpleSchema({
        LinkToDocumentation: {
            type: String,
            optional: false
        }
    });
        return schema;
    }
});

Template.uiGenerateSDKModal.events({
    // Create POST request to swagger
    'click #download': function(event, template) {
        //Read selected language
        var selectedLanguage = template.find("[name=selectLanguageDropdown]").selectedOptions[0].value;

        //Read path to file
        var pathToFile = template.find("[name=LinkToDocumentation]").value;

        //Create URL to send request
        var url = "https://generator.swagger.io/api/gen/clients/" + selectedLanguage.toLowerCase();
        
        //Create post options
        var options = {
            "swaggerUrl": pathToFile
        };
        
        //Check empty value  
        if (pathToFile) {
            // POST request
            HTTP.post(url, { data: options }, function(error, result) { 
                if (error) {
                    console.log(error);
                    FlashMessages.sendError("Your document is incorrect. Please, try another.");
                } else {
                    var response = JSON.parse(result.content); 
                    window.location.href = response.link;
                } 
            });
        } else {
            //Or add class Error
            template.find("#block-with-link").setAttribute("class", "has-error");
        }
    },
    //After error message change focus to input again
    'focus #link-to-documentation': function() {
        template.find("#block-with-link").setAttribute("class", "");
    }  
});