import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../../config/colors";
import MenuItem from "./MenuItem";

export default function Menu({
  sortByName,
  sortByDate,
  sortBySize,
  foldersOnTop,
  setMenu,
  menu,
  style = {},
  bottom,
  navigation,
  setSelectedFile,
  selectedFile,
  deleteHandler,
  setShowFiles,
  setBottomVisible,
  setRename,
  refresh,
  selectedSubMenu,
  setSelectedSubMenu,
  onSelectAllFiles,
  onUnSelectFiles,
  onDownloadFile,
  onCheckDownloadFile,
  onOpenFile,
}) {
  const [showHiddenFiles, setShowHiddenFiles] = useState(false);
  const [showFoldersFirst, setShowFoldersFirst] = useState(false);
  return (
    <>
      {bottom ? (
        <View style={[styles.bottomModal, { padding: 0 }]}>
          <TouchableOpacity
            onPress={() => {
              setBottomVisible(false);
            }}
          >
            <Icon
              name={"close"}
              color={colors.GREY.secondary}
              type="ionicon"
              size={20}
              style={{
                alignSelf: "flex-end",
                paddingHorizontal: 15,
                paddingTop: 10,
              }}
            />
          </TouchableOpacity>
          <ScrollView
            contentContainerStyle={{ padding: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <MenuItem
              disabled={onCheckDownloadFile()}
              label={"Download files  "}
              iconName="download"
              iconType="font-awesome-5"
              onPress={() => onDownloadFile()}
            />
            <MenuItem
              disabled={selectedFile.type == "folder"}
              label={"Copy Selection  "}
              iconName="copy"
              iconType="font-awesome-5"
            />
            <MenuItem
              label={"Delete Files    "}
              iconName="trash"
              iconType="font-awesome-5"
              onPress={() => deleteHandler()}
            />
            <MenuItem
              label={"Open Selection  "}
              iconName="box-open"
              iconType="font-awesome-5"
              onPress={() => onOpenFile()}
            />
            <MenuItem
              label={"Clear Selection "}
              iconName="eraser"
              iconType="font-awesome-5"
              onPress={() => onUnSelectFiles()}
            />
            <MenuItem
              label={"Select All Files"}
              iconName="download"
              iconType="font-awesome-5"
              onPress={() => onSelectAllFiles()}
            />
            <MenuItem
              label={"Get Link        "}
              iconName="share-alt"
              iconType="font-awesome-5"
              onPress={() => setBottomVisible(false)}
            />
            <MenuItem
              label={"Rename          "}
              iconName="minus"
              iconType="font-awesome-5"
              onPress={() => {
                setRename();
              }}
            />
            <MenuItem
              label={"Archive Files   "}
              iconName="file-archive"
              iconType="font-awesome-5"
              onPress={() => setBottomVisible(false)}
            />
            <MenuItem
              label={"Refresh         "}
              iconName="refresh"
              iconType="material-community"
              onPress={() => {
                setBottomVisible(false);
                refresh();
              }}
            />
            <MenuItem
              label={"Deep Research   "}
              iconName="search"
              iconType="font-awesome-5"
              onPress={() => setBottomVisible(false)}
            />
            <MenuItem
              label={"Meta Info       "}
              iconName="info-circle"
              iconType="font-awesome-5"
              onPress={() => setBottomVisible(false)}
            />
          </ScrollView>
        </View>
      ) : (
        <View style={[styles.container]}>
          <TouchableOpacity
            onPress={() => {
              setMenu({ ...menu, visible: false });
              setSelectedSubMenu(false);
            }}
          >
            <Icon
              name={"close"}
              color={colors.GREY.secondary}
              type="ionicon"
              size={20}
              style={{ alignSelf: "flex-end", paddingLeft: 15 }}
            />
          </TouchableOpacity>
          {selectedSubMenu && selectedSubMenu == "options" ? (
            <View style={style}>
              <MenuItem
                label={"Sort By Name "}
                onPress={() => sortByName()}
                iconName="sort-amount-down-alt"
                iconType="font-awesome-5"
              />
              <MenuItem
                label={"Sort By Date "}
                onPress={() => sortByDate()}
                iconName="minus"
                iconType="font-awesome-5"
              />
              <MenuItem
                label={"Sort by Size "}
                onPress={() => sortBySize()}
                iconName="minus"
                iconType="font-awesome-5"
              />
              <MenuItem
                label={"Show Hidden Files"}
                onPress={() => {
                  setMenu({ ...menu, visible: false });
                }}
                switch
                value={showHiddenFiles}
                setValue={setShowHiddenFiles}
              />
              <MenuItem
                label={"Show folders First"}
                onPress={() => foldersOnTop()}
                switch
                value={showFoldersFirst}
                setValue={setShowFoldersFirst}
              />
            </View>
          ) : selectedSubMenu && selectedSubMenu == "actions" ? (
            <View style={style}>
              <MenuItem
                label={"Delete directory "}
                iconName="eraser"
                iconType="font-awesome-5"
                onPress={() => setMenu({ ...menu, visible: false })}
              />
              <MenuItem
                label={"Download files  "}
                iconName="download"
                iconType="font-awesome-5"
                onPress={() => setMenu({ ...menu, visible: false })}
              />
              <MenuItem
                label={"Copy Selection  "}
                iconName="copy"
                iconType="font-awesome-5"
                onPress={() => setMenu({ ...menu, visible: false })}
              />
              <MenuItem
                label={"Clear Selection "}
                iconName="eraser"
                iconType="font-awesome-5"
                onPress={() => setMenu({ ...menu, visible: false })}
              />
              <MenuItem
                label={"Open Selection  "}
                iconName="box-open"
                iconType="font-awesome-5"
                onPress={() => setMenu({ ...menu, visible: false })}
              />
              <MenuItem
                label={"Delete Files    "}
                iconName="trash"
                iconType="font-awesome-5"
                onPress={() => setMenu({ ...menu, visible: false })}
              />
              <MenuItem
                label={"Select All Files"}
                iconName="download"
                iconType="font-awesome-5"
                onPress={() => setMenu({ ...menu, visible: false })}
              />
            </View>
          ) : (
            <View style={style}>
              <MenuItem
                label={"Options"}
                onPress={() => setSelectedSubMenu("options")}
              />
              <MenuItem
                label={"Actions"}
                onPress={() => setSelectedSubMenu("actions")}
              />
            </View>
          )}
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 120,
    right: 15,
    // width:140,
    paddingRight: 20,
    padding: 10,
    elevation: 1,
    backgroundColor: colors.white,
  },

  bottomModal: {
    // flex:1,
    position: "absolute",
    width: "100%",
    maxHeight: "55%",
    bottom: 0,
    backgroundColor: "#f5f5f5",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 17,
    elevation: 1,
  },
});
{
  /* {menuOptions && menuOptions.map((item,i)=>(
                <TouchableOpacity style={styles.itemContainer} onPress={()=>setMenu({visible:false,selectedOption:item})}>
                <Text style={styles.label}>{item.label}</Text>
              </TouchableOpacity>
            ))} */
}

{
  /* {menuOptions && menuOptions.map((item,i)=>(               
            ))} */
}
