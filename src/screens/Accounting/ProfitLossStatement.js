import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { Navbar } from "../../components";
import { Ionicons, FontAwesome5, FontAwesome, MaterialIcons, Fontisto, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import moment from "moment";
import CalendarPicker from 'react-native-calendar-picker';
const widthWindow = Dimensions.get('window').width;
import RBSheet from "react-native-raw-bottom-sheet";

const RenderRow = ({ prod, price, color }) => {
    return (
        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 10 }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text>{prod}</Text>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch' }} />
            <View style={{ flex: 1, alignSelf: 'stretch' }} />
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                <Text>{price}</Text>
            </View>
        </View>
    );
}

export const ProfitLossStatement = (props) => {
    let startdate = new Date();
    startdate.setDate(startdate.getDate() - 31);
    const [clinic, setClinic] = useState({ name: "mozart", address1: "12 mozart blv", address2: "", address3: "", zipcode: "", city: "vienna", country: "austria", phoneNo: "123456789", });
    const [income, setIncome] = useState([{ name: "income1", amount: 740, date: "8/23/2021" }, { name: "income2", amount: 1560, date: "8/25/2021" }, { name: "income3", amount: 449, date: "9/8/2021" }, { name: "income4", amount: 1274, date: "9/15/2021" }, { name: "income5", amount: 1213, date: "9/16/2021" }, { name: "income6", amount: 1285, date: "7/25/2021" }, { name: "income7", amount: 1708, date: "7/26/2021" }, { name: "income8", amount: 995, date: "8/12/2021" }, { name: "income9", amount: 1669, date: "8/15/2021" }, { name: "income10", amount: 1577, date: "8/17/2021" }]);
    const [expense, setExpense] = useState([{ name: "expense1", amount: 1823, date: "8/23/2021" }, { name: "expense2", amount: 1101, date: "8/25/2021" }, { name: "expense3", amount: 335, date: "9/8/2021" }, { name: "expense4", amount: 1042, date: "9/15/2021" }, { name: "expense5", amount: 1549, date: "9/16/2021" }, { name: "expense6", amount: 1543, date: "7/25/2021" }, { name: "expense7", amount: 1332, date: "7/26/2021" }, { name: "expense8", amount: 841, date: "8/12/2021" }, { name: "expense9", amount: 540, date: "8/15/2021" }, { name: "expense10", amount: 1185, date: "8/17/2021" }]);
    const [newincomes, setNewIncomes] = useState([]);
    const [newexpenses, setNewExpenses] = useState([]);
    const [sheet, useSheet] = useState(false);
    const [selectionRanges, setselectionRanges] = useState({
        selection: {
            startDate: startdate,
            endDate: new Date(),
            key: "selection",
        },
    });
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const onDateChange = (date, type) => {
        if (type === 'END_DATE') {
            setSelectedEndDate(date);
        } else {
            setSelectedEndDate(null);
            setSelectedStartDate(date);
            console.log("selectedStartDate ====>" + selectedStartDate);
            console.log("selectedEndDate===>" + selectedEndDate);
        }
    };


    const [datePickerClass, setPickerClass] = useState("d-none");
    const btnStyles = { background: "white", margin: "0rem" };
    const iconStyles = {
        width: "15px",
        height: "15px",
        marginRight: "0rem",
    };

    const sumvalues = (values) => {
        let sum = 0;
        values.map((value, index) => {
            sum += value.amount
        })
        return sum
    }

    const changeClassname = (classname) => {
        if (classname === "d-none") {
            setPickerClass("border shadow-lg");
        } else {
            setPickerClass("d-none");
        }
    }
    const refRBSheet = useRef();
    const calculate = (income, expense, selectionRanges) => {
        const newincome = []
        const newexpense = []
        console.log(selectionRanges.selection.startDate, selectionRanges.selection.endDate);
        const start = new Date(selectionRanges.selection.startDate)
        const end = new Date(selectionRanges.selection.endDate)
        income.map((value, index) => {
            const incomedate = new Date(value.date);
            console.log(incomedate > start && incomedate < end);
            if (incomedate > start && incomedate < end) {
                newincome.push(value);
            }
        })
        expense.map((value, index) => {
            const expensedate = new Date(value.date);
            if (expensedate > start && expensedate < end) {
                newexpense.push(value);
            }
        })
        console.log(newincome)
        console.log(newexpense)
        setNewIncomes(newincome);
        setNewExpenses(newexpense);

    }

    const calculateprofitorloss = (income, expense) => {
        const incomesum = sumvalues(income)
        const expensesum = sumvalues(expense)
        const totalamount = incomesum - expensesum
        return ({ incomesum, expensesum, totalamount });
    }

    useEffect(() => {
        calculate(income, expense, selectionRanges);
    }, [selectionRanges])
    const setDate = (props) => {
        props.startDate && setStartDate(props.startDate);
        props.endDate && setEndDate(props.endDate);
    }

    const { incomesum, expensesum, totalamount } = calculateprofitorloss(newincomes, newexpenses);

    return (
        <View style={{ backgroundColor: 'white' }} >
            <KeyboardAwareScrollView>
                <SafeAreaView >
                    <Navbar
                        style={{ backgroundColor: '#00B7DD', width: '100%' }}
                        onPress={() => {
                            props.navigation.goBack();
                        }}
                        Text={"Profit Loss"}
                    />
                    {widthWindow < 400 ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 15, backgroundColor: '#00B7DD' }} >
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
                            <TouchableOpacity
                                onPress={() => refRBSheet.current.open()}
                                style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                <FontAwesome name="calendar" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        :
                        <>

                            <View style={{ width: '100%', padding: 25, backgroundColor: '#00B7DD' }} >
                                <View style={{ width: '100%', padding: 25, backgroundColor: '#00B7DD', flexDirection: 'row', justifyContent: 'space-between' }} >
                                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 4 }} >
                                        Profit Loss Statement
                                    </Text>

                                    <Text style={{ color: 'white', fontWeight: "bold", fontSize: 16, marginTop: 4 }} >
                                        01/09/2021 - 31/12/2021
                                    </Text>
                                </View>
                                <View style={{ width: '100%', backgroundColor: '#00B7DD', padding: 12, flexDirection: 'row', justifyContent: 'center' }} >
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
                                    <TouchableOpacity
                                        onPress={() => refRBSheet.current.open()}
                                        style={{ backgroundColor: '#348FE2', padding: 10, borderRadius: 10, marginLeft: 5 }}>
                                        <FontAwesome name="calendar" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    }
                    {widthWindow < 400 ? <View style={{ width: '100%', backgroundColor: 'white', padding: 14 }}>
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 4 }} >
                            Profit Loss Statement
                        </Text>
                        <Text style={{ color: 'black', fontSize: 15, marginTop: 4 }} >
                            Period
                        </Text>
                        <Text style={{ color: 'black', fontWeight: "bold", fontSize: 16, marginTop: 4 }} >
                            01/09/2021 - 31/12/2021
                        </Text>
                    </View> : null

                    }
                    <View style={{ width: '100%', backgroundColor: 'white', padding: 8, flexDirection: 'row' }} >

                        <View style={{ width: "50%", padding: 10, justifyContent: 'space-evenly' }} >
                            <Text style={{ fontSize: 19, color: 'grey', marginBottom: 5 }}>Your Company</Text>
                            <Text style={{ color: 'grey', marginBottom: 5 }}>Your Company's Addrees</Text>
                            <Text style={{ color: 'grey', marginBottom: 5 }}>City, state, Zip</Text>
                            <Text style={{ color: 'grey', marginBottom: 5 }}>Country</Text>
                        </View>
                        <View style={{ width: "50%", padding: 10 }} >
                            <Text style={{ textAlign: 'right', fontSize: 18, fontWeight: '700', color: 'black' }} >INVOICE</Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', backgroundColor: 'white', padding: 10, flexDirection: 'row' }} >
                        <View style={{ width: "50%", padding: 10, justifyContent: 'space-evenly' }} >
                            <Text style={{ fontSize: 19, color: 'black', marginBottom: 5 }}>Bill To:</Text>
                            <Text style={{ color: 'grey', marginBottom: 5 }}>Your Company's Addrees</Text>
                            <Text style={{ color: 'grey', marginBottom: 5 }}>City, state, Zip</Text>
                            <Text style={{ color: 'grey', marginBottom: 5 }}>Country</Text>
                        </View>
                        <View style={{ width: "50%", padding: 10 }} >
                            <Text numberOfLines={2} style={{ color: '#2D353C' }}>Invoice Number:</Text>
                            <Text style={{ color: '#2D353C' }}>Invoice Date</Text>
                            <Text style={{ color: '#2D353C' }}>Due Date</Text>
                        </View>

                    </View>
                    <View style={{ width: '100%', backgroundColor: '#FFFFFF', marginTop: 5, padding: 10, borderRadius: 10 }} >
                        <View style={{
                            flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 10, backgroundColor: 'green', marginTop: 20
                        }}>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }} >Income</Text>
                            </View>
                            <View style={{}} ></View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} ></View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }} > Amount</Text>
                            </View>
                        </View>
                        {income?.map((item, index) => {
                            return (
                                <RenderRow prod={item?.name} price={item?.amount} />
                            )
                        })}
                        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 10 }}>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total</Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} />
                            <View style={{ flex: 1, alignSelf: 'stretch' }} />
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }} >1000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 10 }} >
                        <View style={{
                            flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 10, backgroundColor: 'red', marginTop: 20
                        }}>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }} >Expenses</Text>
                            </View>
                            <View style={{}} ></View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} ></View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }} > Amount</Text>
                            </View>
                        </View>
                        {expense?.map((item, index) => {
                            return (
                                <RenderRow prod={item?.name} price={item?.amount} />
                            )
                        })}
                        <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row', padding: 10 }}>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Total</Text>
                            </View>
                            <View style={{ flex: 1, alignSelf: 'stretch' }} />
                            <View style={{ flex: 1, alignSelf: 'stretch' }} />
                            <View style={{ flex: 1, alignSelf: 'stretch' }} >
                                <Text style={{ fontSize: 18, fontWeight: 'bold' }} >1000</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '100%', backgroundColor: '#2D353C', padding: 30, justifyContent: 'space-between', marginTop: 20, flexDirection: 'row' }} >

                        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', textAlign: 'left' }} >Profit</Text>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', textAlign: 'right' }} >$88</Text>
                    </View>
                    <View style={{ width: '100%', flexDirection: 'row', alignSelf: 'center', padding: 20, justifyContent: 'space-around' }} >
                        <Text numberOfLines={1} style={{ color: '#4E5C68' }} >
                            <Ionicons name="md-globe-outline" size={18} color="#4E5C68 " />
                        </Text>
                        <Text numberOfLines={1} style={{ fontSize: 17, color: '#4E5C68' }} >
                            <MaterialIcons name="phone-in-talk" size={18} color="#4E5C68 " />
                        </Text>
                        <Text numberOfLines={1} style={{ fontSize: 17, color: '#4E5C68' }} >
                            <MaterialIcons name="mail" size={18} color="#4E5C68 " />
                        </Text>
                        <Text numberOfLines={1} style={{ fontSize: 17, color: '#4E5C68' }} >
                            <FontAwesome name="comments" size={18} color="#4E5C68" />
                        </Text>
                    </View>
                    <RBSheet
                        ref={refRBSheet}
                        closeOnDragDown={true}
                        closeOnPressMask={false}
                        customStyles={{
                            container: { height: 'auto' },
                            wrapper: {
                                backgroundColor: "transparent"
                            },
                            draggableIcon: {
                                backgroundColor: "#000"
                            }
                        }}
                    >
                        <View style={{
                            width: '100%',
                            padding: 10,
                            flexDirection: 'row', justifyContent: 'space-between'
                        }} >
                            <TouchableOpacity
                                onPress={() => refRBSheet.current.close()}
                                style={{ backgroundColor: 'red', padding: 10, borderRadius: 10 }}
                            // style={{ padding: 10 }}
                            ><Text style={{ color: 'white' }} >Cancel</Text></TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => refRBSheet.current.close()}
                                style={{ backgroundColor: 'green', padding: 10, borderRadius: 10 }}
                            ><Text style={{ color: 'white' }} >Save</Text></TouchableOpacity>
                        </View>
                        <CalendarPicker
                            startFromMonday={true}
                            allowRangeSelection={true}
                            minDate={new Date(1970, 1, 1)}
                            maxDate={new Date(2050, 6, 3)}
                            weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                            months={['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]}
                            previousTitle="Previous"
                            nextTitle="Next"
                            todayBackgroundColor="#e6ffe6"
                            selectedDayColor="#66ff33"
                            selectedDayTextColor="#000000"
                            scaleFactor={375}
                            textStyle={{
                                fontFamily: 'Cochin',
                                color: '#000000',
                            }}
                            onDateChange={onDateChange}
                        />
                    </RBSheet>
                    {/* <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={true}
                        minDate={new Date(1970, 1, 1)}
                        maxDate={new Date(2050, 6, 3)}
                        weekdays={['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']}
                        months={['January', 'Febraury', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]}
                        previousTitle="Previous"
                        nextTitle="Next"
                        todayBackgroundColor="#e6ffe6"
                        selectedDayColor="#66ff33"
                        selectedDayTextColor="#000000"
                        scaleFactor={375}
                        textStyle={{
                            fontFamily: 'Cochin',
                            color: '#000000',
                        }}
                        onDateChange={onDateChange}
                    /> */}

                </SafeAreaView>
            </KeyboardAwareScrollView>
        </View >
    )
}


const styles = StyleSheet.create({
    Container: {
        width: "100%",
        backgroundColor: "#F6F6F6",
        flex: 1,
    },
})