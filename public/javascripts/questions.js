"use strict";
$(document).ready(function(){

  var pathname = window.location.pathname;
  var questionsContainer = $('.question-set-list ul');
  var newQuestionBtn = $('.new-question');
  var addQuestionBtn = $('#question-add');
  var removeQuestionBtn = $('.question-remove');
  var newQuestionContainer = $('.new-question-container');
  var removeButtonHTML = "<button type=\"button\" class=\"btn btn-xs btn-danger question-remove\">Remove</button>";

  setEventHandlers();

  function showQuestionSelector(){
    newQuestionContainer.show();
    newQuestionBtn.hide();
  }

  function addQuestion(){
    var selectedQuestion = $('#new-question-select option:selected');
    var questionTitle = selectedQuestion.text();
    var questionID = selectedQuestion.val();
    var hiddenInputField = "<input type=\"hidden\" name=\"question\" value=\""+ questionID +"\">";
    
    questionsContainer.append("<li>" + removeButtonHTML + questionTitle + hiddenInputField + "</li>");
    newQuestionContainer.hide();
    newQuestionBtn.show();
    removeQuestionBtn = $('.question-remove');
    removeQuestionBtn.click(removeQuestion);
    findRemoveButtons();
  }

  function findRemoveButtons() {
    removeQuestionBtn = $('.question-remove');
  }

  function setEventHandlers() {
    newQuestionBtn.click(showQuestionSelector);
    removeQuestionBtn.click(removeQuestion);
    addQuestionBtn.click(addQuestion);
  }

  function removeQuestion() {
    $(this).parent('li').remove();
  }

});