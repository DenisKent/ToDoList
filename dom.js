// part 2 linking it all together
// The function here is called an iife,
// it keeps everything inside hidden from the rest of our application

(function() {
  // This is the dom node where we will keep our todo


  var container = document.getElementById("todo-container");
  var addTodoForm = document.getElementById("add-todo");
  var sort_switch = document.getElementById("sort-switch");
  var editing = false;

  if (!localStorage.getItem("myList")) {
    state = [];
  } else {
    state = JSON.parse(localStorage.getItem("myList"));
  }

  // This function takes a todo, it returns the DOM node representing that todo
  var createTodoNode = function(todo) {
    var todoNode = document.createElement("li");
    var spanText = document.createElement("span");
    spanText.textContent = todo.description;
    todoNode.appendChild(spanText);
    //edit button
    spanText.addEventListener("click", function(event) {
      editing = true;
      var todoText = spanText.textContent;
      var editInputContainer = document.createElement("form");
      editInputContainer.innerHTML ='<input id="edit" type="text" maxlength="100" autocomplete="off" value="' + todoText +'" required/>';
      todoNode.replaceChild(editInputContainer, spanText);

      editInputContainer.addEventListener("submit", function(event) {
        // upon pressing enter
        event.preventDefault();
        editing = false; // no longer editing
        todoText = event.target[0].value; // save new text in variable
        var newState = todoFunctions.editTodo(state, todoText, todo.id);
        update(newState);
      });
    });

    // this adds the delete button
    var delButnNode = document.createElement("button");
    delButnNode.className = "delbutn";
    var trashNode = document.createElement("i");
    trashNode.className = "fa fa-trash";
    delButnNode.appendChild(trashNode);

    delButnNode.addEventListener("click", function(event) {
      var newState = todoFunctions.deleteTodo(state, todo.id);
      update(newState);
    });
    todoNode.appendChild(delButnNode);

    // add markTodo button
    var markButnNode = document.createElement("button");
    markButnNode.setAttribute("type", "checkbox");
    markButnNode.className = "checkbx";
    var tickNode = document.createElement("i");
    tickNode.className = "fa fa-check-square uncheckedbutn";
    if(todo.done){
      tickNode.className = "fa fa-check-square checkedbutn";
    }
    markButnNode.appendChild(tickNode);

    markButnNode.addEventListener("click", function(event) {
      var newButt = todoFunctions.markTodo(state, todo.id);
      update(newButt);
    });
    markButnNode.checked = todo.done;
    todoNode.appendChild(markButnNode);
    return todoNode;
  };

  // bind create todo form
  if (addTodoForm) {
    addTodoForm.addEventListener("submit", function(event) {
      event.preventDefault();
      var description = event.target.firstElementChild.value;
      event.target.firstElementChild.value = "";
      var newState = todoFunctions.addTodo(state,description);
      update(newState);
    });
  }
  if (sort_switch) {
    sort_switch.addEventListener("change", function(event) {
      update(state);
    });
  }

  // you should not need to change this function
  var update = function(newState) {
    if(sort_switch.checked){
      state = todoFunctions.sortTodos(newState);
    } else {state = newState;}
    window.localStorage.myList = JSON.stringify(state);
    renderState(state);
  };

  // you do not need to change this function
  var renderState = function(state) {
    var todoListNode = document.createElement("ul");

    state.forEach(function(todo) {
      todoListNode.appendChild(createTodoNode(todo));
    });

    // you may want to add a class for css
    container.replaceChild(todoListNode, container.firstChild);
  };

  if (container) renderState(state);


})();
