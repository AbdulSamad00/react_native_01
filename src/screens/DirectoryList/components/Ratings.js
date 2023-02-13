import { View, Text } from "react-native";
import { AirbnbRating } from "react-native-elements";
import styles from "./businessStyles";

export default function Ratings({ clinic }) {
    return (
        <>
            <View height={'100%'} >
                <View style={styles.headingContainer}>
                    <Text style={styles.headingText}>
                        Reviews
                    </Text>
                </View>
                <View>
                    <AirbnbRating reviews={['😟', '🙂', '🙂', '😀', '😀']} />
                </View>
            </View>
        </>
    )
}