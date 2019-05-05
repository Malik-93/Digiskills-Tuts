import React from 'react';
import { connect  } from 'react-redux';
import socketIO from 'socket.io-client';
// import photo from '../assets/photo.jpeg';
const Peer =  require('simple-peer');

const peer = new Peer({
  initiator: true,
  trickle: false
 })

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      socket : null,
      isLoading: true,
      messages: [],
      yourId: '',
      otherId: ''
    }
  }

  componentDidMount() {
    this.socketConnection()
  }
  
 
  peerSignalhandle = () => {
    const { socket } = this.state

    peer.on('signal', (signal) => {
     
      socket.emit( 'signal', signal )
    })  

        peer.on( 'stream',  ( stream ) => {     
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then( (MediaStream) => {
        const video = document.querySelector('video');
        const canvas= document.getElementById('preview')
        const context = canvas.getContext("2d")
        const broadcastVideo = document.getElementById('broadcastVideo')
        context.drawImage( broadcastVideo, 0, 0, context.width, context.height )
        canvas.width= 800;
        canvas.height = 600;
        context.width = canvas.width;
        context.height = canvas.height
        video.srcObject = MediaStream;
        broadcastVideo.srcObject = stream
        video.play()
    })
    })



  // peer.on('stream', stream => {
  //   this.remoteVideo.srcObject = stream
  // })


  }

  connectPeer = () => {
    const otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal( otherId )
  }


  socketConnection = () => {
    const socketURL = 'http://localhost:8000/';
    const socket = socketIO ( socketURL )
    this.setState(
      {
        socket,
        isLoading: false
       }
    )
    socket.on('connection', () => {
      console.log('Successfully connected in Client ')
    })
  }  
 
  chatHandle = () => {
    const { socket }= this.state
    const message = document.getElementById('message');
    const user = document.getElementById('user');
    // const output = document.getElementById('output');
    const feedback = document.getElementById('feedback')

    socket.emit('chat', {
      message: message.value,
      user: user.value
    })

    socket.on('chat', (data) => {
       feedback.innerHTML = ''
       const newArr = this.state.messages;
       newArr.push( data )
       this.setState({ messages: newArr })
       localStorage.setItem('Chats', JSON.stringify( this.state.messages )  )
    })
  }

  feedbackHandle = () => {
    const { socket } = this.state;
    const feedback = document.getElementById('feedback')
    const user = document.getElementById('user');
    
    socket.emit('typing', user.value )

    socket.on('typing', (data) => {
      feedback.innerHTML = '<p><em>' + data + ' is typing message... </em></p>'
    })
  }

  imageBroadcast = () => {
      const { socket } = this.state

      navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then( (MediaStream) => {
      const video = document.querySelector('video');
      const canvas= document.getElementById('preview')
      const context = canvas.getContext("2d")
      const broadcastVideo = document.getElementById('broadcastVideo')
      context.drawImage( broadcastVideo, 0, 0, context.width, context.height )
      canvas.width= 800;
      canvas.height = 600;
      context.width = canvas.width;
      context.height = canvas.height
      video.srcObject = MediaStream;
      var broad = broadcastVideo.srcObject = MediaStream
      video.play()
      socket.emit( 'check', broad )

      socket.on('check', (data) => {
        console.log('Broadcast Video', data )
      })
      })
      
  }

  clearLocal = () => {
    localStorage.removeItem("Chats")
  }

  render() {
            return (
              <div>
  
                 {/* <div><textarea id='yourId'></textarea><br /> Your Id <br />
                  <textarea id='otherId'></textarea> <br /> Other Id
                  </div>
                  <button  onClick={this.connectPeer} > Connect </button>
                <button onClick ={this.peerSignalhandle} style={{marginTop: 20}} >Check Peer Signal</button> */}
              <video></video>
                <div id='mario-chat'>
                <div id='chat-window'>
                {/* <video src='' id='broadcastVideo' autoPlay={true} /> */}

                {/* <video autoPlay id="remoteVideo"  ref={video => (this.remoteVideo = video)}></video> */}

                <div id='output'>
                <canvas id='preview'></canvas>
                {
                  this.state.messages.length === 0 ? '' : this.state.messages.map((sms, index) => {
                   return <ul key={ index } style={{listStyle: 'none'}}>
                           <li><b>Name:  </b><em> {sms.user}</em> <br />
                           <p style = {{marginLeft: 60}}> 
                           <b>Message:  </b> { sms.message } </p> </li>
                          </ul>
                  })
                }
                </div>
                <div id='feedback'></div>
                </div>
                <input id='user' type='text' placeholder='Username' /><br />
                <input id='message' type='text' placeholder='Type message ...' onKeyPress = { this.feedbackHandle } /><br />
                <button id='send-btn' onClick={this.chatHandle}> Send </button>
                <button id='send-btn' onClick={this.peerSignalhandle}>Camera </button>
                <button id='send-btn' onClick={this.clearLocal}>clearLocal </button>
                </div>
                     {/* { this.state.isLoading === false ? this.imageBroadcast()  : '' } */}
                </div>
            )
      

    }
    
  }
const mapStateToProps = ( state ) => {
    return {
        getTodos: state.TodoReducer
    }
}

export default connect( mapStateToProps )( Chat )
