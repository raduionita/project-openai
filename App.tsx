import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { Composer, ComposerProps, GiftedChat, IMessage, SendProps } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAsyncEffect } from './hooks/useAsyncEffect';

// https://5ucgrx57li.execute-api.us-east-2.amazonaws.com/live/completion


type ChatComposerProps = ComposerProps & {
  onSend: SendProps<IMessage>['onSend'],
  text: SendProps<IMessage>['text'],
};

export default function App() {
  const [messages,setMessages] = useState<IMessage[]>([]);
  const [isTyping,setTyping] = useState<boolean>(true);

  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      if (isUnmounted) return;
      const data = await AsyncStorage.getItem('@messages');
      const json = JSON.parse(data||'[]');

      console.log('useEffect:reload', data);
      if (json.length) {
        setMessages(json);
      } else {
        setMessages([{
          _id:'1',
          text:'Let\'s  begin!',
          createdAt: new Date,
          user: {
            _id:'2',
            name:'Kayleen',
            avatar:'https://placeimg.com/140/140/tech',
          },
        },]);
      }
    })().catch(err => console.error(err));
    return () => { isUnmounted = true; }
  },[]);

  useEffect(() => {
    let isUnmounted = false;
    (async () => {
      console.log('useEffect:update', messages);
      await AsyncStorage.setItem('@messages', JSON.stringify(messages));
    })().catch(err => console.error(err));
    return () => { isUnmounted = true; }
  },[messages])
 
  const newCompletion = async (incommings : IMessage[]) => {
    setTyping(true);
    try {
      const message = incommings[0];
      const response = await fetch('https://5ucgrx57li.execute-api.us-east-2.amazonaws.com/live/completion', {
        method:'POST',
        headers: {
          'Accept':'application/json',
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          prompt: message.text,        // text
          max_tokens: 24,    
          temperature: 0.9, // more risky responses
          top_p:0.3,
          frequency_penalty:0.5,
          presence_penalty:0.0,
          user:'1',
        })
      });

      const json = await response.json();
      //const text = await response.text();
      console.info('newCompletion', json);

      setMessages(previousMessages => GiftedChat.append(previousMessages , [{
        _id: String(Math.random() * Math.random()).substr(2),
        text: (json.body['choices'][0].text||'').trim(),
        createdAt: new Date,
        user: {
          _id:'2',
          name:'Kayleen',
          avatar:'https://placeimg.com/140/140/tech', 
        },
      }]));

    } catch (e) {
      if (e.response) {
        console.error('newCompletion', e.response.status, e.response.data);
      } else {
        console.error('newCompletion', e.message);
      }
    } finally {
      setTyping(false);
    }
  };

  const onSend = useCallback((messages = []) => {
    (async () => {
      console.log('onSend', JSON.stringify(messages));
      setMessages(previousMessages => GiftedChat.append(previousMessages , messages));
      await newCompletion(messages);
    })()
  }, []);

  const onSubmitEditing = (props:ChatComposerProps) => {
    if (props.text && props.onSend) {
      props.onSend({text:props.text.trim()}, true);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <GiftedChat messages={messages}
                  isTyping={isTyping}
                  onSend={messages => onSend(messages)}
                  user={{ _id:'1', name:'Me', avatar:'https://placeimg.com/140/140/people', }}
                  showUserAvatar={true}
                  showAvatarForEveryMessage={true}
                  renderUsernameOnMessage={true}
                  renderComposer={(props :ChatComposerProps) => (
                    <Composer
                      {...props}
                      textInputProps={{
                        ...props.textInputProps,
                        onKeyPress:(evt) => (evt.nativeEvent.key == 'Enter') ? onSubmitEditing(props) : undefined,
                        blurOnSubmit: Platform.OS === 'web',
                        onSubmitEditing: Platform.OS === 'web' ? () => onSubmitEditing(props) : undefined, 
                      }}
                    />
                  )}/>

      <StatusBar style="auto" />
    </View>
  );
};