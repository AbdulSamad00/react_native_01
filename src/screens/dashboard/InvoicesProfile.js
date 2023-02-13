import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { Navbar } from "../../components";
import { Ionicons, FontAwesome5, FontAwesome, MaterialIcons, Fontisto, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { getClinic } from '../../api/clinics';
import { getUser } from '../../api/users';
import { getPatientByUser } from '../../api/patients';
import { getInvoice, getInvoices } from '../../api/invoices';
import moment from "moment";
import { style } from 'styled-system';
const data = [1];
const widthWindow = Dimensions.get('window').width;

const RenderRow = ({ prod, quan, price }) => {
    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 10 }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text>{prod}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }} />
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text>{quan}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text>{price}</Text>
            </View>
        </View>
    );
}

export const InvoicesProfile = (props) => {

    // Provide the id in here 
    const [id, setid] = useState("6181974ef98b972aae5f50d7");
    const [invoicedata, setinvoicedata] = useState([]);
    const [clinicinfo, setclinicinfo] = useState([]);
    const [patientinfo, setpatientinfo] = useState([]);

    const populateInvoice = async () => {
        const { data: invoice } = await getInvoice(id);
        console.log("invoice")
        console.log(invoice)
        setinvoicedata(invoice);
    }
    const populateClinic = async () => {
        const { data: clinic } = await getClinic('616ad5874236bbfe5ce5be34');
        console.log("clinic")
        console.log(clinic)
        setclinicinfo(clinic);
    }
    const populatePatient = async () => {
        const { data: patient } = await getPatientByUser(invoicedata?.user);
        setpatientinfo(patient);
    }
    useEffect(() => {
        populateInvoice();
        populateClinic();

    }, []);
    useEffect(() => {
        populatePatient();
    }, [invoicedata])

    return (
        <>
            <KeyboardAwareScrollView>
                <SafeAreaView />
                <StatusBar />
                <Navbar
                    style={{ backgroundColor: '#00B7DD', width: '100%' }}
                    onPress={() => {
                        props.navigation.goBack();
                    }}
                    Text={invoicedata?.invoiceNo}
                />
                <View style={styles.Container} >

                    {/* <View style={{ width: '100%', elevation: 10, backgroundColor: 'white', padding: 10, borderRadius: 10, flexDirection: widthWindow < 400 ? 'column' : 'row',justifyContent:'space-around' }} >
                        <Text numberOfLines={2} style={{ fontSize: 18, color: '#2D353C' }} >Invoice-Nr:{'\t'} {invoicedata?.invoiceNo}  </Text>
                        <Text numberOfLines={2} style={{ fontSize: 18, color: '#2D353C' }}>Date Of Invoice:{'\t'} {moment(invoicedata?.createdOn).format('LL')}</Text>
                        <Text numberOfLines={2} style={{ fontSize: 18, color: '#2D353C' }}>Due Date:{'\t'} {!invoicedata?.dueDate ? "N/A" : moment(invoicedata?.dueDate).format('LL')}</Text>
                    </View> */}

                    {widthWindow < 400 ?
                        <View style={{ width: '100%', padding: 25, backgroundColor: '#00B7DD' }} >
                            {/* <View style={{ flexDirection: "row", justifyContent: 'space-between' }} > */}
                            {/* <Text style={{ color: 'white', fontSize: 26 }} numberOfLines={1} >{patientinfo?.user?.contactName?.last}</Text> */}
                            {/* <Text style={{ color: 'white', width: '50%', justifyContent: 'flex-end', fontSize: 24, fontWeight: 'bold', textAlign: 'right' }} numberOfLines={1} >
                                    {invoicedata?.status}
                                </Text> */}
                            {/* </View> */}
                            <View style={{ flexDirection: "row", marginTop: 5, justifyContent: 'space-evenly', marginTop: 10 }}>
                                <Text style={{ width: '30%', color: 'white', fontWeight: 'bold' }} numberOfLines={1}> Dated</Text>
                                <Text style={{ width: '30%', color: 'white', fontWeight: 'bold' }} numberOfLines={1} > Due Date</Text>
                                <Text style={{ width: '30%', color: 'white', fontWeight: 'bold' }} numberOfLines={1}>Status</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 5, justifyContent: 'space-evenly' }}>
                                <Text style={{ width: '35%', color: 'white', fontSize: 18 }} numberOfLines={1}> {moment(invoicedata?.createdOn).format('ll')}</Text>
                                <Text style={{ width: '35%', color: 'white', fontSize: 18 }} numberOfLines={1} > {!invoicedata?.dueDate ? "N/A" : moment(invoicedata?.dueDate).format('ll')}</Text>
                                <Text style={{ width: '30%', color: 'white', fontSize: 18 }} numberOfLines={1}>{invoicedata?.status}</Text>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginTop: 20 }} >
                                <TouchableOpacity style={{ backgroundColor: '#EB0606', padding: 10, borderRadius: 10, marginLeft: 5 }} >
                                    <Fontisto name="acrobat-reader" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                    <MaterialCommunityIcons name="printer" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                    <FontAwesome5 name="pencil-alt" size={24} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                    <Feather name="credit-card" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        : null}
                    {widthWindow < 400 ?
                        null
                        :
                        <>
                            <View style={{ width: '100%', elevation: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, borderRadius: 10 }} >
                                <View style={{ justifyContent: "center" }} >

                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }} >Invoice-Nr:{invoicedata?.invoiceNo}</Text>
                                </View>

                                <View style={{ flexDirection: 'row', }}>
                                    <TouchableOpacity style={{ backgroundColor: '#EB0606', padding: 10, borderRadius: 10, marginLeft: 5 }} >
                                        <Fontisto name="acrobat-reader" size={24} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                        <MaterialCommunityIcons name="printer" size={24} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                        <FontAwesome5 name="pencil-alt" size={24} color="white" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                        <Feather name="credit-card" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    }
                    <View style={styles.infoMain} >
                        <View style={styles.infoContainer}>
                            <View style={{ padding: 5 }}>
                                <Text style={{ fontWeight: "bold", color: '#4E5C68' }}>From: </Text>
                                <Text numberOfLines={1} style={{ fontWeight: '700', color: '#4E5C68', fontSize: 20 }} >
                                    {!clinicinfo[0]?.companyInfo?.businessName ? "N/A" : clinicinfo[0]?.companyInfo?.businessName}
                                </Text>

                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>
                                    {!clinicinfo[0]?.address1 ? "N/A" : clinicinfo[0]?.address1}
                                </Text>
                                {/* <Text numberOfLines={1} style={{ color: '#4E5C68' }}>
                                    {!clinicinfo[0]?.address2 ? "N/A" : clinicinfo[0]?.address2}
                                </Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>
                                    {!clinicinfo[0]?.address3 ? "N/A" : clinicinfo[0]?.address3}
                                </Text> */}
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>
                                    {!clinicinfo[0]?.city ? "N/A" : clinicinfo[0]?.city}, {!clinicinfo[0]?.zip ? "N/A" : clinicinfo[0]?.zip}
                                </Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>
                                    {!clinicinfo[0]?.city ? "N/A" : clinicinfo[0]?.city}
                                </Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>
                                    {!clinicinfo[0]?.country ? "N/A" : clinicinfo[0]?.country}
                                </Text>

                                <Text numberOfLines={2} style={{ color: '#4E5C68' }}>
                                    {'\n'}{!clinicinfo[0]?.bankInfo?.IBAN ? "N/A" : clinicinfo[0]?.bankInfo?.IBAN}
                                </Text>
                                <Text numberOfLines={2} style={{ color: '#4E5C68' }}>
                                    {'\n'}{!clinicinfo[0]?.bankInfo?.bank ? "N/A" : clinicinfo[0]?.bankInfo?.bank}
                                </Text>
                                <Text numberOfLines={2} style={{ color: '#4E5C68' }}>
                                    {'\n'}{!clinicinfo[0]?.bankInfo?.branchOfBank ? "N/A" : clinicinfo[0]?.bankInfo?.branchOfBank}
                                </Text>
                                <Text numberOfLines={2} style={{ color: '#4E5C68' }}>
                                    {'\n'}{!clinicinfo[0]?.bankInfo?.chamberCommerceNo ? "N/A" : clinicinfo[0]?.bankInfo?.chamberCommerceNo}
                                </Text>
                                <Text numberOfLines={2} style={{ color: '#4E5C68' }}>
                                    {'\n'}{!clinicinfo[0]?.bankInfo?.companyInfo ? "N/A" : clinicinfo[0]?.bankInfo?.companyInfo}
                                </Text>


                                <Text numberOfLines={1} style={{ fontSize: 17, marginTop: 10, color: '#4E5C68' }} >
                                    <Ionicons name="md-globe-outline" size={16} color="#4E5C68 " />
                                    {!clinicinfo[0]?.companyInfo?.website ? "N/A" : clinicinfo[0]?.companyInfo?.website}
                                </Text>

                                <Text numberOfLines={1} style={{ fontSize: 17, marginTop: 10, color: '#4E5C68' }} >
                                    {/* <MaterialIcons name="phone-in-talk" size={16} color="#4E5C68 " /> */}
                                    Phone: {!clinicinfo[0]?.phone ? "N/A" : clinicinfo[0]?.phone}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoContainer}>
                            <View style={{ padding: 5 }} >
                                <Text style={{ fontWeight: "bold", color: '#4E5C68' }}>To:</Text>
                                <Text numberOfLines={1} style={{ fontWeight: '700', color: '#4E5C68' }} >{patientinfo?.user?.contactName?.first} {patientinfo?.user?.contactName?.last}</Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>{!patientinfo?.user?.Address?.address1 ? "N/A" : patientinfo?.user?.Address?.address1}</Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>{!patientinfo?.user?.Address?.address2 ? "N/A" : patientinfo?.user?.Address?.address2}</Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>{!patientinfo?.user?.Address?.address3 ? "N/A" : patientinfo?.user?.Address?.address3}</Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>{!patientinfo?.user?.Address?.zip ? "N/A" : patientinfo?.user?.Address?.zip}</Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>{!patientinfo?.user?.Address?.city ? "N/A" : patientinfo?.user?.Address?.city}</Text>
                                <Text numberOfLines={1} style={{ color: '#4E5C68' }}>{!patientinfo?.user?.Address?.country ? "N/A" : patientinfo?.user?.Address?.country}</Text>

                                <Text numberOfLines={2} style={{ color: '#4E5C68' }}>{'\n'}{!patientinfo?.user?.bankInfo?.IBAN ? "N/A" : patientinfo?.user?.bankInfo?.IBAN}</Text>
                                <Text numberOfLines={2} style={{ color: '#4E5C68' }}>{'\n'}{!patientinfo?.user?.bankInfo?.bank ? "N/A" : patientinfo?.user?.bankInfo?.bank}</Text>
                                <Text numberOfLines={2} style={{ color: '#4E5C68' }}>{'\n'}{!patientinfo?.user?.bankInfo?.branchOfBank ? "N/A" : patientinfo?.user?.bankInfo?.branchOfBank}</Text>


                                <Text numberOfLines={1} style={{ fontSize: 17, marginTop: 10, color: '#4E5C68' }} >
                                    <Ionicons name="md-globe-outline" size={16} color="#4E5C68 " />
                                    {!patientinfo?.user?.email ? "N/A" : patientinfo?.user?.email}
                                </Text>

                            </View>
                        </View>

                        {
                            widthWindow < 400 ? null : <View style={{ width: '25%', paddingTop: 20 }} >
                                <Text style={{ fontSize: 18, color: '#2D353C', fontWeight: 'bold' }}>Date Of Invoice</Text>
                                <Text numberOfLines={2} style={{ fontSize: 18, color: '#2D353C', marginTop: 10 }}> {moment(invoicedata?.createdOn).format('LL')}</Text>
                                <Text style={{ fontSize: 18, color: '#2D353C', fontWeight: 'bold', marginTop: 10 }}>Due Date:</Text>
                                <Text numberOfLines={2} style={{ fontSize: 18, color: '#2D353C', marginTop: 5 }}> {!invoicedata?.dueDate ? "N/A" : moment(invoicedata?.dueDate).format('LL')}</Text>
                                <Text style={{ fontSize: 18, color: '#2D353C', fontWeight: 'bold', marginTop: 10 }}>Status:</Text>
                                <Text numberOfLines={2} style={{ fontSize: 18, color: '#2D353C', marginTop: 5 }}> {!invoicedata?.status ? "N/A" : invoicedata?.status}</Text>
                            </View>
                        }
                    </View>
                    <View style={{ width: '100%', backgroundColor: '#FFFFFF', marginTop: 5, padding: 10, borderRadius: 10 }} >

                        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', borderBottomWidth: 1, padding: 10, backgroundColor: 'white', marginTop: 20, borderRadius: 10 }}>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: '#4E5C68 ', fontWeight: 'bold' }} >Services Provided </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} />
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: '#4E5C68 ', fontWeight: 'bold' }} > Quantity</Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: '#4E5C68 ', fontWeight: 'bold' }} > Amount</Text>
                            </View>
                        </View>
                        {invoicedata?.services?.map((item, index) => {
                            return <RenderRow prod={item?.name} quan={item?.quantity} price={item?.amount} />;
                        })}


                    </View>
                    {/* Products */}
                    <View style={{ width: '100%', backgroundColor: '#FFFFFF', marginTop: 5, padding: 10, borderRadius: 10 }} >
                        <View style={{ flex: 1, alignSelf: 'stretch', borderBottomWidth: 1, flexDirection: 'row', padding: 10, backgroundColor: 'white', marginTop: 20, borderRadius: 10 }}>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: '#4E5C68 ', fontWeight: 'bold' }} >Products Delivered </Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} />
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: '#4E5C68 ', fontWeight: 'bold' }} > Quantity</Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: '#4E5C68 ', fontWeight: 'bold' }} > Amount</Text>
                            </View>
                        </View>
                        {invoicedata?.products?.map((item, index) => {
                            return <RenderRow prod={item?.name} quan={item?.quantity} price={item?.amount} />
                        })}
                    </View>
                    <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 5, backgroundColor: 'white', marginTop: 20, borderRadius: 10 }}>
                        <View style={{ flex: 1, alignSelf: 'stretch' }} />
                        <View style={{ flex: 1, alignSelf: 'stretch' }} />
                        <View style={{ flex: 1, alignSelf: 'stretch' }} >
                            <Text style={{ color: '#4E5C68 ', fontWeight: 'bold', fontSize: 20 }} >Total: </Text>
                        </View>
                        <View style={{ flex: 1, alignSelf: 'stretch' }} >
                            <Text style={{ color: '#4E5C68 ', fontWeight: 'bold', fontSize: 20 }} >
                                {invoicedata?.amount} {invoicedata?.currency}
                            </Text>
                        </View>
                    </View>

                    <View style={{ padding: 10 }} >
                        <Text style={{ color: '#4E5C68' }} >
                            * Make all cheques payable to {!clinicinfo[0]?.companyInfo?.businessName ? "N/A" : clinicinfo[0]?.companyInfo?.businessName}

                        </Text>
                        <Text style={{ color: '#4E5C68' }}>
                            * Payment is due within 30 days
                        </Text>
                        <Text style={{ color: '#4E5C68' }}>
                            * If you have any questions concerning this invoice, make a notification in "comments"
                        </Text>
                    </View>
                    {/* {widthWindow < 400 ?
                        <View style={{ width: '100%', elevation: 10, backgroundColor: 'white', padding: 10, flexDirection: 'row', justifyContent: 'center', marginBottom: 10, borderRadius: 10 }} >
                            <TouchableOpacity style={{ backgroundColor: '#EB0606', padding: 10, borderRadius: 10, marginLeft: 5 }} >
                                <Fontisto name="acrobat-reader" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                <MaterialCommunityIcons name="printer" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                <FontAwesome5 name="pencil-alt" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                <Feather name="credit-card" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        : null} */}
                    <Text style={{ textAlign: 'center' }} >Powered by TCMFiles.com{'\n'}</Text>
                    <View style={{ width: '100%', marginTop: 10, flexDirection: 'row', alignSelf: 'center', borderTopWidth: 1, padding: 10, justifyContent: 'space-around' }} >

                        <Text numberOfLines={1} style={{ marginTop: 10, width: '25%', color: '#4E5C68' }} >
                            <Ionicons name="md-globe-outline" size={14} color="#4E5C68 " />
                            {/* {!clinicinfo[0]?.companyInfo?.website ? "N/A" : clinicinfo[0]?.companyInfo?.website} */}
                        </Text>
                        <Text numberOfLines={1} style={{ fontSize: 17, width: '25%', marginTop: 10, color: '#4E5C68' }} >
                            <MaterialIcons name="phone-in-talk" size={14} color="#4E5C68 " />
                            {/* {!clinicinfo[0]?.phone ? "N/A" : clinicinfo[0]?.phone} */}
                        </Text>
                        <Text numberOfLines={1} style={{ fontSize: 17, width: '25%', marginTop: 10, color: '#4E5C68' }} >
                            <MaterialIcons name="mail" size={14} color="#4E5C68 " />
                            {/* {!clinicinfo[0]?.email ? "N/A" : clinicinfo[0]?.email} */}
                        </Text>
                        <Text numberOfLines={1} style={{ fontSize: 17, width: '25%', marginTop: 10, color: '#4E5C68' }} >
                            <FontAwesome name="comments" size={14} color="#4E5C68" />
                        </Text>
                    </View>
                </View>
            </KeyboardAwareScrollView >
        </>
    )
}

const styles = StyleSheet.create({
    Container: {
        width: "100%",
        backgroundColor: "#F6F6F6",
        flex: 1,
        // padding: 10
    },
    infoContainer: {
        marginTop: 10,
        // elevation: 10,
        // backgroundColor: 'white',
        padding: 10,
        // borderRadius: 10,
        width: widthWindow < 400 ? '100%' : '35%',
    },
    infoMain: {
        flexDirection: widthWindow < 400 ? 'column' : 'row',
        justifyContent: 'space-evenly',
        padding: 10, backgroundColor: 'white',
    }
})

// Dimensions.get('window').width > 400 ?  '100%' :  '48%' ,
// Dimensions.get('window').width > 400 ? { width: '100%' } : { width: '48%' },