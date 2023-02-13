import { View, Text } from "react-native";

const WorkingHour = ({ start, end, day }) => {
    return (
        <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 36, paddingVertical: 8}}>
            <Text style={{textTransform: "capitalize", fontSize: 26, fontWeight: "bold"}}>{day}</Text>
            <View style={{flexDirection: "row"}}>
            <Text style={{fontSize: 20, marginRight: 26}}>{start}</Text>
            <Text style={{fontSize: 20}}>{end}</Text>
            </View>
        </View>
    )
}

export default function WorkingTime({ clinic }) {
    if (!Array.isArray(clinic?.workingHours)) return;
    if (clinic?.workingHours?.length === 0) return;
    return (
        <View style={{paddingTop: 18}}>
        { clinic.workingHours.map((e) => (
            <WorkingHour day={e.day} start={e.startTime} end={e.endTime} />
        )) }
        </View>
    )
}