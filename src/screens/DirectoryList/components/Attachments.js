import { View, TouchableOpacity, Text, Image } from "react-native";
import { Icon } from 'react-native-elements';
import { h } from 'react-native-responsiveness';
import styles from "./businessStyles";

export default function Attachments({ clinic }) {
    return (
        <>
            <View>

                <TouchableOpacity
                    style={[styles.Buttons, { marginLeft: h("1%"), }]}
                >
                    <Image
                        style={styles.Buttonicons}
                        source={require("../../../assets/icons/import.png")}
                    />
                    <Text style={styles.ButtonText}>Upload</Text>
                </TouchableOpacity>

                {/* end token */}

                {/* token 2  */}
                <View style={styles.flatlistContainer2}>
                    <View style={styles.DocDetails}>
                        <Text style={styles.DocText}>Documents & Reports</Text>

                        <TouchableOpacity style={styles.uploadContainer}>
                            <View style={styles.leftContainer}>
                                <Image
                                    style={styles.icons}
                                    source={require("../../../assets/doc.png")}
                                />
                            </View>
                            <View style={styles.RightContainer}>
                                <Text style={styles.Uploadtext}>Upload File</Text>
                            </View>
                            <View style={styles.leftbContainer}>
                                <Image
                                    style={styles.icons2}
                                    source={require("../../../assets/eye.png")}
                                />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.uploadContainer}>
                            <View style={styles.leftContainer}>
                                <Image
                                    style={styles.icons}
                                    source={require("../../../assets/doc.png")}
                                />
                            </View>
                            <View style={styles.RightContainer}>
                                <Text style={styles.Uploadtext}>Upload File</Text>
                            </View>
                            <View style={styles.leftbContainer}>
                                <Image
                                    style={styles.icons2}
                                    source={require("../../../assets/eye.png")}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* End token 2  */}
                {/* <View style={styles.FlatListBottomView}>
                            <TouchableOpacity style={styles.Buttons}>
                              <Image
                                style={styles.Buttonicons}
                                source={require("../../assets/icons/edit.png")}
                              />
                              <Text style={styles.ButtonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={[styles.Buttons, { marginLeft: h("1%"), }]}
                            >
                              <Image
                                style={styles.Buttonicons}
                                source={require("../../assets/icons/import.png")}
                              />
                              <Text style={styles.ButtonText}>Upload</Text>
                            </TouchableOpacity>
                          </View> */}
                {/* token 3  */}
                <View style={styles.flatlistContainer3}>
                    <View style={styles.DocDetails}>
                        <Text style={styles.DocText}>Prescriptions</Text>
                    </View>
                    <TouchableOpacity style={styles.uploadContainer}>
                        <View style={styles.leftContainer}>
                            <Image
                                style={styles.icons}
                                source={require("../../../assets/doc.png")}
                            />
                        </View>
                        <View style={styles.RightContainer}>
                            <Text style={styles.Uploadtext}>Upload File</Text>
                        </View>
                        <View style={styles.leftbContainer}>
                            <Icon
                                name={"close-outline"}
                                type="ionicon"
                                color="#E93030"
                                size={35}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.uploadContainer}>
                        <View style={styles.leftContainer}>
                            <Image
                                style={styles.icons}
                                source={require("../../../assets/doc.png")}
                            />
                        </View>
                        <View style={styles.RightContainer}>
                            <Text style={styles.Uploadtext}>Upload File</Text>
                        </View>
                        <View style={styles.leftbContainer}>
                            <Icon
                                name={"close-outline"}
                                type="ionicon"
                                color="#E93030"
                                size={35}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.uploadContainer}>
                        <View style={styles.leftContainer}>
                            <Image
                                style={styles.icons}
                                source={require("../../../assets/u.png")}
                            />
                        </View>
                        <View style={styles.RightContainer}>
                            <Text style={styles.Uploadtext}>Upload File</Text>
                        </View>
                        <View style={styles.leftbContainer}></View>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}