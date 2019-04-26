class TodoActions {
    static CREATE_TODO = 'CREATE_TODO';
    static READ_TODO = 'READ_TODO';
    static UPDATE_TODO = 'UPDATE_TODO';
    static DELETE_TODO = 'DELETE_TODO';

    static createTodo ( todo )  {
        return {
            type: this.CREATE_TODO,
            payload: todo
        }
    }

    static  readTodo ( todo )  {
        return {
            type:this.READ_TODO,
            payload: todo
        }
    }

    static updateTodo  ( todo ) {
        return {
            type: this.UPDATE_TODO,
            payload: todo
        }
    }
    static deleteTodo ( todo ) {
        return {
            type: this.DELETE_TODO,
            payload: todo
        }
    }

}

export default TodoActions