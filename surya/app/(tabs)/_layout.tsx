 import { View, Text } from 'react-native'
 import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import Navbar from '@/components/Navbar';

 export default function TabLayout() {
   return (
     <>
       <Navbar/>
       <Tabs
         screenOptions={{
           tabBarShowLabel: false,
           headerShown: false,
         }}
       >
         <Tabs.Screen
           name="home"
           options={{
             tabBarIcon: ({ size, color }) => (
               <Ionicons name="home" size={size} color={color} />
             ),
           }}
         />
         <Tabs.Screen
           name="settings"
           options={{
             tabBarIcon: ({ size, color }) => (
               <Ionicons name="settings" size={size} color={color} />
             ),
           }}
         />
       </Tabs>
     </>
   );
 }