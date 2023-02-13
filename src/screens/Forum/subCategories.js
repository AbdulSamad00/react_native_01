/**
 * Forums Screen
 */

 import React, { useEffect, useState } from "react";
 import {
   View,
   StyleSheet,
   Text,
   ScrollView,
   TextInput,
   Pressable,
   ImageBackground,
   Image,
   TouchableOpacity,
 } from "react-native";
 import moment from "moment";
 import {DevSettings} from 'react-native';
 
 
 // react native hook
 import { useDeviceOrientation } from "@react-native-community/hooks";
 // expo vector icons
 import { AntDesign } from "@expo/vector-icons";
 // Bear all forum date
 import { categoryDate } from "./categorydata";
 import { NavForum } from "../../components/NavForum";
 import { getCategories, getCategory } from "../../api/categories";
 import { getTopics } from "../../api/topics";
 import { TextElement } from "react-native-elements/dist/text/Text";
 import { getInternalPosts } from "../../api/internalPosts";
 import ActivityIndicator from "../../components/ActivityIndicator";
 import { useIsFocused } from "@react-navigation/native";
 const tags =["red","pink","yellow","lightblue","grey","orange","#6C3483","#76D7C4","#196F3D"]
 
 const SubCategories = ({navigation,route}) => {
   const focus = useIsFocused()
   const [categoriess, setCategoriess] = useState([]);
   const [topics, setTopics] = useState([]);
   const { landscape } = useDeviceOrientation();
   const [tagDropdown, setTagDropdown] = useState(false);
   const [searching, setSearching] = useState("");
   const [loading, setLoading] = useState(false);
 
   const handleClickCategory = () => {
     setIsTop(false);
     setIsCategory(true);
   };
   const handleClickTop = () => {
     setIsCategory(false);
     setIsTop(true);
   };
 
   function compare(a,b){
     return (new Date(a.createdAt))- (new Date(b.createdAt)) 
   }
 
 
   useEffect(()=>{
     const data = async()=> {
       setLoading(true)
       setCategoriess([])
       const categoriesData =await getCategory(route.params.id)
     setCategoriess(categoriesData.data.forumSubcategories)
     setLoading(false)
     }
     return  data()
       },[focus])
 
 
 
 
 
   const handleTagsDropdown = () => {
     setTagDropdown(!tagDropdown);
     setCategoryDropdown(false);
   };
 
   return (
     <View style={styles.container} >
 
       <NavForum
    
          onPress={() => {
           navigation.goBack();
         }}
         Text={"Forum"}
       />
               <ActivityIndicator visible={loading} />
 
       <Options
         handleTag={handleTagsDropdown}
         tagMode={tagDropdown}
       />
       {tagDropdown && !categoryDropdown && (
         <Tags_Dropdown
           arr={Tags}
           landscape={landscape}
           val={searching}
           doSearch={setSearching}
         />
       )}
       <ScrollView  >
         <View
           style={[
             styles.forumContainer,
             {
               flexDirection: landscape ? "row" : "column",
             },
           ]}
         >
           <View
             style={[styles.category, { width: landscape ? "50%" : "100%" }]}
           >
             <View style={styles.naming}>
               <Text style={styles.namingText}>Topics</Text>
             </View>
             {  categoriess.length>0 && categoriess.map((item, index) => {
               return (
                 <View key={index}>
                       <TouchableOpacity onPress={()=>{
                          setId(item._id)
                        }
                       } >
                   <Category arr={item} navigation={navigation}/>
                   </TouchableOpacity>
                   {!landscape &&  <Latest data={item?.lastTopic} />}
                 </View>
               );
             })}
           </View>
           {landscape && (
             <View
               style={[styles.latest, { width: landscape ? "50%" : "100%" }]}
             >
               <View style={styles.naming}>
                 <Text style={styles.namingText}>Latest</Text>
               </View>
 
               {categoriess.length>0 && categoriess.map((cat,index) => { 
               return (
                 <View key={index}>
                      {topics[index] &&  <Latest data={topics[index]}  />}
                 </View>
               );
             })}
 
               
            
             </View>
           )}
         </View>
       </ScrollView>
     </View>
   );
 };
 
 /**
  * *OPTIONS:
  * All Category
  * All tags
  * Latest
  * Top
  * Category
  * Docs
  * */
 
 const Options = ({ handleTag, ctgMode, tagMode }) => {
   return (
     <View style={styles.btnContainer}>
       <Pressable
         style={[styles.btn, { borderWidth: 1 }]}
         //onPress={handleCategory}
       >
         <Text style={styles.btnText}>all category</Text>
         {ctgMode ? (
           <AntDesign name="caretdown" color={"#222"} size={12} />
         ) : (
           <AntDesign name="caretright" color={"#222"} size={12} />
         )}
       </Pressable>
       <Pressable style={[styles.btn, { borderWidth: 1 }]} onPress={handleTag}>
         <Text style={styles.btnText}>all tags</Text>
         {tagMode ? (
           <AntDesign name="caretdown" color={"#222"} size={12} />
         ) : (
           <AntDesign name="caretright" color={"#222"} size={12} />
         )}
       </Pressable>
       <View style={styles.btn}>
         <Text style={styles.btnText}>Latest</Text>
       </View>
       <View style={styles.btn}>
         <Text style={styles.btnText}>Top</Text>
       </View>
       <View
         style={[styles.btn, { borderWidth: 0, backgroundColor: "#e45735" }]}
       >
         <Text style={[styles.btnText, { color: "#fff" }]}>Category</Text>
       </View>
       <View style={styles.btn}>
         <Text style={styles.btnText}>Docs</Text>
       </View>
     </View>
   );
 };
 
 /**
  * All tags
  * */
 
 /**
  * Category_Dropdown
  * All category
  * All tags
  * */
 const Tags_Dropdown = ({ arr, landscape, val, doSearch }) => {
   const dropdownFiler = arr.filter((item) => {
     return item.tag.toLowerCase().indexOf(val.toLowerCase()) !== -1;
   });
 
   return (
     <ScrollView
       style={[[styles.dropdownContainer], [landscape && { width: "50%" }]]}
     >
       <View style={styles.searchbar}>
         <TextInput
           style={styles.search}
           value={val}
           onChangeText={doSearch}
           placeholder="Search..."
         />
         <AntDesign name="search1" color={"#222"} size={18} />
       </View>
       {dropdownFiler.map((item, index) => {
         return (
           <View key={index} style={styles.dropdown}>
             <View style={styles.itemContainer}>
               <Text style={styles.itemName}>{item.tag}</Text>
             </View>
           </View>
         );
       })}
     </ScrollView>
   );
 };
 
 /**
  ** Category needs:  //? fullfill through parameter
  * Title
  * Description
  * Buttons Array
  * Right Border color
  */
 
 const Category = ({ arr,navigation  }) => {
   const { _id,name,borderColor  } = arr;
   return (
     <TouchableOpacity onPress={() => {
      navigation.navigate('CategoryIndex', {id : _id}
      
      );
    }}>
 
  <View style={[styles.categoryContainer, { borderLeftColor: borderColor }]}>
       <View style={styles.catgInfo}>
         <Text style={styles.title}>{name}</Text>
       </View>
     </View>
     </TouchableOpacity>
    
   );
 };
 
 const Latest = ({data}) => {
   return (
     <View style={{ width: "100%" }}>
       <View style={styles.person_info}>
         <View style={styles.infos}>
         <Image source={{uri:data?.user?.imageSrc}} style={styles.avatar} />
         <Text >{data?.user?.contactName.first+" "+data?.user?.contactName.last}</Text>
         </View>
         <View style={styles.person_name}>
           <Text style={[styles.title, { fontWeight: "400" }]}>
 {data.title}          </Text>
           <View style={styles.buttonContainer}>
             <View style={styles.box}></View>
             <Text style={styles.tagName}>{data.narrative} </Text>
           </View>
         </View>
         <View style={styles.time}>
           <Text style={styles.week}>0</Text>
           <Text style={styles.week}>{moment(data.createdOn).format("ll").split(',')[0]}</Text>
         </View>
       </View>
     </View>
   );
 };
 
 const styles = StyleSheet.create({
   container: {
     width: "100%",
     height: "100%",
 
     marginTop: 0,
     marginBottom: 100,
   },
   Text: {
     color: "#222",
     fontSize: 18,
     fontWeight: "bold",
   },
   btnContainer: {
     flexDirection: "row",
     paddingHorizontal: 5,
     marginVertical: 5,
     flexWrap: "wrap",
   },
   btn: {
     flexDirection: "row",
     padding: 8,
     alignItems: "center",
     marginHorizontal: 5,
     marginVertical: 5,
   },
   forumContainer: {
     flex: 1,
     width: "100%",
     marginBottom: 50,
   },
   category: {
     paddingHorizontal: 0,
   },
   naming: {
     flexDirection: "row",
     justifyContent: "space-between",
     padding: 10,
     borderBottomWidth: 3,
     borderBottomColor: "#cccccc",
   },
   namingText: {
     color: "#919191",
   },
   categoryContainer: {
    width: "100%",
    borderLeftWidth: 3,
    padding: 10,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#919191",
  },
   catgInfo: {
     width: "80%",
     paddingRight: 5,
   },
   catgWeek: {
     width: "20%",
   },
   title: {
     color: "#222",
     fontWeight: "bold",
     fontSize: 18,
   },
   list: {
     width: "100%",
     flexDirection: "row",
     flexWrap: "wrap",
   },
   buttonContainer: {
     flexDirection: "row",
     alignItems: "center",
   },
   box: {
     width: 8,
     height: 8,
     backgroundColor: "red",
   },
   tagName: {
     marginHorizontal: 5,
   },
   buttonText: {},
   week: {
     color: "#919191",
     fontSize: 15,
     textAlign: "right",
   },
   searchbar: {
     width: "100%",
     borderBottomWidth: 1,
     borderColor: "#919191",
     flexDirection: "row",
     alignItems: "center",
   },
   search: {
     width: "90%",
     padding: 5,
   },
   dropdownContainer: {
     height: 200,
     marginHorizontal: 10,
     borderWidth: 1,
   },
   dropdown: {
     padding: 10,
   },
   itemContainer: {
     flexDirection: "row",
     alignItems: "center",
   },
   itemName: {
     color: "#222",
     fontWeight: "bold",
     fontSize: 18,
     paddingHorizontal: 5,
   },
   multiplier: {
     color: "#919191",
     fontSize: 15,
   },
   /**
    * Latest
    * */
 
   latest: {
     paddingHorizontal: 10,
   },
   person_info: {
     width: "100%",
     borderBottomWidth: 1,
     borderColor: "#919191",
     padding: 10,
     flexDirection: "row",
     justifyContent: "center",
     alignItems: "center",
   },
   infos: {
     width: '30%',
    
     flexDirection: "column",
     justifyContent: "center",
     alignItems: "center",
   },
   avatar: {
     flex:1,
     height: 60,
     borderRadius: 100,
     borderWidth: 1,
     width: "60%",
   },
   person_name: {
     flexGrow: 2,
     width: "60%",
     padding: 10,
   },
   time: {
     flexGrow: 1,
     width: "20%",
     marginRight:20
   },
 });
 
 export default SubCategories;