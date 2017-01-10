// 页面对象除了可以使用data数据成员，还可以添加事件处理函数
Page({
  data:{
    input:" ",
    allCompleted: false,
    todos: []
  },
  save: function(){
    wx.setStorage({
      key:"todolist",
      data:this.data.todos
    });
  },
  load: function(){
    console.log('aaa');
  var todos = wx.getStorageSync('todolist');
  this.setData({todos: todos});
  },
  // 页面加载执行的方法
  onLoad: function(){
   this.load();
  },
  // 回车时触发此事件 添加todos
  addTodoHandle: function(e){
    // console.log(e);
    var todos = this.data.todos;
    if(!e.detail.value) return;
    todos.push({
      name: e.detail.value,
      completed: false
    })
    // setdata 通知界面变更，更改全局todos
    this.setData({todos: todos, input:""});
    this.save();
  },
  changeCompleted: function(e){
    // console.log(e);
    var index = e.currentTarget.dataset.index;
    var todos = this.data.todos;
    todos[index].completed = !todos[index].completed;
    this.setData({todos: todos});
    this.save();
  },
  removeTodos: function(e){
    // console.log(e)
    var index = e.currentTarget.dataset.index;
    var todos = this.data.todos;
    todos.splice(index, 1);
    console.log(todos);
    this.setData({todos:todos});
    this.save();
  },
  toggleCompleted: function(e){
    var allCompleted = !this.data.allCompleted;
    var todos = this.data.todos;
    for(var key in todos){
        todos[key].completed = allCompleted;
      }
      this.setData({todos:todos, allCompleted:allCompleted});
      this.save();
    },
  clearAllCompleted: function(){
    var todos = this.data.todos;
    var newtodos = [];
    for(var i = 0; i < todos.length; i++){
      if(!todos[i].completed){
        newtodos.push(todos[i]);
      }

    }
    this.setData({todos: newtodos});
    this.save();
  }
})
