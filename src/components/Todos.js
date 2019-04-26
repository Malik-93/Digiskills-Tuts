import React from 'react';
import { connect  } from 'react-redux';

function Todos( props ) {
  return (
    <div>
        <h2> These Todos are rendering from todos Reducer state </h2>
        <h4>Check Your Console also</h4>
      { console.log ( props.getTodos.todos )}
      <div>
          <ul>
          {
              props.getTodos.todos.map(( todos, index ) => {
                  return <li key={index}>{ todos }</li>
              })
          }
          </ul>
      </div>
    </div>
  )
}

const mapStateToProps = ( state ) => {
    return {
        getTodos: state.TodoReducer
    }
}

export default connect( mapStateToProps )( Todos )
