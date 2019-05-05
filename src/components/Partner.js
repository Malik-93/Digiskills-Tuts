import React, { Component } from 'react';
const Peer =  require('simple-peer');
const peer = new Peer({
    initiator:  true,
    trickle: false
   })

export default class Partner extends Component {

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
    
  
    peerSignalhandle = () => {
        peer.on('signal', (data) => {
            console.log(data)
        document.getElementById('yourId').value = JSON.stringify( data )
        })
      }

      connectPeer = () => {
        const otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal( otherId )
      }
    

    render() {
    return (
      <div>
           <div><textarea id='yourId'></textarea><br /> Your Id <br />
                  <textarea id='otherId'></textarea> <br /> Other Id
                  </div>
                  <button  onClick={this.connectPeer} > Connect </button>
                <button onClick ={this.peerSignalhandle} style={{marginTop: 20}} >Check Peer Signal</button>
        
      </div>
    )
  }
}
