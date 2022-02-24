import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, Dimensions } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Configuration, OpenAIApi } from "openai"
import { useAsyncEffect } from './hooks/useAsyncEffect';

const ai = new OpenAIApi(new Configuration({apiKey: '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'}));

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
    const message = incommings[0];
    try {
      const completion = await ai.createCompletion('text-ada-001', {
        prompt: message.text,        // text
        max_tokens: 24,    
        temperature: 0.9, // more risky responses
        top_p:0.3,
        frequency_penalty:0.5,
        presence_penalty:0.0,
        user:'1',
      });

      console.log('newCompletion', completion.data.choices[0].text?.trim());

      setMessages(previousMessages => GiftedChat.append(previousMessages , [{
        _id: String(Math.random() * Math.random()).substr(2),
        text: completion.data.choices[0].text,
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

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', }}>
      <GiftedChat messages={messages}
                  isTyping={isTyping}
                  onSend={messages => onSend(messages)}
                  user={{ _id:'1', name:'Me', avatar:'https://placeimg.com/140/140/people', }}
                  showUserAvatar={true}
                  showAvatarForEveryMessage={true}
                  renderUsernameOnMessage={true}/>

      { Platform.OS === 'android' && 
      <KeyboardAvoidingView behavior="padding" /> }

      <StatusBar style="auto" />
    </View>
  );
};