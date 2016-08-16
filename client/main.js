import { Template } from 'meteor/templating';
import './main.html';

Template.body.events({
  'click button' (event, instance) {
    // Show to modal form
    Modal.show('uiGenerateSDKModal');
  }
});
