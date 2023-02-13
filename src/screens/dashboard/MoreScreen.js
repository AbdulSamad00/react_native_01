import "react-native-gesture-handler";
import React, { Component, useState } from "react";
import {SafeAreaView,StyleSheet,Image,View,Text,TouchableOpacity,Switch,} from "react-native";
import { Navbar4, AppText, Appbtn } from "../../components";
import { w, h } from "react-native-responsiveness";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "./../../auth/context";
import authStorage from "./../../auth/storage";
import PinKey from "./../../auth/pincode";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/core";


const MoreTab = ({ title, navigateTo, Icon, isSub = false }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(navigateTo);
      }}
      style={isSub ? styles.subMenuView : styles.ContainerView}
    >
      <View style={styles.LeftContainer}>
        <Icon />
        <Text style={styles.TextContainer}>{title}</Text>
      </View>
      <View style={styles.RightContainer}>
        <Image style={styles.icons} source={require("../../assets/next.png")} />
      </View>
    </TouchableOpacity>
  );
};

const MultipleMoreTab = ({ title, Icon, children }) => {
  const [switchSubMenu, setSwitchSubMenu] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setSwitchSubMenu(!switchSubMenu)}
        style={styles.ContainerView}
      >
        <View style={styles.LeftContainer}>
          <Icon />
          <Text style={styles.TextContainer}>{title}</Text>
        </View>
        <TouchableOpacity style={styles.RightContainer}>
          <Image
            style={[styles.icons, switchSubMenu && styles.rotateImage]}
            source={require("../../assets/next.png")}
          />
        </TouchableOpacity>
      </TouchableOpacity>

      {switchSubMenu && <View>{children}</View>}
    </>
  );
};

export class MoreScreen extends Component {
  static contextType = AuthContext;
  state = {
    AppoinmentSwitch: false,
    PopupReminder: false,
    switchSubMenu: false,
  };

  handleLogout = async () => {
    let { setUser } = this.context;
    setUser(null);
    authStorage.deleteToken();
    //await AsyncStorage.removeItem("@pin_Key");
    await PinKey.deletePincode();
  };
  render() {
    //let {setUser} = this.context;
    return (
      <KeyboardAwareScrollView>
        <View style={styles.Container}>
          <SafeAreaView />
          <Navbar4 Text={"More"} />


          {/* 14 */}
          <MoreTab
            title="My Profile"
              navigateTo="Myaccount"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/myprofile.png")}
              />
            )}

          />
          {/* end */}

          {/* 1.4 */}
          <MultipleMoreTab
            title="My Profile"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/myprofile.png")}
              />
            )}
          >
            <MoreTab
              title="About Me"
              navigateTo="Myaccount"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/about.png")}
                />
              )}
            />
            <MoreTab
              title="Address"
              navigateTo="Address"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/address.png")}
                />
              )}
            />

            <MoreTab
              title="Phones"
              navigateTo="Phones"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/phone.png")}
                />
              )}
            />

            <MoreTab
              title="Working Hours"
              navigateTo="WorkingHours"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/workinghours.png")}
                />
              )}
            />

            <MoreTab
              title="Bank"
              navigateTo="BankAccount"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/bank2.png")}
                />
              )}
            />
            <MoreTab
              title="Insurances"
              navigateTo="Insurances"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/insurance.png")}
                />
              )}
            />
            <MoreTab
              title="Business Info"
              navigateTo="BusinessProfile"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/business.png")}
                />
              )}
            />
            <MoreTab
              title="Membership"
              navigateTo="Membership"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/membership.png")}
                />
              )}
            />
            <MoreTab
              title="Change Password"
              navigateTo="ChangePassword"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/password.png")}
                />
              )}
            />
			
            <MoreTab
              title="Skills & Certification"
              navigateTo="SkillsCertification"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/education.png")}
                />
              )}
            />
			
          </MultipleMoreTab>

          {/* 1.4 */}
          <MultipleMoreTab
            title="Medical Files"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/medicalfile.png")}
              />
            )}
          >
            <MoreTab
              title="Add Homeopathy Session"
              navigateTo="HomeoPathySession"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/homeosession.png")}
                />
              )}
            />
            <MoreTab
              title="Add TCM Session"
              navigateTo="TCMSession"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/yinyang.jpg")}
                  
                />
              )}
            />

            <MoreTab
              title="Add Ayurveda Session"
              navigateTo="AyurvedaSession"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/ohm-symbol.png")}
                />
              )}
            />

            <MoreTab
              title="Medical Files"
              navigateTo="MedicalFilesScreen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/medicalrecord.png")}
                />
              )}
            />
            <MoreTab
              title="Physical Condition"
              navigateTo="PhysicalCondition"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/humanbody.png")}
                />
              )}
            />
            <MoreTab
              title="Manage Physical Conditions"
              navigateTo="PhysicalConditions"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/humanbody.png")}
                />
              )}
            />

            <MoreTab
              title="Search in Medical Files"
              navigateTo="SearchMedicalFiles"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}
          {/* 1.5 */}
          <MultipleMoreTab
            title="Planning and Scheduler"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/planning.png")}
              />
            )}
          >
            <MoreTab
              title="Calendar"
              navigateTo="Calendar"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/dailyplanner.png")}
                />
              )}
            />
            <MoreTab
              title="Agenda"
              navigateTo="Agenda"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/agenda.png")}
                />
              )}
            />
            {/* <MoreTab
              title="Scheduler"
              navigateTo="Scheduler"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/scheduler.png")}
                />
              )}
            /> */}
            <MoreTab
              title="Appointments"
              navigateTo="Appointments"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/appointment1.png")}
                />
              )}
            />
            <MoreTab
              title="Requests for Appointment"
              navigateTo="Requests for Appointment"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/requestforappt.png")}
                />
              )}
            />
              <MoreTab
            title="Timeline of Appointments"
            navigateTo="TimelineAppointments"
            isSub={true}			
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/stopwatch.png")}
              />
            )}
          />
          {/* 15 */}
          <MoreTab
            title="Schedulerf"
            navigateTo="Schedulerf" // replace navigate to when the screen is made
            isSub={true}						
            Icon={() => <Fontisto name="date" size={30} color={"#003c75"} />}
          />
          {/* end */}
		  
          </MultipleMoreTab>
		  
          {/* end */}
          <MultipleMoreTab
            title="Human Resources"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/employment.jpg")}
              />
            )}
          >
            <MoreTab
              title="Certificates"
              navigateTo="HR"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}

                  source={require("../../assets/icons/certificate.png")}

                />
              )}
            />
            <MoreTab
              title="Leaves"
              navigateTo="Leaves"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/leave.png")}
                />
              )}
            />
            <MoreTab
              title="Skills"
              navigateTo="Skills"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/skills.png")}
                />
              )}
            />
            <MoreTab
              title="Shifts"
              navigateTo="Shifts"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/shift.png")}
                />
              )}
            />

              <MoreTab
            title="TimelineAttendances"
            navigateTo="TimelineAttendances"
            isSub={true}			
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/stopwatch.png")}
              />
            )}
          />
			
          </MultipleMoreTab>
		  
          {/* end */}
          <MultipleMoreTab
            title="ERO"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/lifejacket.png")}
              />
            )}
          >
            <MoreTab
              title="ERO"
              navigateTo="EROs"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/lifejacket.png")}
                />
              )}
            />
            <MoreTab
              title="Area"
              navigateTo="EROs"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/lifejacket.png")}
                />
              )}
            />
			
            <MoreTab
              title="Incidents"
              navigateTo="Incidents"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/incident.png")}
                />
              )}
            />
          </MultipleMoreTab>
		  
          {/* 1.2 */}
          <MultipleMoreTab
            title="Kanban"
            navigateTo="Kanban" // replace navigate to when the screen is made
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/kanban.png")}
              />
            )}
          >
            <MoreTab
              title="Kanban"
              navigateTo="KanbanBoard"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/kanban.png")}
                />
              )}
            />

            <MoreTab
              title="Manage Kanbans"
              navigateTo="Kanbans"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/kanban.png")}
                />
              )}
            />
            <MoreTab
              title="Admin Kanbans"
              navigateTo="AdminKanbans"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/kanban.png")}
                />
              )}
            />
			
            <MoreTab
              title="Grid Kanbans"
              navigateTo="GridKanbans"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/kanban.png")}
                />
              )}
            />

            <MoreTab
              title="Manage Tasks"
              navigateTo="Tasks"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/notepinned.png")}
                />
              )}
            />
			
            <MoreTab
              title="Timeline of Tasks"
              navigateTo="TimelineofTasks"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/stopwatch.png")}
                />
              )}
            />
		
          </MultipleMoreTab>
          {/* end */}

          {/* 1.5 */}
          <MultipleMoreTab
            title="Tickets & Support"
            //navigateTo="TermsofUse"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/tickets.png")}
              />
            )}
          >
            
            <MoreTab
              title="Add Ticket"
              navigateTo="OperationsTicket"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/ticket.jpg")}
                />
              )}
            />

            <MoreTab
              title="Tickets"
              navigateTo="Tickets"
              isSub={true}
              Icon={() => (
                <FontAwesome5 name="ticket-alt" size={25} color={"#003c75"} />
              )}
            />
            <MoreTab
              title="Grid View of Tickets"
              navigateTo="GridTickets"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/ticket.jpg")}
                />
              )}
            />
            <MoreTab
              title="Timeline of Tickets"
              navigateTo="Timeline of Tickets"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/stopwatch.png")}
                />
              )}
            />
            <MoreTab
              title="Search in Tickets"
              navigateTo="SearchTickets"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 13 */}
          <MoreTab
            title="Rate Us"
            navigateTo="Rate Us" // replace navigate to when the screen is made
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/star.png")}
              />
            )}
          />
          {/* end */}

          <MoreTab
            title="Fileviewer"
            navigateTo="FileviewerScreen" // replace navigate to when the screen is made
            Icon={() => <Fontisto name="date" size={30} color={"#003c75"} />}
          />

          <MultipleMoreTab
            title="Forums"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/forum1.png")}
              />
            )}
          >
            <MoreTab
              title="Add Topic"
              navigateTo="createPost"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/topic.png")}
                />
              )}
            />

            <MoreTab
              title="Forums"
              navigateTo="Forum"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/category.png")}
                />
              )}
            />
            <MoreTab
              title="Category Idex"
              navigateTo="CategoryIndex"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/category.png")}
                />
              )}
            />
            <MoreTab
              title="Add Category"
              navigateTo="OperationsCategory"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/category.png")}
                />
              )}
            />

            <MoreTab
              title="Search in Forums for topic"
              navigateTo="Searchforum"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
          </MultipleMoreTab>

          <MultipleMoreTab
            title="Directory List of Clinics"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/directorylist.png")}
              />
            )}
          >
            <MoreTab
              title="FishboneChart"
              navigateTo="FishboneChart"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/directorylist.png")}
                />
              )}
            />
              <MoreTab
              title="PieChart"
              navigateTo="PieChart"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/directorylist.png")}
                />
              )}
            />
            <MoreTab
              title="Direcotry List of Clinics"
              navigateTo="DirectoryList"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/directorylist.png")}
                />
              )}
            />
            {/* <MoreTab
              title="BusinessProfile"
              navigateTo="BusinessProfile"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
            /> */}
            <MoreTab
              title="Search in Clinics"
              navigateTo="SearchClinics"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          <MultipleMoreTab
            title="Manage Clinics"
            isSub={true}			
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/company.png")}
              />
            )}
          >
            <MoreTab
              title="Clinics"
              navigateTo="Clinics"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
            />
            <MoreTab
              title="Add Clinic"
              navigateTo="OperationsClinic"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
            />
            <MoreTab
              title="Search in Clinics"
              navigateTo="SearchClinics"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          <MultipleMoreTab
            title="Manage Companies"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/company.png")}
              />
            )}
          >
            <MoreTab
              title="Companies"
              navigateTo="Companies"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
            />
            <MoreTab
              title="Add Company"
              navigateTo="OperationsCompany"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/company.png")}
                />
              )}
            />
            <MoreTab
              title="Search in Companies"
              navigateTo="SearchCompaniess"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.4 */}
          <MultipleMoreTab
            title="Manage Users"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/addressbook.png")}
              />
            )}
          >
            <MoreTab
              title="Users"
              navigateTo="Users"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/users.png")}
                />
              )}
            />
            <MoreTab
              title="Add Edit User"
              navigateTo="OperationsUser"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/users.png")}
                />
              )}
            />

            <MoreTab
              title="Patients"
              navigateTo="Patients"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/patient.png")}
                />
              )}
            />
            <MoreTab
              title="Add Patient"
              navigateTo="OperationsPatient"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/patient.png")}
                />
              )}
            />
            <MoreTab
              title="Accountants"
              navigateTo="Accountants"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/accountant.png")}
                />
              )}
            />
            <MoreTab
              title="Add Accountant"
              navigateTo="OperationsAccountant"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/accountant.png")}
                />
              )}
            />

            <MoreTab
              title="Receptions"
              navigateTo="Receptions"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/bell.png")}
                />
              )}
            />
            <MoreTab
              title="Add Reception"
              navigateTo="OperationsReception"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/bell.png")}
                />
              )}
            />

            <MoreTab
              title="Doctors"
              navigateTo="Doctors"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/doctor.png")}
                />
              )}
            />
            <MoreTab
              title="Add Doctor"
              navigateTo="OperationsDoctor"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/doctor.png")}
                />
              )}
            />

            <MoreTab
              title="Freelancers"
              navigateTo="Freelancers"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/boat.png")}
                />
              )}
            />
            <MoreTab
              title="Add Edit Freelancer"
              navigateTo="OperationsFreelancer"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/boat.png")}
                />
              )}
            />

            <MoreTab
              title="EROs"
              navigateTo="EROs"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/lifejacket.png")}
                />
              )}
            />
            <MoreTab
              title="Add Edit ERO"
              navigateTo="OperationsERO"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/lifejacket.png")}
                />
              )}
            />
			
            <MoreTab
              title="Search in Users"
              navigateTo="SearchUsers"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
			
          </MultipleMoreTab>
          {/* end */}

          {/* 1.9 */}
          <MultipleMoreTab
            title="Accounting"
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/accounting.png")}
              />
            )}
          >
            <MoreTab
              title="Settings"
              navigateTo="Settings"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/setting.png")}
                />
              )}
            />
            <MoreTab
              title="Invoices"
              navigateTo="Invoices"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/invoice.jpg")}
                />
              )}
            />
            <MoreTab
              title="InvoiceProfile"
              navigateTo="InvoiceProfile"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/invoice.jpg")}
                />
              )}
            />
            <MoreTab
              title="Expenses"
              navigateTo="Expenses"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/expense.png")}
                />
              )}
            />
            <MoreTab
              title="COAs"
              navigateTo="COAs"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/COA.png")}
                />
              )}
            />
            <MoreTab
              title="Transactions"
              navigateTo="Transactions"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/transactions.png")}
                />
              )}
            />
            <MoreTab
              title="Profit Loss Statement"
              navigateTo="ProfitLossStatement"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/profitloss.jpg")}
                />
              )}
            />

            <MoreTab
              title="Reports"
              navigateTo="Charts"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/BI.jpg")}
                />
              )}
            />
            <MoreTab
              title="Products"
              navigateTo="Products"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/product.png")}
                />
              )}
            />
            <MoreTab
              title="Services"
              navigateTo="Services"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/service.png")}
                />
              )}
            />

            <MoreTab
              title="Payment Details"
              navigateTo="PaymentsDetails"
              isSub={true}			  
              Icon={() => (
                <MaterialIcons name="payment" size={30} color={"#003c75"} />
              )}
            />
            <MoreTab
              title="Search in Accounting"
              navigateTo="SearchAccounting"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.2 */}
          <MultipleMoreTab
            title="Books"
            navigateTo="Books" // replace navigate to when the screen is made
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/books.png")}
              />
            )}
          >
            <MoreTab
              title="Materia Medica TCM"
              navigateTo="MateriaMedicaTCM"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/mortarpestle.png")}
                />
              )}
            />

            <MoreTab
              title="Materia Medica TCM"
              navigateTo="MateriaMedicaTCM"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/mortarpestle.png")}
                />
              )}
            />

            <MoreTab
              title="Acupuncture"
              navigateTo="Acupuncture"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/acuneedles.jpg")}
                />
              )}
            />
            <MoreTab
              title="Formulas TCM"
              navigateTo="FormulasTCM"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/formulas.png")}
                />
              )}
            />
            <MoreTab
              title="Meridians"
              navigateTo="Meridians"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/meridians1.png")}
                />
              )}
            />

            <MoreTab
              title="Materia Medica Ayurveda"
              navigateTo="MateriaMedicaAyurveda"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/mortarpestle.png")}
                />
              )}
            />
            <MoreTab
              title="Materia Medica Homeopathy"
              navigateTo="MateriaMedicaHomeo"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/mortarpestle3.png")}
                />
              )}
            />

            <MoreTab
              title="Henry C. Allen"
              navigateTo="Allen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/allen.jpg")}
                />
              )}
            />

            <MoreTab
              title="Boericke"
              navigateTo="Boericke"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/boericke.jpg")}
                />
              )}
            />
            <MoreTab
              title="Borger"
              navigateTo="Borger"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/boger.jpg")}
                />
              )}
            />

            <MoreTab
              title="Clarke"
              navigateTo="Clarke"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/clarke.jpg")}
                />
              )}
            />
            <MoreTab
              title="Dunham"
              navigateTo="Dunham"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/dunham.jpg")}
                />
              )}
            />

            <MoreTab
              title="Farrington"
              navigateTo="Farrington"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/farrington.jpg")}
                />
              )}
            />
            <MoreTab
              title="Henry N. Guernsey"
              navigateTo="Guernsey"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/guernsey.jpg")}
                />
              )}
            />

            <MoreTab
              title="Hahnemann"
              navigateTo="Hahnemann"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/hahnemann.jpg")}
                />
              )}
            />

            <MoreTab
              title="Hering"
              navigateTo="Hering"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/hering.jpg")}
                />
              )}
            />

            <MoreTab
              title="J. T. Kent"
              navigateTo="Kent"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/kent.jpg")}
                />
              )}
            />
            <MoreTab
              title="A. Von Lippe"
              navigateTo="Lippe"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/lippe.jpg")}
                />
              )}
            />

            <MoreTab
              title="Mure"
              navigateTo="Mure"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/mure.jpg")}
                />
              )}
            />
            <MoreTab
              title="Nash"
              navigateTo="Nash"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/authors/nash.jpg")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}
          {/* 1.4 */}
          <MultipleMoreTab
            title="Messenger"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/messages.png")}
              />
            )}
          >
            <MoreTab
   			  title="ContactsList"			
			  navigateTo="ContactsList" // replace navigate to when the screen is made			
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/users.png")}
                />
              )}
            />
            <MoreTab
              title="VideoCall"
              navigateTo="CameraScreen"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/videochat.png")}
                />
              )}
            />
            <MoreTab
              title="Messenger"
              navigateTo="Messenger"
              isSub={true}			  
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/messages.png")}
                />
              )}
            />
            <MoreTab
              title="Search in Messages"
              navigateTo="SearchMessages"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/search.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.2 */}
          <MultipleMoreTab
            title="Databases"
            navigateTo="Databases" // replace navigate to when the screen is made
            Icon={() => (
              <Image
                style={styles.iconImages}
                source={require("../../assets/icons/database1.png")}
              />
            )}
          >
            <MoreTab
              title="Organizations"
              navigateTo="Organizations"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/organization.png")}
                />
              )}
            />

            <MoreTab
              title="Banks"
              navigateTo="Banks"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/bank.png")}
                />
              )}
            />

            <MoreTab
              title="Titles"
              navigateTo="Titles"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/title.png")}
                />
              )}
            />
            <MoreTab
              title="Insurances"
              navigateTo="Insurances"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/insurance.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.5 */}
          <MultipleMoreTab
            title="About Us"
            navigateTo="AboutUs" // replace navigate to when the screen is made
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/about.png")}
              />
            )}
          >
            <MoreTab
              title="Clinic User Profile"
              navigateTo="ClinicUserProfile"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/company.png")}
                />
              )}
            />
		  
            <MoreTab
              title="Privacy Policy"
              navigateTo="PrivacyPolicy"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/privacypolicy.png")}
                />
              )}
            />

            <MoreTab
              title="Terms of Use & Condition"
              navigateTo="TermsofUse" 
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/termofuse.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          {/* 1.5 */}
          <MultipleMoreTab
            title="My Cloud"
            navigateTo="Drive" // replace navigate to when the screen is made
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/yourdrive.png")}
              />
            )}
          >
            <MoreTab
              title="Drive"
              navigateTo="Drive"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/yourdrive.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* 99 */}

          {/* 1.4 */}
          <MultipleMoreTab
            title="TeleMed Screens"
            Icon={() => (
              <Image
                style={[
                  styles.iconImages,
                  { width: 30, height: 30, marginLeft: 0 },
                ]}
                source={require("../../assets/icons/addressbook.png")}
              />
            )}
          >
            <MoreTab
              title="Map"
              navigateTo="Map"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/mappin.png")}
                />
              )}
            />
            <MoreTab
              title="Financial"
              navigateTo="Financial"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/BI.jpg")}
                />
              )}
            />

            <MoreTab
              title="TabShare"
              navigateTo="TabShare"
              isSub={true}
              Icon={() => (
                <Image
                  style={[
                    styles.iconImages,
                    { width: 30, height: 30, marginLeft: 0 },
                  ]}
                  source={require("../../assets/icons/BI.jpg")}
                />
              )}
            />

            <MoreTab
              title="AppointmentsDetail"
              navigateTo="AppoinmentInfo"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/patient.png")}
                />
              )}
            />
            <MoreTab
              title="BookAppointment"
              navigateTo="BookAppointment"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/patient.png")}
                />
              )}
            />
            <MoreTab
              title="Cardiolist"
              navigateTo="Cardiolist"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/accountant.png")}
                />
              )}
            />
            <MoreTab
              title="ConsultantDetails"
              navigateTo="ConsultantDetails"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/accountant.png")}
                />
              )}
            />

            <MoreTab
              title="Schedule"
              navigateTo="Schedule"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/scheduler.png")}
                />
              )}
            />
            <MoreTab
              title="Slot2"
              navigateTo="Slot2"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/bell.png")}
                />
              )}
            />

            <MoreTab
              title="Speacility"
              navigateTo="Speacility"
              isSub={true}
              Icon={() => (
                <Image
                  style={styles.iconImages}
                  source={require("../../assets/icons/doctor.png")}
                />
              )}
            />
          </MultipleMoreTab>
          {/* end */}

          <TouchableOpacity
            onPress={this.handleLogout}
            style={styles.ContainerView}
          >
            <View style={styles.LeftContainer}>
              <Image
                style={styles.icons}
                source={require("../../assets/icons/logout.png")}
              />
              <Text style={styles.TextContainer}>Logout</Text>
            </View>
            <View style={styles.RightContainer}></View>
          </TouchableOpacity>
          {/* end */}
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
  },
  ContainerView: {
    backgroundColor: "white",
    width: "90%",
    height: h("10%"),
    marginTop: h("2%"),
    flexDirection: "row",
  },
  rotateImage: {
    transform: [{ rotate: "90deg" }],
  },
  subMenuView: {
    backgroundColor: "white",
    width: "80%",
    height: h("8%"),
    marginTop: h("2%"),
    marginLeft: h("2%"),
    flexDirection: "row",
  },
  LeftContainer: {
    // backgroundColor: 'green',
    width: "80%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: h("2%"),
  },
  RightContainer: {
    // backgroundColor: 'gold',
    width: "20%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  TextContainer: {
    color: "black",
    fontSize: h("2%"),
    paddingLeft: 5,
  },
  icons: {
    width: "30%",
    height: "30%",
    resizeMode: "contain",
  },
  iconImages: {
    borderWidth: 3,
    resizeMode: "cover",
    width: 25,
    height: 25,
    marginLeft: 5,
  },
});