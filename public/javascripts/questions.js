$(document).ready(function(){

  var pathname = window.location.pathname;
  var questionsContainer = $('.question-set-list ul');
  var newQuestionBtn = $('.new-question');
  var addQuestionBtn = $('#question-add');
  var newQuestionContainer = $('.new-question-container');
 
  newQuestionBtn.click(showQuestionSelector);
  addQuestionBtn.click(addQuestion);

  function showQuestionSelector(){
    newQuestionContainer.show();
    newQuestionBtn.hide();
  }

  function addQuestion(){
    var selectedQuestion = $('#new-question-select option:selected');
    var questionTitle = selectedQuestion.text();
    var questionID = selectedQuestion.val();
    var hiddenInputField = "<input type=\"hidden\" name=\"question\" value=\""+ questionID +"\">";
    questionsContainer.append("<li>" + questionTitle + hiddenInputField + "</li>");
    newQuestionContainer.hide();
    newQuestionBtn.show();
  }

});