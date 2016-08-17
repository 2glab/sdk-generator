import { HTTP } from 'meteor/http';
import { Template } from 'meteor/templating';

Template.uiGenerateSDKModal.helpers({
    // List of popular languages
  'languages' () {
    return languageList;
  },
    // Schema for modal form
  'generateSDK' () {
    var sdkSchema = new SimpleSchema({
      selectLanguage: {
        type: String,
        allowedValues: languageList,
        autoform: {
          afFieldInput: {
            firstOption: '(Language)'
          }
        }
      },
      linkToDocumentation: {
        type: String
      }
    });
    return sdkSchema;
  }
});

AutoForm.addHooks('downloadSDK', {
  onSubmit: function (formValues) {
    // Prevent form from submitting
    this.event.preventDefault();

    // Create URL to send request
    let url = 'https://generator.swagger.io/api/gen/clients/' + formValues.selectLanguage.toLowerCase();

    // Create POST options
    let options = {
      'swaggerUrl': formValues.linkToDocumentation
    };

    // Create and send POST request
    HTTP.post(url, { data: options }, function (error, result) {
      // Get information from Swagger API response
      var response = JSON.parse(result.content);

      if (result.statusCode === 200) {
        $('.modal').modal('hide');
        
        // Go to link and download file
        window.location.href = response.link;
      } else {
        $('button').removeAttr('disabled');

        // Otherwise show an error message
        FlashMessages.sendError(response.message);
      }
    });
  }
});

FlashMessages.configure({
  // Configuration for FlashMessages.
  autoHide: true,
  hideDelay: 5000,
  autoScroll: false
});
