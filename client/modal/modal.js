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
        type: String,
        label: 'Link to documentation'
      }
    });
    return sdkSchema;
  }
});

AutoForm.addHooks('downloadSDK', {
  onSubmit: function (formValues) {
    event.preventDefault();

        // Create URL to send request
    let url = 'https://generator.swagger.io/api/gen/clients/' + formValues.selectLanguage.toLowerCase();

        // Create POST options
    let options = {
      'swaggerUrl': formValues.linkToDocumentation
    };

        // Create POST request
    HTTP.post(url, { data: options }, function (error, result) {
      var response = JSON.parse(result.content);
      if (result.statusCode === 200) {
                // var response = JSON.parse(result.content);
        $('.modal').modal('hide');
        window.location.href = response.link;
      } else {
        FlashMessages.sendError(response.message);
        $('button').removeAttr('disabled');
      }
    }
        );
  }
});

FlashMessages.configure({
  // Configuration for FlashMessages.
  autoHide: true,
  hideDelay: 5000,
  autoScroll: false
});
