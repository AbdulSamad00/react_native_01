import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, StatusBar, SafeAreaView, ScrollView, Image, processColor, Dimensions, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
import { Navbar } from "../../components";
import CalendarPicker from 'react-native-calendar-picker';

import RBSheet from "react-native-raw-bottom-sheet";
import {
    StackedAreaChart,
    PieChart,
    Defs,
    LinearGradient,
    Stop,
    AreaChart,
    StackedBarChart,
    BarChart,
    Grid,
    XAxis,
    YAxis,
    LineChart
} from 'react-native-svg-charts';


import DropDownPicker from 'react-native-dropdown-picker';

import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import DateRange from '../../components/DateRange';





export default function Charts({ navigation }) {
    const refRBSheet = useRef();
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);


    // FOR DROPDOWN
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('0');
    const [items, setItems] = useState([
        { label: 'All', value: '0' },
        { label: 'Stacked Area Chart', value: '1' },
        { label: 'Line Chart', value: '2' },
        { label: 'Bar Chart', value: '3' },
        { label: 'Bar Stacked Chart', value: '4' },
        { label: 'Pie Chart', value: '5' },
        { label: 'Area Chart', value: '6' },
    ]);
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState('');
    const [items1, setItems1] = useState([
        { label: 'Save as PDF', value: '0' },
        { label: 'Print', value: '1' },
        { label: 'Share', value: '2' },
        // { label: 'Open Selection', value: '3' },
        // { label: 'Clear Selection', value: '4' },
    ]);
    const onDateChange = (date, type) => {
        console.log("date change")
        if (type === 'END_DATE') {
            setSelectedEndDate(date);
        } else {
            setSelectedEndDate(null);
            setSelectedStartDate(date);
        }
    };

    const verticalContentInset = { top: 10, bottom: 10 }
    const axesSvg = { fontSize: 10, fill: 'grey' };
    const xAxisHeight = 30
    const data = [
        {
            month: new Date(2015, 0, 1),
            apples: 3840,
            bananas: 1920,
            cherries: 960,
            dates: 400,
        },
        {
            month: new Date(2015, 1, 1),
            apples: 1600,
            bananas: 1440,
            cherries: 960,
            dates: 400,
        },
    ]

    const colors = ['red', '#4CAF50']
    const keys = ['apples', 'bananas', 'cherries', 'dates']
    const svgs = [
        { onPress: () => console.log('apples') },
        { onPress: () => console.log('bananas') },
        { onPress: () => console.log('cherries') },
        { onPress: () => console.log('dates') },
    ];
    const data1Line = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const data2Line = [78, 47, 68, 78, -42, -9, 85, 71, 4, 43, -23, 14, 50, -20, -60]
    const data1 = [
        {
            data: data1Line,
            svg: { stroke: 'red' },
        },
        {
            data: data2Line,
            svg: { stroke: '#4CAF50' },
        },
    ]


    // For Bar Chart
    const dataBarChart1 = [10, 5, 25, 15, 20]
    const dataBarChart2 = [3, 7, 5, 35, 10]
    const data3 = [
        {
            data: dataBarChart1,
            svg: { stroke: 'red', fill: 'red' },
        },
        {
            data: dataBarChart2,
            svg: { stroke: '#4CAF50', fill: '#4CAF50' },
        },
    ]
    const CUT_OFF = 20
    const Labels = ({ x, y, bandwidth, data3 }) => (
        data3.map((value, index) => (
            <Text
                key={index}
                x={x(index) + (bandwidth / 2)}
                y={value < CUT_OFF ? y(value) - 10 : y(value) + 15}
                fontSize={14}
                fill={value >= CUT_OFF ? 'white' : 'black'}
                alignmentBaseline={'middle'}
                textAnchor={'middle'}
            >
                {value}
            </Text>
        ))
    )



    // STACKED BAR Chart
    const colors4 = ['#33691E', '#689F38', '#9CCC65', '#DCEDC8']
    const data4 = [
        {
            broccoli: {
                value: 3840,
                svg: {
                    onPress: () => console.log('onPress => 0:broccoli:3840'),
                },
            },
            celery: {
                value: 1920,
                svg: {
                    onPress: () => console.log('onPress => 0:celery:1920'),
                },
            },
            onions: {
                value: 960,
                svg: {
                    onPress: () => console.log('onPress => 0:onions:960'),
                },
            },
            tomato: {
                value: 400,
                svg: {
                    onPress: () => console.log('onPress => 0:tomato:400'),
                },
            },
        },
        {
            broccoli: {
                value: 1600,
                svg: {
                    onPress: () => console.log('onPress => 1:broccoli:1600'),
                },
            },
            celery: {
                value: 1440,
                svg: {
                    onPress: () => console.log('onPress => 1:celery:1440'),
                },
            },
            onions: {
                value: 960,
                svg: {
                    onPress: () => console.log('onPress => 1:onions:960'),
                },
            },
            tomato: {
                value: 400,
                svg: {
                    onPress: () => console.log('onPress => 1:tomato:400'),
                },
            },
        },
        {
            broccoli: {
                value: 640,
                svg: {
                    onPress: () => console.log('onPress => 2:broccoli:640'),
                },
            },
            celery: {
                value: 960,
                svg: {
                    onPress: () => console.log('onPress => 2:celery:960'),
                },
            },
            onions: {
                value: 3640,
                svg: {
                    onPress: () => console.log('onPress => 2:onions:3640'),
                },
            },
            tomato: {
                value: 400,
                svg: {
                    onPress: () => console.log('onPress => 2:tomato:400'),
                },
            },
        },
        {
            broccoli: {
                value: 3320,
                svg: {
                    onPress: () => console.log('onPress => 3:broccoli:3320'),
                },
            },
            celery: {
                value: 480,
                svg: {
                    onPress: () => console.log('onPress => 3:celery:480'),
                },
            },
            onions: {
                value: 640,
                svg: {
                    onPress: () => console.log('onPress => 3:onions:640'),
                },
            },
            tomato: {
                value: 400,
                svg: {
                    onPress: () => console.log('onPress => 3:tomato:400'),
                },
            },
        },
        {
            broccoli: {
                value: 3320,
                svg: {
                    onPress: () => console.log('onPress => 3:broccoli:3320'),
                },
            },
            celery: {
                value: 480,
                svg: {
                    onPress: () => console.log('onPress => 3:celery:480'),
                },
            },
            onions: {
                value: 640,
                svg: {
                    onPress: () => console.log('onPress => 3:onions:640'),
                },
            },
            tomato: {
                value: 400,
                svg: {
                    onPress: () => console.log('onPress => 3:tomato:400'),
                },
            },
        }
    ]

    const keys4 = ['broccoli', 'celery', 'onions', 'tomato']


    // PIE Chart DATA
    const [selectedSlice, useselectedSlice] = useState({
        label: '',
        value: 0,
    })

    const [labelWidth, useLabelWidth] = useState(0);
    const deviceWidth = Dimensions.get('window').width
    const keys5 = ['Income', 'Expenses'];
    const values5 = [65, 35];
    const colors5 = ['#4CAF50', 'red']
    const data5 = keys5.map((key, index) => {
        return {
            key,
            value: values5[index],
            svg: { fill: colors5[index] },
            arc: { outerRadius: (70 + values5[index]) + '%', padAngle: selectedSlice.label === key ? 0.1 : 0 },
            onPress: () => useselectedSlice({ label: key, value: values5[index] })
        }
    })


    // AREA CHART 
    const data6 = [50, 10, 40, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
    const dataAreaChart2 = [50, 10, 40, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80].reverse()



    const StackedAreaChartComp = () => {
        return (
            <View>
                <View style={{ width: '100%', padding: 10, flexDirection: "row", justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center', fontSize: 24, color: '#4CAF50', fontWeight: 'bold' }} >Income </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'black', fontWeight: 'bold' }}>vs </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'red', fontWeight: 'bold' }}>Expenses</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 250 }}>
                    <StackedAreaChart
                        style={{ flex: 1 }}
                        contentInset={{ top: 10, bottom: 10 }}
                        data={data}
                        keys={keys}
                        colors={colors}
                        curve={shape.curveNatural}
                    >
                        <Grid />
                    </StackedAreaChart>
                    <YAxis
                        style={{ position: 'absolute', top: 0, bottom: 0 }}
                        data={StackedAreaChart.extractDataPoints(data, keys)}
                        contentInset={{ top: 10, bottom: 10 }}
                        svg={{
                            fontSize: 13,
                            fill: 'black',
                            stroke: 'black',
                            strokeWidth: 0.2,
                            alignmentBaseline: 'baseline',
                            baselineShift: '3',
                        }}
                    />
                </View>
                <XAxis
                    data={StackedAreaChart.extractDataPoints(data, keys)}
                    svg={{
                        fontSize: 12,
                        fill: 'black',
                    }}
                />
            </View>
        )
    }

    const LineChartComp = () => {
        return (
            <>
                <View style={{ width: '100%', padding: 10, flexDirection: "row", justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center', fontSize: 24, color: '#4CAF50', fontWeight: 'bold' }} >Income </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'black', fontWeight: 'bold' }}>vs </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'red', fontWeight: 'bold' }}>Expenses</Text>
                </View>
                <View style={{ height: 200, padding: 5, flexDirection: 'row' }}>
                    <YAxis
                        data={data1Line}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                    />
                    <View style={{ flex: 1 }}>
                        <LineChart
                            style={{ flex: 1 }}
                            data={data1}
                            contentInset={verticalContentInset}
                        // svg={{ stroke: 'red' }}
                        >
                            <Grid />

                        </LineChart>
                        <XAxis
                            style={{ marginHorizontal: -10 }}
                            data={data1Line}
                            formatLabel={(value, index) => index}
                            contentInset={{ left: 10, right: 10 }}
                            svg={{ fontSize: 10, fill: 'black' }}
                        />
                    </View>
                </View>
            </>
        )
    }
    const BarChartComp = () => {
        return (
            <>
                <View style={{ width: '100%', padding: 10, flexDirection: "row", justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center', fontSize: 24, color: '#4CAF50', fontWeight: 'bold' }} >Income </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'black', fontWeight: 'bold' }}>vs </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'red', fontWeight: 'bold' }}>Expenses</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                    <YAxis
                        data={data1Line}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                    />

                    <BarChart
                        style={{ flex: 1 }}
                        data={data3}
                        contentInset={{ top: 10, bottom: 10 }}
                        spacing={0.2}
                        gridMin={0}
                    >
                        <Grid direction={Grid.Direction.HORIZONTAL} />
                    </BarChart>

                </View>
                <XAxis
                    data={data1Line}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
            </>
        )
    }
    const StackedBarChartComp = () => {
        return (
            <View>
                <View style={{ width: '100%', padding: 10, flexDirection: "row", justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center', fontSize: 24, color: '#4CAF50', fontWeight: 'bold' }} >Income </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'black', fontWeight: 'bold' }}>vs </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'red', fontWeight: 'bold' }}>Expenses</Text>
                </View>
                <View style={{ flexDirection: 'row', height: 200, paddingVertical: 16 }}>
                    <YAxis
                        data={data1Line}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                    />
                    <StackedBarChart
                        style={{ flex: 1 }}
                        colors={colors}
                        // contentInset={{ top: 30, bottom: 30 }}
                        data={data4}
                        keys={keys4}
                        valueAccessor={({ item, key }) => item[key].value}
                    >
                        <Grid />
                    </StackedBarChart>
                </View>
                <XAxis
                    data={data1Line}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                />
            </View>
        )
    }

    const PieChartComp = () => {
        return (
            <View style={{ justifyContent: 'center', flex: 1, height: 500 }}>
                <View style={{ width: '100%', padding: 10, flexDirection: "row", justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center', fontSize: 24, color: '#4CAF50', fontWeight: 'bold' }} >Income </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'black', fontWeight: 'bold' }}>vs </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'red', fontWeight: 'bold' }}>Expenses</Text>
                </View>
                <PieChart
                    style={{ height: 400 }}
                    outerRadius={'60%'}
                    innerRadius={'35%'}
                    data={data5}
                />
                <Text
                    onLayout={({ nativeEvent: { layout: { width } } }) => {
                        useLabelWidth(width);
                    }}
                    style={{
                        position: 'absolute',
                        left: deviceWidth / 2 - labelWidth / 2,
                        textAlign: 'center'
                    }}>
                    {`${selectedSlice.label} \n ${selectedSlice.value}`}
                </Text>
            </View>
        )
    }
    const AreaChartComp = () => {
        return (
            <View>
                <View style={{ width: '100%', padding: 10, flexDirection: "row", justifyContent: 'center' }} >
                    <Text style={{ textAlign: 'center', fontSize: 24, color: '#4CAF50', fontWeight: 'bold' }} >Income </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'black', fontWeight: 'bold' }}>vs </Text>
                    <Text style={{ textAlign: 'center', fontSize: 24, color: 'red', fontWeight: 'bold' }}>Expenses</Text>
                </View>
                {/* <AreaChart
                    style={{ height: 250 }}
                    data={data6}
                    contentInset={{ top: 20, bottom: 20 }}
                    svg={{ fill: 'red' }}
                >
                    <Grid />
                </AreaChart> */}

                <View style={{ height: 250, padding: 5, flexDirection: 'row' }}>
                    <YAxis
                        data={data1Line}
                        style={{ marginBottom: xAxisHeight }}
                        contentInset={verticalContentInset}
                        svg={axesSvg}
                    />
                    <AreaChart
                        style={{ flex: 1 }}
                        data={data6}
                        svg={{ fill: 'red' }}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={shape.curveNatural}

                    >
                        <Grid />
                    </AreaChart>
                    <AreaChart
                        style={StyleSheet.absoluteFill}
                        data={dataAreaChart2}
                        svg={{ fill: '#4CAF50' }}
                        contentInset={{ top: 20, bottom: 20 }}
                        curve={shape.curveNatural}
                    />
                </View>
                <XAxis
                    style={{ marginHorizontal: -10 }}
                    data={data1Line}
                    formatLabel={(value, index) => index}
                    contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
                {/* <AreaChart
                    style={{ height: 250 }}
                    data={data6}
                    svg={{ fill: 'red' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                >
                    <Grid />
                </AreaChart>
                <AreaChart
                    style={StyleSheet.absoluteFill}
                    data={dataAreaChart2}
                    svg={{ fill: 'rgba(34, 128, 176, 0.5)' }}
                    contentInset={{ top: 20, bottom: 20 }}
                    curve={shape.curveNatural}
                /> */}
            </View>
        )
    }
    return (

        <View style={{ backgroundColor: 'white', flex: 1 }} >
            <KeyboardAwareScrollView>
                <SafeAreaView>
                    <Navbar
                        style={{ backgroundColor: '#00B7DD', width: '100%' }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                        Text={"Charts"}
                        nameIcon={"calendar"}
                        coloricon2={"white"}
                        onPress2={() => refRBSheet.current.open()}
                    />
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <View style={{ width: '45%', }} >

                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                disableBorderRadius={true}
                            />
                        </View>
                        <View style={{ width: '45%', }} >

                            <DropDownPicker
                                open={open1}
                                value={value1}
                                items={items1}
                                setOpen={setOpen1}
                                setValue={setValue1}
                                setItems={setItems1}
                                disableBorderRadius={true}
                                placeholder="Actions"
                            />
                        </View>
                    </View>



                    {value == '0' && <>
                        <StackedAreaChartComp />
                        <LineChartComp />
                        <BarChartComp />
                        <StackedBarChartComp />
                        <PieChartComp />
                        <AreaChartComp />
                    </>
                        || value == '1' && <StackedAreaChartComp />
                        || value == '2' && <LineChartComp />
                        || value == '3' && <BarChartComp />
                        || value == '4' && <StackedBarChartComp />
                        || value == '5' && <PieChartComp />
                        || value == '6' && <AreaChartComp />
                    }
                    {/* BARCHART */}

                    {/* -Date Range- */}

                    <DateRange refRBSheet={refRBSheet} onDateChange={onDateChange} />

                   


                </SafeAreaView>
            </KeyboardAwareScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    chart: {
        flex: 1
    }
});