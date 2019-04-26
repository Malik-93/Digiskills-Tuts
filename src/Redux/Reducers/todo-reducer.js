import TodoActions from './../Actions/actionsClass';

const initialState = {
    todos: [ 'MongoDB', 'ExpressJs', 'ReactJs', 'NodeJs' ]
}

const TodoReducer = ( state = initialState, action) => {
    switch ( action.type ) {
        
        case TodoActions.CREATE_TODO:
        return [ ...state, action.paylaod ]
            
        case TodoActions.READ_TODO:
        return [ ...state, action.paylaod ]
        
        case TodoActions.UPDATE_TODO:
        return [ ...state, action.paylaod ]
        
        case TodoActions.DELETE_TODO:
        return [ ...state, action.paylaod ]
      
        default:
        return state
    }
}

export {
    
    TodoReducer
}