```javascript

interface IMessage {
  _id: string | number          // _id: 1,
  text: string                  // text: 'My message',
  createdAt: Date | number      // createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
  user: User                    // user: {
                                //    _id: 2,
                                //    name: 'React Native',
                                //    avatar: 'https://facebook.github.io/react/img/logo_og.png',
  image?: string                // image: 'https://facebook.github.io/react/img/logo_og.png',
  video?: string                // video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  audio?: string
  system?: boolean
  sent?: boolean                // sent: true, // Mark the message as sent, using one tick
  received?: boolean            // received: true, // Mark the message as received, using two tick
  pending?: boolean             //  pending: true, // Mark the message as pending with a clock loader
  quickReplies?: QuickReplies
}

```

```javascript 
class GiftedChat {
  messages: Array; // messages to display
  isTyping: bool,  // [false] typing indicator // renderFooter will override this
  text: String, // [undefined] input text
  placeholder: String, // when text is empty
  user: User {_id,name,avatar} // SENDER
  onSend:Function, // callback when sending a message
  renderLoading:Function, // view rendered when loading
  renderSend:Function, // send button

  showUserAvatar:bool, // show user avatar

  onPressAvatar:Function(user), // when avatar is tapped 
}
```