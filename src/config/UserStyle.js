import { StyleSheet } from "react-native";
import { deviceWidth, NAV_HEIGHT, deviceHeight } from "./CommonStyles";
import colors from "../config/colors";

export const styles = StyleSheet.create({
  nameBox: {
    display: "flex",
    justifyContent: "space-between",
    // marginLeft: 5,
  },
  mediumText: {
    marginTop: 4,
    fontSize: 15,
    color: "rgb(100,100,100)",
  },
  flexWrap: {
    flexWrap: "wrap",
  },
  button: {
    // borderColor: "black",
    // borderBottomWidth:1,
    // borderBottomColor: "rgb(220,220,220)",
    // margin:0.1
    // backgroundColor: "rgb(245,245,245)"
  },
  background: {
    backgroundColor: "rgb(228, 229, 231)",
    height: deviceHeight + 50,
  },
  smallText: {
    fontSize: 12,
    color: "grey",
    marginTop: 5,
    alignSelf: "flex-end",
  },
  justifyContent: {
    justifyContent: "space-between",
    marginRight: 10,
  },
  justifyContent2: {
    justifyContent: "space-evenly",
    // marginRight: 10,
    // paddingRight: 20,
    // paddingLeft:20,
  },
  textBox: {
    padding: 10,
    width: deviceWidth - 95,
    borderBottomWidth: 1,
    borderColor: "lightgrey",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "rgb(90,90,90)",
  },
  textBody: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
    color: "grey",
  },

  margin: {
    marginTop: NAV_HEIGHT,
  },

  box: {
    backgroundColor: "rgb(240,240,240)",
    padding:6,
    
    borderRadius: 10
  },
  eventPranav: {
    display: "flex",
    flexDirection: "column",
  },
  roundImage: {
    alignItems: "center",
    justifyContent: "space-around",
    width: 60,
    height: 60,
    borderRadius: 70,
    margin: 10,
    backgroundColor: "rgb(230,230,230)",
    // overflow: "hidden",
    borderWidth:5,
    borderColor: "white",
    // elevation: 2,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  alignTextCenter:{
    display: "flex",
    flexDirection: "column",
    alignItems:"center"
  },
  textP: {
    fontSize: 23,
    color: colors.BLUE.secondary,
  },
  margin2:{
    margin: 10,
    marginTop:60,
    marginBottom: 30,

  },
  box2:{
    backgroundColor: "white",
    padding: 15,
    borderWidth: .3,
    borderColor: "lightgrey",
    elevation:5,
    borderRadius: 5,
  },
  profileUp:{
    position: "absolute",
    top: -40,
    left: deviceWidth - deviceWidth/2 - 50,
    transform: [{scale: 1.4}]
  },
  margin3:{
    // marginTop: 10,
  },
  halfWidth:{
    width: deviceWidth/2 -50,
  },
  margin4:{
    marginTop: 16
  },
  margin5:{
    marginRight: 20
  },
  imageStyle:{
    width: 25,
    height: 20,
    paddingTop: 10,
    position: "absolute",
    right: 0,
    top:3
  },
  ToolTip:{
    padding: 15,
    // position: "absolute",
    backgroundColor: "white",
     width: 170,
    // height: 140,
  },
  texttitle2:{
    fontSize: 27
  },
  text3:{
    fontSize:16,
    color: "rgb(90,90,90)",
    marginBottom: 5
  },
  text4:{
    fontSize:17,
    color: "rgb(90,90,90)"
  },
  text5:{
    fontSize: 16
  },
  marginBottom:{
    marginBottom: 10
  },
  alignItemsRight:{
    alignSelf: "flex-end",
  },
  closeIcon:{
    width:30,
    height:30
  },
  smallIcon:{
    height:20,
    width:20,
  },
  margin6:{
    marginRight: -15
  },
  bold:{
    fontWeight: "bold",
    fontSize: 14
  }

});

// ios design

export const iosstyle = StyleSheet.create({
  marginTBAll:{
    margin:5,
    marginTop: 20,
    marginBottom:20
  },
  paddingAll:{
    padding: 14
  },
  bgWhite: {
    backgroundColor: "rgb(255,255,255)",
    color: "rgb(90,90,90)",
    
  },
  roundBorder:{
    borderRadius: 14,
    overflow: "hidden",
    elevation:4
  },
  iosstyle:{
    display: "flex"
  },
  bgGrey:{
    backgroundColor: "rgb(230,230,230)"
  },
  roundedImageProfile:{
    alignItems: "center",
    justifyContent: "space-around",
    width: 70,
    height: 70,
    margin: 10,
    backgroundColor: "rgb(220,220,220)",
  },
  flex:{
    display: "flex",
    flexDirection: "row"
  },
  spaceB:{
    alignItems: "center"
  },
  titleText:{
    fontSize: 22,
    fontWeight: "bold",
    color:"black"
  },
  marginLeft:{
    marginLeft: 10
  },
  padding:{
    padding: 7
    // marginTop: 3
  },
  meidumText:{
    fontSize: 14.5,
    color:"rgb(30,30,30)"
  },
  smallIcon:{
    width: 15,
    height: 15,
  },
  marginR:{
    marginRight: 4
  },
  textlight:{
    color:"rgb(90,90,90)"
  },
  opacityhalf:{
    opacity: 0.4
  },
  column:{
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  paddingTB:{
    paddingTop:10,
    paddingBottom: 10
  },
  paddingLarge:{
    marginTop: 15,
    paddingRight: 25,
    paddingLeft: 25,
    marginBottom: 15
  },
  spaceevenly:{
    justifyContent: "space-evenly"
  },

  bgWhite2:{
    backgroundColor: "white"
  },
  mediumIcon:{
    margin: 10,
    width: 60,
    height: 55,
    // overflow: "hidden"
  },
  border:{
    borderWidth: 2,
    borderColor: "lightgrey"
  },
  bold:{
    fontWeight: "bold",
    fontSize:14
  },
  absolute:{
    position: "absolute",
    
  },
  topLeft:{
    top: 20,
    right: 20
  },
  smallIcon2:{
    width: 20,height: 20
  },
  rightTop:{
    top:10,
    right:0
  },
  padding2:{
    padding:15
  },
  padding3:{
    paddingLeft:20
  },
  paddingSmall:{
    // padding:5,
    margin:5,
    padding:5,
    paddingLeft: 20,
    paddingRight: 20
  },
  inputSearchBorder:{
    borderRadius: 7,
    borderWidth: 1,
    // paddingRight: ,
    paddingLeft: 10,
    borderColor: "lightgrey"
  },width2:{
    width: deviceWidth-200
  },
  mediumIcon2:{
    width:20, height: 30,
    marginTop: 5,
    overflow: "hidden"
  },
  marginTopsmall:{
    color: "rgb(110,110,110)"
  },
  opacityHalf:{
    opacity: 0.4
  },
  addImage:{
    borderWidth: .3,
    backgroundColor: "white",
    width:40,height: 40,
    overflow:"hidden",
    borderColor:"lightgrey",
    position:"absolute",
    top:0,
  },
  spaceBetween:{
    justifyContent:"space-between"
  }, 
  width4:{
    width: deviceWidth - 40,
    maxWidth: 500,
    
  },
  flexWrap1:{
    flexWrap: "wrap"
  },
  alignbase:{
    alignItems: "center"
  },
  marginBSmall: {
    marginBottom:10
  }, 
  paddingSmall2:{
    padding: 6
  },
  titleText2:{
    fontSize:18,
    fontWeight: "bold",
    color: "rgb(80,80,80)"
  },
  mediumText3:{
    fontSize: 13
  },
  blue:{
    color: colors.BLUE.secondary
  },
  green:{
    color: colors.GREEN.default
  },
  text3:{
    fontSize: 17,
  },
  borderBlack:{
    borderWidth:1,
    borderColor: "lightgrey"
  },
  colorWhite:{
    fontWeight: "bold",
    fontSize: 20,
  },
  bgBlack2:{
    backgroundColor: "black"
  },
  paddingX:{
    paddingRight: 50, 
    paddingLeft: 50 
  },
  colorblack:{
    color: "black"
  },
  smallMedium:{
    margin:15,
    width:10,
    overflow: "hidden",
    height:40
  },
  marginTop4:{
 marginTop: 10,
 paddingBottom:0,
 marginBottom: 0,
 paddingTop:0,
  },
  marginAll:{
    margin: 10,
    marginTop:0
  },
  bgGrey2:{
    backgroundColor: "rgb(245,245,245)"
  }

  
})