/* this file has all the common selector utils for Select and MultiSelect */
import React from 'react';
import { ColorValue, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { Data, SelectorRect } from '../types';

export const createMeasureHandler = (
    ref: React.RefObject<any>,
    setRefRect: React.Dispatch<React.SetStateAction<SelectorRect>>,
    setListDisplay: React.Dispatch<React.SetStateAction<boolean>>,
    boxStyleWidth?: number | string,
    refRectYOffset: number = 5,
) => {
    return (display = false) => {
        ref.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
            setRefRect({
                x: x,
                y: y - refRectYOffset,
                width: boxStyleWidth ?? width,
                height: height + refRectYOffset * 2,
            });

            if (display && setListDisplay) {
                setListDisplay(true);
            }
        });
    }       
}

export const updatePriorities = (data: Data[]) => [
    ...data.filter((d: Data) => d.priority),
    ...data.filter((d: Data) => !d.priority),
];

export const renderDropdownArrow = (listDisplay: boolean, arrowColor: ColorValue) => (
    <View style={{ position: 'absolute', right: 0, paddingBottom: 4 }}>
        {listDisplay ? (
            // This is the up arrow "ᨈ"
            <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
                <Path 
                    d="M17 14l-5-5-5 5" 
                    stroke={arrowColor} 
                    strokeWidth={2} 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
            </Svg>) : (
            // This is the up arrow "ᨆ"
            <Svg width={25} height={25} viewBox="0 0 25 25" fill="none">
                <Path 
                    d="M7 10l5 5 5-5" 
                    stroke={arrowColor} 
                    strokeWidth={2} 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                />
                
            </Svg>
        )}
    </View>
)