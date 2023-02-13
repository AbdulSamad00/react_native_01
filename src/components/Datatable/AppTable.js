import { MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import Checkbox from "expo-checkbox";
import { Cell, Table, TableWrapper } from "react-native-table-component";
import { calculateTableData } from "../../utils/calculateTable";
import { state } from "../../../App";
import Animated, {
  scrollTo,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { genderBadge, statusBadge } from "../Badges";

const height = Dimensions.get("window").height;

const percent = state?.isTablet ? 0.9 : 0.6;

const itemsPerPage = Math.round((height * percent) / 60) - 1;

const AppTable = ({
  tableData = [],
  showCheckbox = false,
  showMoreButton = false,
  onButtonClick,
  checked,
  setChecked,
}) => {
  const [columnNames, setColumnNames] = useState([]);
  const [columnsWidth, setColumnsWidth] = useState([]);
  const [filterRows, setfilterRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [avatarIndex, setAvatarIndex] = useState([]);
  const [statusIndex, setStatusIndex] = useState();
  const [genderIndex, setGenderIndex] = useState();
  const [sort, setSort] = useState({ by: 1, asc: true });

  //const getGenderIndex = () => 4;
  //const getStatusIndex = () => 3;
  const getStatusIndex = () => statusIndex - 1;
  const getGenderIndex = () => genderIndex - 1;

  useEffect(() => {
    const result = calculateTableData(tableData, showCheckbox);
    const newData = _.chunk(result.rowsData, itemsPerPage);
    setColumnNames(result.columnNames);
    setColumnsWidth(result.columnsWidth);
    setAvatarIndex(result.avatarIndex);
    setStatusIndex(result.statusIndex);
    setGenderIndex(result.genderIndex);
    setfilterRows(newData);
  }, [tableData]);

  const goback = () => {
    if (currentPage === 0) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };
  const goNext = () => {
    if (currentPage === filterRows.length - 1) {
      return;
    } else {
      setCurrentPage(currentPage + 1);
    }
  };

  const headCheckbox = () => {
    const isChecked = useRef(false);
    const allIds = filterRows[currentPage]
      ? filterRows[currentPage].map((item) => item[0])
      : [];

    for (let i = 0; i < allIds.length; i++) {
      if (!checked.includes(allIds[i])) {
        isChecked.current = false;
        break;
      }
      isChecked.current = true;
    }

    return (
      <Checkbox
        value={isChecked.current}
        onValueChange={(value) => {
          if (value) {
            setChecked(allIds);
          } else {
            setChecked(_.remove(checked, (item) => !allIds.includes(item)));
          }
        }}
      />
    );
  };

  const itemCheckbox = (id) => {
    return (
      <Checkbox
        value={checked.includes(id)}
        onValueChange={(value) => {
          if (value) {
            setChecked((prev) => [...prev, id]);
          } else {
            setChecked((prev) => {
              return prev.filter((item) => item !== id);
            });
          }
        }}
      />
    );
  };

  const viewButton = (id, index) => (
    <Button
      onPress={() => onButtonClick(id)}
      theme={{ colors: { primary: "blue" } }}
    >
      View
    </Button>
  );

  const avatar = (image, username, index) => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        {image ? (
          <Image
            style={{ height: 30, width: 30, borderRadius: 100 }}
            source={{ uri: image }}
          />
        ) : (
          <></>
        )}
        <Text style={{ margin: 8 }}>{username}</Text>
      </View>
    );
  };

  const Header = () => {
    const incAvatarIndex = avatarIndex.map((item) => item + 1);
    return (
      <TableWrapper style={styles.row}>
        {columnNames
          .filter((_, i) => !incAvatarIndex.includes(i))
          .map((cellData, cellIndex) => {
            cellIndex = cellIndex >= 2 - 1 ? cellIndex + 1 : cellIndex;
            return (
              <Cell
                height={60}
                width={columnsWidth[cellIndex]}
                key={cellIndex}
                data={
                  showCheckbox && cellIndex === 0 ? (
                    headCheckbox()
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        setSort({
                          by: cellIndex === 1 ? 2 : cellIndex,
                          asc: cellIndex === sort.by ? !sort.asc : sort.asc,
                        })
                      }
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>{cellData}</Text>
                      {sort.by === cellIndex ? (
                        <>
                          <MaterialCommunityIcons
                            size={sort.asc ? 20 : undefined}
                            name="chevron-up"
                          />
                          <MaterialCommunityIcons
                            size={!sort.asc ? 20 : undefined}
                            name="chevron-down"
                          />
                        </>
                      ) : (
                        <></>
                      )}
                    </TouchableOpacity>
                  )
                }
                textStyle={styles.headerTitle}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            );
          })}
      </TableWrapper>
    );
  };

  const Rows = () => {
    const incAvatarIndex = avatarIndex.map((item) => item + 1);
    if (!filterRows || filterRows.length < 1) return null;
    const { by, asc } = sort;
    const sortedRows = filterRows[currentPage].sort((a, b) =>
      asc
        ? `${a[by]}`.toLowerCase().localeCompare(`${b[by]}`.toLowerCase())
        : `${b[by]}`.toLowerCase().localeCompare(`${a[by]}`.toLowerCase())
    );

    return (
      <>
        {sortedRows.map((rowData, rowIndex) => {
          const itemId = rowData[0];
          return (
            <TableWrapper
              key={rowIndex}
              style={[
                styles.row,
                {
                  backgroundColor: rowIndex % 2 === 0 ? "#fff" : "#eee",
                },
              ]}
            >
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  height={60}
                  width={columnsWidth[cellIndex]}
                  key={cellIndex}
                  data={
                    showCheckbox && cellIndex === 0
                      ? itemCheckbox(itemId)
                      : avatarIndex.includes(cellIndex)
                      ? avatar(
                          rowData[cellIndex],
                          rowData[cellIndex + 1],
                          cellIndex
                        )
                      : cellIndex === genderIndex
                      ? genderBadge(cellData)
                      : cellIndex === statusIndex
                      ? statusBadge(cellData)
                      : showMoreButton && cellIndex == columnNames.length - 1
                      ? viewButton(itemId, cellIndex)
                      : cellData
                  }
                  textStyle={styles.text}
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                />
              )).filter((item,idx) => !incAvatarIndex.includes(idx))}
            </TableWrapper>
          );
        })}
      </>
    );
  };

  const positionX = useSharedValue(0);

  const headerScrollRef = useAnimatedRef();
  const rowsScrollRef = useAnimatedRef();

  const headerScrollHandler = useAnimatedScrollHandler((event) => {
    positionX.value = event.contentOffset.x;
    scrollTo(rowsScrollRef, positionX.value, 0, false);
  });
  const rowsScrollHandler = useAnimatedScrollHandler((event) => {
    positionX.value = event.contentOffset.x;
    scrollTo(headerScrollRef, positionX.value, 0, false);
  });

  return (
    <View style={styles.container}>
      <View style={styles.tableContainer}>
        <Animated.ScrollView
          ref={headerScrollRef}
          onScroll={headerScrollHandler}
          scrollEventThrottle={60}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Header />
          </Table>
        </Animated.ScrollView>
      </View>
      <ScrollView>
        <View style={styles.tableContainer}>
          <Animated.ScrollView
            ref={rowsScrollRef}
            onScroll={rowsScrollHandler}
            scrollEventThrottle={60}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              <Rows />
            </Table>
          </Animated.ScrollView>
        </View>
        <View style={styles.paginition}>
          <TouchableOpacity
            disabled={currentPage === 0}
            style={[
              styles.icon,
              currentPage === 0 && { backgroundColor: "#aaa" },
            ]}
            onPress={goback}
          >
            <MaterialCommunityIcons name="arrow-left" size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            disabled={currentPage === filterRows.length - 1}
            style={[
              styles.icon,
              currentPage === filterRows.length - 1 && {
                backgroundColor: "#aaa",
              },
            ]}
            onPress={goNext}
          >
            <MaterialCommunityIcons name="arrow-right" size={20} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tableContainer: {
    marginHorizontal: 10,
    maxHeight: height * 0.6,
  },
  headerTitle: {
    textAlign: "center",
    fontWeight: "bold",
  },
  text: { textAlign: "center" },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
  paginition: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  icon: {
    padding: 10,
    backgroundColor: "#ddd",
    marginHorizontal: 10,
    borderRadius: 10,
  },
});

export default AppTable;
