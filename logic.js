// class LocalStorageMock {
//   constructor() {
//     this.store = {};
//   }
//
//   clear() {
//     this.store = {};
//   }
//
//   getItem(key) {
//     return this.store[key] || null;
//   }
//
//   setItem(key, value) {
//     this.store[key] = value.toString();
//   }
//
//   removeItem(key) {
//     delete this.store[key];
//   }
// };
//   global.localStorage = new LocalStorageMock;
var todoFunctions = {

  generateId: function() {
    return Date.now();
  },

  //cloneArrayOfObjects will create a copy of the todos array
  //changes to the new array don't affect the original
  cloneArrayOfObjects: function(todos) {
    return todos.map(function(todo) {
      return JSON.parse(JSON.stringify(todo));
    });
  },

  addTodo: function(todos, descrip) {
    var id = todoFunctions.generateId();
    var NewtoDo =
    [
      {
        id: id ,
        description: descrip,
        done:false
      }];
    var tempToDo = todoFunctions.cloneArrayOfObjects(todos);
    return tempToDo.concat(NewtoDo);
  },
  deleteTodo: function(todos, idToDelete) {
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // return a new array, this should not contain any todo with an id of idToDelete
    // hint: array.filter
    //var NewtoDo = [{id: todoFunctions.generateId() , description: descrip, done:false}];
      var tempToDo = todoFunctions.cloneArrayOfObjects(todos);
      return tempToDo.filter(val =>{
      return val.id !== idToDelete;
     });
  },
  markTodo: function(todos, idToMark) {
    //
    // if id = idToMark{
    //   if todo[done]= false:
    //   todo[done]=true;
    //   else
    // }
    // should leave the input argument todos unchanged (you can use cloneArrayOfObjects)
    // in the new todo array, all elements will remain unchanged except the one with id: idToMark
    // this element will have its done value toggled
    // hint: array.map

    var tempToDo = todoFunctions.cloneArrayOfObjects(todos);
    return  tempToDo.map(val =>{
      if(idToMark === val.id ){
        val.done = !val.done;
      }
      return val;
    });
  },
  sortTodos: function(todos) {
    // stretch goal! Do this last
    // should leave the input arguement todos unchanged (you can use cloneArrayOfObjects)
    // sortFunction will have same signature as the sort function in array.sort
    // hint: array.slice, array.sort
    var tempToDo = todoFunctions.cloneArrayOfObjects(todos);

    return tempToDo.sort(function(x,y){
      return Number(x.done) - Number(y.done);
    });
  },
  convertTimestamp: function(timestamp) {
    var d = new Date(timestamp);
		var yyyy = d.getFullYear(),
		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
		dd = ('0' + d.getDate()).slice(-2),
		hh = ('0' + d.getHours()).slice(-2),
		min = ('0' + d.getMinutes()).slice(-2),
		time;
  	time = yyyy+ '/' + mm + '/' + dd + ' - ' + hh + ':' + min;
  	return time;
  },
  editTodo: function(todos, newTodoText, idToEdit) {
    return todos.map(function(item) {
      if (item.id === idToEdit) {
        item.description = newTodoText;
      }
      return item;
    });
  }
};

// Why is this if statement necessary?
// The answer has something to do with needing to run code both in the browser and in Node.js
// See this article for more details:
// http://www.matteoagosti.com/blog/2013/02/24/writing-javascript-modules-for-both-browser-and-node/
if (typeof module !== "undefined") {
  module.exports = todoFunctions;
}
