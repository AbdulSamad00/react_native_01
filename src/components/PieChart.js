import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { G, Text as TextSvg, Rect, Image } from 'react-native-svg';
import { getTickets } from '../api/tickets';
import ActivityIndicator from './ActivityIndicator';
//import useApi from './hooks/useApi';
import { useNavigation } from '@react-navigation/native';

const PieChartComponent = ({ data }) => {
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  var sort = ['urgent', 'high', 'normal', 'low'],
    defaultValue = Infinity,
    sortObj = {},
    myArray = [
      { priority: 'urgent' },
      { priority: 'high' },
      { priority: 'normal' },
      { priority: 'low' },
    ];

  sort.forEach(function (a, i) {
    sortObj[a] = i + 1;
  });

  const fetchTicketData = async () => {
    try {
      setLoading(true);
      const res = await getTickets();
      setTicketData(res.data);
      // console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    // console.log(data);
  };

  useEffect(() => {
    fetchTicketData();
  }, []);

  const pieData = data?.map((value, index) => ({
    amount:
      ticketData?.filter(
        (ticket) => ticket?.category.toLowerCase() === value?.name.toLowerCase()
      ).length / ticketData?.length,
    svg: {
      fill: value.color,
    },
    key: `pie-${index}`,
    label: value.name,
    ticket: ticketData
      ?.filter(
        (ticket) => ticket?.category.toLowerCase() === value?.name.toLowerCase()
      )
      .sort(function (b, a) {
        return (
          (sortObj[a.priority] || defaultValue) -
          (sortObj[b.priority] || defaultValue)
        );
      }),
  }));

  const Labels = ({ slices, height, width }) => {
    return slices.map((slice, index) => {
      const { labelCentroid, pieCentroid, data } = slice;

      const { ticket, amount } = data;
      return (
        <G key={index} x={pieCentroid[0]} y={pieCentroid[1]}>
          {ticket?.map((tick, index) => (
            <G
              key={index}
              y={-index * 50}
              style={{ opacity: 0.7 }}
              onPress={() => navigation.navigate('Ticket')}
            >
              <Rect
                width='100'
                height='50'
                strokeWidth='3'
                x='-50'
                y='-20'
                stroke={data?.svg.fill}
                fill={'white'}
              ></Rect>
              <TextSvg
                fill={
                  'black'
                  // tick?.priority === 'urgent'
                  //   ? '#E64D3C'
                  //   : tick?.priority === 'high'
                  //   ? '#F0C50F'
                  //   : tick?.priority === 'normal'
                  //   ? '#BC5090'
                  //   : '#3498DB'
                }
                fontSize='9'
                textAnchor='middle'
                y={-10}
              >
                {tick?.name}
              </TextSvg>
              <Image
                y='-8'
                x='-40'
                width='12px'
                height='12px'
                href={tick?.participants[0]?.imageSrc}
              />
              <TextSvg fill='black' fontSize='8' y={1} x={-20}>
                {tick?.participants[0]?.username}
              </TextSvg>
              <Image
                y='5'
                x='-40'
                width='12px'
                height='12px'
                opacity={1}
                href={tick?.participants[1]?.imageSrc}
              />
              <TextSvg fill='black' fontSize='8' y={13} x={-20}>
                {tick?.participants[1]?.username}
              </TextSvg>
              <Rect
                width='60'
                height='12'
                x={-48}
                y={17}
                fill={'orange'}
              ></Rect>
              <TextSvg
                fill={'black'}
                fontSize='8'
                // textAnchor='middle'
                x={-45}
                y={25}
              >
                {tick?.category}
              </TextSvg>
              <Rect
                width='35'
                height='12'
                x={13}
                y={17}
                fill={
                  tick?.status === 'pending'
                    ? '#EB501A'
                    : tick?.status === 'in progress'
                    ? '#1BD8EB'
                    : tick?.status === 'archive'
                    ? '#919194'
                    : 'black'
                }
              ></Rect>
              <TextSvg
                fill={'white'}
                fontSize='8'
                // strokeWidth='0.5'
                x={20}
                // textAnchor='middle'
                y={25}
              >
                {tick?.status}
              </TextSvg>
            </G>
          ))}
        </G>
      );
    });
  };

  return (
    <View style={styles.container}>
      <ActivityIndicator visible={loading} />
      <View style={{ marginTop: 100 }}>
        <View>
          <PieChart
            style={{ height: 500, width: 500 }}
            valueAccessor={({ item }) => item.amount}
            data={pieData}
            spacing={0}
            padAngle={0}
            outerRadius={'100%'}
            innerRadius={'0%'}
          >
            <Labels />
          </PieChart>
        </View>
      </View>
      <View style={[styles.infoContainer, { marginTop: 50 }]}>
        {data?.map((item, index) => {
          return (
            <View style={styles.singleInfo} key={index}>
              <View
                style={[styles.infoDot, { backgroundColor: item.color }]}
              ></View>
              <Text style={styles.infoName}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    // backgroundColor: '#3e3e3e',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: -50,
  },
  singleInfo: {
    padding: 5,
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 8,
    marginRight: 5,
  },
  colorBox: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  selectedInfo: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: 'white',
    opacity: 0.7,
    zIndex: 1,
    left: 200,
    top: 240,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default PieChartComponent;