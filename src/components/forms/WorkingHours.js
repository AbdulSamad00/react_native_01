import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { FormTimePicker } from '.'
import { CheckBox } from 'react-native-elements/dist/checkbox/CheckBox'
import moment from 'moment'

export default function WorkingHours({title,checked,timings,setTimings,index}) {
    const [isChecked, setIsChecked] = useState(checked)
    const updateTiming=()=>{
        const array=[...timings]
        array.splice(index,1)
        console.log(array,'++++')
        setTimings(array)
    }
    // console.log(checked,'=====<>')
    return (
        <View style={{ flexDirection: "row", alignItems: "center",width:'110%' }}>
            <CheckBox
                title={title}
                checked={isChecked}
                onPress={()=>setIsChecked(isChecked==checked?false:checked)}
                containerStyle={{ width: '32%', backgroundColor: 'transparent', borderColor: 'transparent',marginRight:0,marginLeft:0 }}
            />
            {/* <View> */}
                <FormTimePicker
                    name="time"
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                    time={checked?.startTime}
                    disabled={isChecked?false:true}
                />
                <Text>To</Text>
                <FormTimePicker
                    name="time"
                    defaultDate="2020-01-01"
                    maxYears="70"
                    minYears="0"
                    time={checked?.endTime}
                    disabled={isChecked?false:true}
                />
            {/* </View> */}
        </View>
    )
}