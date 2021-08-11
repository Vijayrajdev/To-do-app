"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var taskContainer = document.querySelector('.task-container');
var globalTaskData = [];

var generateHTML = function generateHTML(taskData) {
  return "<div id=".concat(taskData.id, " class=\"col-md-6 col-lg-4 my-4\">\n          <div class=\"card\">\n            <div class=\"card-header d-flex justify-content-end gap-2\">\n              <button class=\"btn btn-outline-info\" name=").concat(taskData.id, " onclick=\"editCard.apply(this, arguments)\">\n                <i class=\"fas fa-pencil-alt\" name=").concat(taskData.id, "></i>\n              </button>\n              <button class=\"btn btn-outline-danger\" name=").concat(taskData.id, " onclick=\"deleteCard.apply(this, arguments)\">\n                <i class=\"far fa-trash-alt\" name=").concat(taskData.id, "></i>\n              </button>\n            </div>\n            <div class=\"card-body\">\n              <img\n                src=\"./Lib/Card-img.jfif\"\n                alt=\"Task-Image\"\n                class=\"card-img\"\n              />\n              <h5 class=\"card-title mt-4\">").concat(taskData.title, "</h5>\n              <p class=\"card-text\">\n                ").concat(taskData.description, "\n              </p>\n              <span class=\"badge bg-primary\">").concat(taskData.type, "</span>\n            </div>\n            <div class=\"card-footer\">\n              <button class=\"btn btn-outline-primary\">Open Task</button>\n            </div>\n          </div>\n        </div>");
};

var insertToDOM = function insertToDOM(content) {
  taskContainer.insertAdjacentHTML("beforeend", content);
};

var saveToLocalStorage = function saveToLocalStorage() {
  return localStorage.setItem("taskyVJ", JSON.stringify({
    cards: globalTaskData
  }));
}; // Adding new card


var addNewCard = function addNewCard() {
  // Get task Data
  var taskData = {
    id: "".concat(Date.now()),
    title: document.getElementById("taskTitle").value,
    type: document.getElementById("taskType").value,
    description: document.getElementById("taskDescription").value
  };
  globalTaskData.push(taskData);
  saveToLocalStorage();
  var newCard = generateHTML(taskData);
  insertToDOM(newCard); // Clear the form

  document.getElementById("taskTitle").value = "";
  document.getElementById("taskType").value = "";
  document.getElementById("taskDescription").value = "";
  return;
}; // Load Card


var loadExistingCards = function loadExistingCards() {
  // Check localstorage 
  var getData = localStorage.getItem("taskyVJ"); // Parse JSON data, if exist

  if (!getData) return;
  var taskCards = JSON.parse(getData);
  globalTaskData = taskCards.cards;
  globalTaskData.map(function (taskData) {
    var newCard = generateHTML(taskData);
    insertToDOM(newCard);
  });
  return;
}; // Delete card 


var deleteCard = function deleteCard(event) {
  var targetID = event.target.getAttribute("name");
  var elementType = event.target.tagName;
  var removeTask = globalTaskData.filter(function (task) {
    return task.id !== targetID;
  });
  globalTaskData = removeTask;
  saveToLocalStorage(); // Access DOM to remove card 

  if (elementType === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  } else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

  ;
}; // Edit card


var editCard = function editCard(event) {
  var elementType = event.target.tagName;
  var taskTitle;
  var taskType;
  var taskDescription;
  var parentElement;
  var submitButton;

  if (elementType === "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  } else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  ;
  taskTitle = parentElement.childNodes[3].childNodes[3];
  taskDescription = parentElement.childNodes[3].childNodes[5];
  taskType = parentElement.childNodes[3].childNodes[7];
  submitButton = parentElement.childNodes[5].childNodes[1]; // contenteditable - Attribute

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");
  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.innerHTML = "Save Changes";
}; // Save Edits 


var saveEdit = function saveEdit(event) {
  var targetID = event.target.getAttribute("name");
  var elementType = event.target.tagName;
  var taskTitle = parentElement.childNodes[3].childNodes[3];
  var taskDescription = parentElement.childNodes[3].childNodes[5];
  var taskType = parentElement.childNodes[3].childNodes[7];
  var submitButton = parentElement.childNodes[5].childNodes[1];
  var updatedData = {
    title: taskTitle,
    type: taskType,
    description: taskDescription
  };
  var saveTask = globalTaskData.map(function (task) {
    if (task.id === targetID) {
      return _objectSpread({}, task, {}, updatedData);
    } else {
      return task;
    }

    ;
  });
  globalTaskData = saveTask;
  saveToLocalStorage();
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");
  submitButton.innerHTML = "Open Task";
};