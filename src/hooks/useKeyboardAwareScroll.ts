import { useEffect, useRef } from 'react';
import { Keyboard, ScrollView, Platform, TextInput, findNodeHandle } from 'react-native';

export const useKeyboardAwareScroll = (scrollViewRef: React.RefObject<ScrollView>) => {
  const scrollToInput = (reactNode: any) => {
    if (!scrollViewRef.current) return;
    
    // Mesurer la position de l'input
    reactNode.measureLayout(
      findNodeHandle(scrollViewRef.current),
      (x: number, y: number, width: number, height: number) => {
        // Calculer l'offset pour centrer l'input
        const offset = Platform.OS === 'ios' ? y - 100 : y - 50;
        
        // Scroll avec animation
        scrollViewRef.current?.scrollTo({
          x: 0,
          y: Math.max(0, offset),
          animated: true
        });
      },
      () => {
        console.log('Failed to measure layout');
      }
    );
  };

  return { scrollToInput };
}; 