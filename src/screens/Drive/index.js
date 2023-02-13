import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  StatusBar,
  TextInput,
  Dimensions,
  ActivityIndicator,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "react-native-elements";
import colors from "../../config/colors";
import CButton from "./components/CButton";
import Menu from "./components/Menu";
import Folder from "./components/Folder";
import { optionsArray, data, fileOptions, menuOptions } from "./constants";
import { DriveModal } from "../../components/drive";
import { Navbar } from "../../components";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import * as IntentLauncher from "expo-intent-launcher";
import * as Device from "expo-device";
import {
  createNewFolder,
  folderTree,
  getFiles,
  renameFile,
  uploadFile,
  deleteItems,
} from "../../api/drive";
import CHeader from "./components/CHeader";
import SideItem from "./components/SideItem";

import FileView from "./components/FileView";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
const width = parseInt(Dimensions.get("window").width);
const height = parseInt(Dimensions.get("window").height);
const blue = "#00B7DD";

export default function Drive({ navigation }) {
  const [menu, setMenu] = useState({
    visible: false,
    selectedOption: false,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedMenu, setSelectedMenu] = useState("");
  const [fileOption, setFileOption] = useState(false);
  const [result, setResult] = useState(false);
  const [layout, setLayout] = useState("grid");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(false);
  const [files, setFiles] = useState([]);
  const [bottomVisible, setBottomVisible] = useState(false);
  const [uploadsExpanded, setUploadsExpanded] = useState(true);
  const [selectedSubMenu, setSelectedSubMenu] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showFile, setShowFile] = useState(false); //wasil
  const [folderName, setCreateFolder] = useState("");
  const [upload, setUpload] = useState(null);
  const [typeAction, setTypeAction] = useState("");
  const [rename, setRename] = useState("");
  const [isShowModalDrive, setIsShowDriveModal] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteMultiple, setIsDeleteMultiple] = useState(false);

  const getFolders = async () => {
    const { ok, data } = await folderTree();
    setLoading(true);
    if (ok) {
      setLoading(false);
      setUploadedFiles(data.children);
    }
  };
  console.log("uploadfiles", uploadedFiles);
  console.log("files", files);
  const sortByName = () => {
    setMenu({ ...menu, visible: false });
    const data = selectedFile ? files : uploadedFiles;
    let res = data.sort(function (a, b) {
      return a.name.localeCompare(b.name);
    });
  };
  const sortByDate = () => {
    setMenu({ ...menu, visible: false });
    const data = selectedFile ? files : uploadedFiles;
    let res = data.sort(function (a, b) {
      return Date.parse(b.modified) - Date.parse(a.modified);
    });
  };
  const sortBySize = () => {
    setMenu({ ...menu, visible: false });
    const data = selectedFile ? files : uploadedFiles;
    let res = data.sort(function (a, b) {
      return a.size > b.size;
    });
  };

  const foldersOnTop = () => {
    setMenu({ ...menu, visible: false });
    const data = selectedFile ? files : uploadedFiles;
    let res = data.sort(function (a, b) {
      return b.type > a.type;
    });
  };

  useEffect(() => {
    getFolders();
  }, []);
  const filesHandler = async () => {
    if (selectedMenu === "") {
      getFolders();
    } else {
      const { ok, data } = await getFiles(`/uploads/${selectedMenu.name}`);
      setLoading(true);
      if (ok) {
        setFiles(data.children);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    if (showFiles && selectedMenu) {
      filesHandler();
    }
  }, [showFiles, selectedMenu]);

  const uploadHandler = async () => {
    try {
      const results = await DocumentPicker.getDocumentAsync();
      if (results.type == "success") {
        setUpload(results.name);
        const path = selectedMenu ? selectedMenu.path : "/";
        const { data, ok } = await uploadFile(results, path);
        if (ok) {
          setTimeout(() => {
            filesHandler();
          }, 2000);
        }
      }
    } catch (e) {
      console.log("callback---", e);
    }
  };

  const uploadFromCamera = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      const result = await ImagePicker.launchCameraAsync();
      if (!result.cancelled) {
        const fileName = result.uri.substring(result.uri.lastIndexOf("/") + 1);
        setUpload(fileName);
        const path = selectedMenu ? selectedMenu.path : "/";
        const { data, ok } = await uploadFile(result, path);
        if (ok) {
          setTimeout(() => {
            filesHandler();
          }, 2000);
        }
      }
    } catch (error) {
      console.log("error_camera", error);
    }
  };
  const renameHandler = async () => {
    if (rename) {
      const newNameFile =
        selectedFile?.type === "file"
          ? `${rename}${selectedFile?.extension}`
          : rename;
      const { data, ok } = await renameFile(newNameFile, selectedFile.path);
      if (ok) {
        setBottomVisible(false);
        setIsShowDriveModal(false);
        setTimeout(() => {
          filesHandler();
        }, 2000);

        setRename("");
      }
    }
  };

  const createFolderHandler = async () => {
    if (folderName) {
      const { ok, data } = await createNewFolder(
        folderName,
        selectedMenu ? selectedMenu.path : "/uploads"
      );
      if (ok) {
        setCreateFolder("");
        setIsShowDriveModal(false);
        setTimeout(() => {
          filesHandler();
        }, 2000);
      } else {
        alert(data.message);
      }
    }
  };
  const openFolder = () => {
    //called if the open selection is clicked on a folder.
    setSelectedFile(selectedFile);
    setShowFiles(true);
    setExpanded(selectedFile);
  };

  const onDeleteHandler = async () => {
    let items = [];
    const checkfile = showFiles ? files : uploadedFiles;
    selectedList.map((item) => {
      items.push(checkfile[item]["path"]);
    });
    const { ok, data } = await deleteItems(items);
    if (ok) {
      setBottomVisible(false);
      setIsDeleteMultiple(false);
      setTimeout(() => {
        filesHandler();
        setSelectedList([]);
      }, 2000);
    }
  };

  const onDownloadFile = async () => {
    try {
      const items = [];
      const listUri = [];
      const listAsset = [];
      const checkfile = showFiles ? files : uploadedFiles;
      selectedList.map((item) => {
        items.push(checkfile[item]);
      });
      for (let index = 0; index < items.length; index++) {
        const response = await FileSystem.downloadAsync(
          `http://backend.itransportindex.com/api${items[index].path}`,
          FileSystem.documentDirectory + `${items[index].name}`
        );
        listUri.push(response);
      }
      if (listUri[0].status === 200) {
        const { status } = await Permissions.askAsync(
          Permissions.MEDIA_LIBRARY
        );
        if (status === "granted") {
          for (let idx = 0; idx < listUri.length; idx++) {
            const asset = await MediaLibrary.createAssetAsync(listUri[idx].uri);
            listAsset.push(asset);
          }
          for (let a = 0; a < listAsset.length; a++) {
            await MediaLibrary.createAlbumAsync(
              "Download",
              listAsset[a],
              false
            );
          }
          setBottomVisible(false);
          setIsDeleteMultiple(false);
          setSelectedList([]);
          Alert.alert("Download Completed", items.length + " files", [
            { text: "OK", onPress: () => {} },
          ]);
        }
      }
    } catch (error) {
      console.log("error_download_file", error);
    }
  };

  return (
    <>
      <FileView
        setModalVisible={setShowFile}
        modalVisible={showFile}
        selectedFile={selectedFile}
      />
      <StatusBar backgroundColor={blue} />
      <SafeAreaView style={styles.container}>
        <Navbar
          color={colors.white}
          onPress={() => {
            navigation.goBack();
          }}
          Text={"Your Drive"}
        />

        <CHeader
          createFolder={folderName}
          setCreateFolder={() => {
            setTypeAction("createfolder");
            setIsShowDriveModal(true);
          }}
          menu={menu}
          setMenu={setMenu}
          layout={layout}
          setLayout={setLayout}
          upload={upload}
          setUpload={() => {
            setTypeAction("upload");
            setIsShowDriveModal(true);
          }}
          selectedSubMenu={selectedSubMenu}
          setSelectedSubMenu={setSelectedSubMenu}
        />
        {/* {showFiles &&
          <>
            <CButton style={{alignSelf:"flex-start"}} name="arrow-back" onPress={()=>{setShowFiles(false);getFolders()}}/>
            <View style={{alignItems:"center",paddingBottom:10}}>
              <Text style={[styles.text,{fontSize:18}]}>{selectedFile.name}</Text>
            </View>
          </>
          } */}
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 0.4 }}>
            <FlatList
              data={uploadedFiles}
              ListEmptyComponent={() => {
                return (
                  <View style={{ padding: 30 }}>
                    <Text>Nothing to show</Text>
                  </View>
                );
              }}
              ListHeaderComponent={() => (
                <View
                  style={[
                    styles.row,
                    { paddingHorizontal: 10, justifyContent: "space-between" },
                  ]}
                >
                  <Text style={[styles.text, { textAlign: "left" }]}>
                    uploads
                  </Text>
                  <TouchableOpacity
                    onPress={() => setUploadsExpanded(!uploadsExpanded)}
                  >
                    <Icon
                      name={uploadsExpanded ? "chevron-up" : "chevron-down"}
                      color={colors.GREY.btnPrimary}
                      type="ionicon"
                      size={21}
                      style={{ marginRight: 5, alignSelf: "flex-end" }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1, paddingTop: 10 }}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) =>
                uploadsExpanded && (
                  <SideItem
                    item={item}
                    selectedFile={selectedFile}
                    files={files}
                    expanded={expanded}
                    setExpanded={setExpanded}
                    onPress={() => {
                      setSelectedMenu(item);
                      setSelectedFile(item);
                      setShowFiles(true);
                      setExpanded(item);
                    }}
                  />
                )
              }
            />
          </View>
          <View style={{ flex: 0.6 }}>
            <FlatList
              data={showFiles ? files : uploadedFiles}
              ListEmptyComponent={() => {
                if (loading) {
                  return (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator
                        color={blue}
                        style={{ paddingTop: 40 }}
                      />
                    </View>
                  );
                }
                if (
                  showFiles ? files.length === 0 : uploadedFiles.length === 0
                ) {
                  return (
                    <View style={{ padding: 30 }}>
                      <Text>Nothing to show</Text>
                    </View>
                  );
                }

                return null;
              }}
              contentContainerStyle={[
                {
                  flexGrow: 1,
                  paddingTop: 70,
                  backgroundColor: colors.GREY.whiteish,
                },
                layout == "grid" && styles.gridView,
              ]}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => {
                return (
                  <Folder
                    list={layout == "list"}
                    item={item}
                    index={index}
                    selectedFile={selectedFile}
                    selectedList={selectedList}
                    onPress={() => {
                      if (isDeleteMultiple) {
                        if (!selectedList.includes(index)) {
                          setSelectedList((prev) => [...prev, index]);
                        } else if (selectedList.includes(index)) {
                          const selectedIndex = selectedList.indexOf(index);

                          if (selectedIndex > -1) {
                            selectedList.splice(selectedIndex, 1);
                          }
                        }
                      } else {
                        setSelectedList([index]);
                      }
                      setSelectedFile(item);
                      setBottomVisible(true);
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
        {menu.visible && !bottomVisible && (
          <Menu
            sortByName={sortByName}
            sortBySize={sortBySize}
            sortByDate={sortByDate}
            foldersOnTop={foldersOnTop}
            selectedSubMenu={selectedSubMenu}
            setSelectedSubMenu={setSelectedSubMenu}
            menuOptions={menuOptions}
            setMenu={setMenu}
            navigation={navigation}
            menu={menu}
            style={{ paddingRight: 30 }}
            selectedFile={selectedFile}
            setShowFile={setShowFile}
            openFolder={openFolder}
          />
        )}

        {/* </SafeAreaView> */}
        {bottomVisible && (
          <Menu
            bottom
            setShowFiles={setShowFiles}
            setBottomVisible={setBottomVisible}
            menuOptions={fileOptions}
            fileOption={fileOption}
            setFileOption={setFileOption}
            selectedFile={selectedFile}
            navigation={navigation}
            setSelectedFile={setSelectedFile}
            deleteHandler={onDeleteHandler}
            setShowFile={setShowFile}
            openFolder={openFolder}
            setRename={() => {
              setTypeAction("rename");
              setIsShowDriveModal(true);
            }}
            onSelectAllFiles={() => {
              const newData = showFiles ? files : uploadedFiles;
              setSelectedList(newData.map((item, index) => index));
              setBottomVisible(false);
              setIsDeleteMultiple(true);
            }}
            onUnSelectFiles={() => {
              setSelectedList([]);
              setBottomVisible(false);
              setIsDeleteMultiple(false);
            }}
            onDownloadFile={onDownloadFile}
            refresh={() => {
              getFolders();
            }}
          
            onOpenFile={ async () => {
              const imageType = ['.jpg', '.png']
              if(imageType.includes(selectedFile.extension)){
                return  navigation.navigate("FileViewer", {
                  imageUrl: `http://backend.itransportindex.com/api${selectedFile.path}`,
                });
              }
              const response = await FileSystem.downloadAsync(
                `http://backend.itransportindex.com/api${selectedFile.path}`,
                FileSystem.documentDirectory + `${selectedFile.name}`
              );

              const file = await FileSystem.getContentUriAsync(response.uri);
              await IntentLauncher.startActivityAsync(
                "android.intent.action.VIEW",
                {
                  data: file,
                  flags: 1,
                }
              );
              return setBottomVisible(false);
              
            }}
            onCheckDownloadFile={() => {
              let items = [];
              const checkfile = showFiles ? files : uploadedFiles;
              selectedList.map((item) => {
                items.push(checkfile[item]);
              });
              const isDowloadfile = items.some((data) => data.type == "folder");
              return isDowloadfile;
            }}
          />
        )}
        <DriveModal
          visible={isShowModalDrive}
          onRequestClose={() => setIsShowDriveModal(!isShowModalDrive)}
        >
          <View style={styles.modal}>
            {typeAction === "upload" ? (
              <>
                <Text style={styles.text}>Select file to upload </Text>
                <CButton text="Choose from phone" onPress={uploadHandler} />
                <CButton text="Choose from Camera" onPress={uploadFromCamera} />
                {upload && upload && <Text style={styles.text}>{upload} </Text>}
              </>
            ) : typeAction === "rename" ? (
              <>
                <Text style={styles.text}>Give New Name </Text>
                <TextInput
                  placeholder="Enter New Name"
                  value={rename}
                  onChangeText={(val) => setRename(val)}
                  style={{ height: 50 }}
                />
              </>
            ) : (
              <>
                <Text style={styles.text}>Create Folder </Text>
                <TextInput
                  placeholder="Enter folder Name"
                  value={folderName}
                  onChangeText={(val) => setCreateFolder(val)}
                  style={{ height: 50 }}
                />
              </>
            )}
            <View style={[styles.row, { justifyContent: "flex-end" }]}>
              <CButton
                text="Confirm"
                onPress={
                  typeAction === "upload"
                    ? () => {
                        setIsShowDriveModal(false);
                        setUpload(null);
                      }
                    : typeAction === "rename"
                    ? renameHandler
                    : createFolderHandler
                }
              />
              <CButton
                text="Cancel"
                onPress={() => {
                  setIsShowDriveModal(false);
                  setUpload(null);
                }}
              />
              <TouchableOpacity></TouchableOpacity>
            </View>
          </View>
        </DriveModal>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    // padding:20
  },
  button: {
    backgroundColor: colors.red,
  },
  row: {
    // flex:1,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    //justifyContent:"space-between"
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "500",
    color: colors.black,
  },
  gridView: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  backdropModal: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
  },
  modal: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
