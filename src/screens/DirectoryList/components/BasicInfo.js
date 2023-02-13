import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import styles from "./businessStyles";
import QRCode from "react-native-qrcode-svg";
import { h } from "react-native-responsiveness";

export default function BasicInfo({ clinic }) {
    const phoneNumber = clinic?.clinics?.phones?.phone;
    const username = clinic?.clinics?.username;
    return (
        <>
            <View >
                <View style={{ paddingVertical: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        Basic Information
                    </Text>
                </View>
                {/* -------------------------- */}

                <View style={styles.flatlistContainer}>
                    <View style={styles.FlatListTopView}>
                        <View style={styles.ItemContainer}>
                            <Text style={[styles.itemAppoinment, { textTransform: "capitalize" }]}>{clinic?.status ? clinic?.status : ""}</Text>
                        </View>
                    </View>

                    <View style={styles.DocDetails}>
                        <Text style={styles.DocText}>{clinic?.clinics.contactName.first + " " + clinic?.clinics.contactName.last}</Text>
                    </View>
                    <View style={[styles.FlatListMiddleView,]}>
                        <View style={styles.FlatlistMiddleLeft}>
                            <View style={styles.ProfileImg}>
                                <Image style={styles.imge} source={{ uri: clinic?.clinics?.imageSrc }} />
                            </View>

                        </View>


                        <View style={[styles.DetailsContainer, { width: '75%' }]}>
                            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingRight: 7 }}>
                                <View >
                                    <Text style={styles.DocTextabc}>{clinic.clinics.Address.address1}</Text>
                                    <Text style={styles.DocTextabc}>{clinic.clinics.Address.zip}</Text>
                                    <Text style={styles.DocTextabc}>{clinic.clinics.Address.city}</Text>
                                    <Text style={styles.DocTextabc}>{clinic.clinics.Address.state}</Text>
                                    <Text style={styles.DocTextabc}>{clinic.clinics.Address.country}</Text>
                                </View>
                                <QRCode
                                    size={50}
                                    value={clinic?.clinics?.contactName?.first || "None"}
                                    logoSize={50}
                                    logoBackgroundColor="transparent"
                                />
                            </View>
                        </View>
                    </View>
                    <View style={[styles.FlatListBottomView,]}>
                        <TouchableOpacity onPress={() => { phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { width: '15%' }]}>
                            <Image style={styles.imge} source={require("../../../assets/icons/phone.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { phoneNumber ? Linking.openURL(`tel:${phoneNumber}`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}
                        >
                            <Image style={styles.imge} source={require("../../../assets/icons/mobile.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { phoneNumber ? Linking.openURL(`skype:${username}?chat`) : alert("Not a valid number") }} style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}
                        >
                            <Image style={styles.imge} source={require("../../../assets/icons/skype.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}
                        >
                            <Image style={styles.imge} source={require("../../../assets/icons/requestforappt.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}
                        >
                            <Image style={styles.imge} source={require("../../../assets/icons/address.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.Buttons, { marginLeft: h("1%"), width: "15%" }]}
                        >
                            <Image style={styles.imge} source={require("../../../assets/icons/about.png")} />
                        </TouchableOpacity>

                    </View>
                    {/* <View style={[styles.FlatlistMiddleLeft, { backgroundColor: "red", height: 50 }]}>
                      <View style={styles.ProfileImg}>
                        <Image style={styles.imge} source={require("../../assets/icons/mappin.png")} />
                      </View>
                    </View> */}
                    {/* last token */}

                </View>
            </View>
        </>
    )
}