import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
//import RNFS from 'react-native-fs';
import * as FileSystem from 'expo-file-system';
import FileViewer from 'react-native-file-viewer';
import React from 'react';
  
  const links = [
    {
      //add url link to pdf
      id: 1,
      title: 'PDF',
      link: "https://github.com/vinzscam/react-native-file-viewer/raw/master/docs/react-native-file-viewer-certificate.pdf",
      fileExtension: 'pdf',
    },
    {
     id: 2,
     title: 'DOC (Word)',
     link: '',
     fileExtension: 'doc',
    },
    {
      id: 6,
      title: 'JPG',
      link: '',
      fileExtension: 'jpg',
    },
    {
      id: 7,
      title: 'PPTx',
      link: '',
      fileExtension: 'pptx',
    },
    {
      id: 8,
      title: 'DOCX (Word)',
      link: 'https://hpsnz.org.nz/content/uploads/2020/04/Nutrition-and-Immunity-Website-version.docx',
      fileExtension: 'docx',
    },
    {
     id: 9,
     title: 'XLSX (Excel)',
     link: '',
     fileExtension: 'xlsx',
   },
   {
     id: 10,
     title: 'SVG',
     link: '',
     fileExtension: 'svg',
   },
  ];
 
 const openFileViaFileViewer = function(url, fileExtension) {
//      const localFile = `${FileSystem.DocumentDirectoryPath}/temporaryfile.${fileExtension}`;
 
//      const options = {
//      fromUrl: url,
//      toFile: localFile
//      };
//      FileSystem.downloadFile(options).promise
//      .then(() => FileViewer.open(localFile))
//      .then(() => {
//          // success
//          console.log('success');
//      })
//      .catch(error => {
//          console.log(error);
//          console.log('error');
//      });

const localFile = `${FileSystem.documentDirectory}/temporaryfile.${fileExtension}`;
   FileSystem.downloadAsync(
    url,
    localFile
  )

    .then(({ uri }) => {
      //console.log('Finished downloading to ', uri);
      FileViewer.open(uri,{ showOpenWithDialog: true })
    })
    .catch(error => {
      console.error(error);
    });
 }
 
  const FileviewerScreen = () => (
    <View style={styles.container}>
      {links.map(({id, title, link, fileExtension}) => {
        return (
          <React.Fragment key={id}>
            <View style={styles.separator} />
            <TouchableOpacity
              accessibilityRole={'button'}
              onPress={() => openFileViaFileViewer(link, fileExtension)}
              style={styles.linkContainer}>
              <Text style={styles.link}>{title}</Text>
            </TouchableOpacity>
          </React.Fragment>
        );
      })}
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    linkContainer: {
      flexWrap: 'wrap',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 8,
    },
    link: {
      flex: 2,
      fontSize: 18,
      fontWeight: '400',
      color: '#0000FF',
    },
    separator: {
      backgroundColor: '#000075',
      height: 1,
    },
  });
  
  export default FileviewerScreen;