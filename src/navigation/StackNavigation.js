import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useState, useEffect, useRef } from "react";
import useNotifications from "../hooks/useNotifications";



import {
  BookAppointment,
  Cardiolist,
  ConsultantDetails,
  PaymentDetail,
  Slot2,
  Speacility,
} from "../screens/dashboard";
//testing only

import {
  Doctors,
  Users,
  Accountants,
  Receptions,
  Clinics,
  OperationsPatient,
  OperationsAccountant,
  OperationsClinic,
  OperationsDoctor,
  OperationsReception,
  //Freelancers,
  OperationsUser,
  //AboutMe,
  ChangePassword,
  BankAccount,
  BusinessInfo,
  Insurance,
  Membership,
  Patients,
} from "../screens/Users";



import AppointmentProfile from "../screens/Planning/AppointmentProfile";
import Charts from "../screens/Accounting/Charts";

import { AppoinmentDetails } from "../screens/Planning/appointmentDetails";
import Appointments from "../screens/Planning/Appointments";
import Drive from "../screens/Drive";
// import FileViewer from '../screens/Drive/FileViewer';
import FolderDetail from "../screens/Drive/FolderDetail";
import ClinicUserProfile from "../screens/Users/ClinicUserProfile";

import Skills from "../screens/Planning/Skills";
import OperationsSkill from "../screens/Planning/OperationsSkill";
//import Certificates from "../screens/Planning/Certificates";
//import OperationsCertificate from "../screens/Planning/OperationsCertificate";
import Leaves from "../screens/Planning/Leaves";
import Shifts from "../screens/Planning/Shifts";


// import PhysicalConditionScreen from "../screens/MedicalFiles/PhysicalConditionScreen";
// import PhysicalConditions from "../screens/MedicalFiles/PhysicalConditions";

// import Incidents from "../screens/ERO/Incidents";

import OperationsTasks from "../screens/Kanban/OperationsTasks";
import KanbansScreen from "../screens/Kanban/KanbansScreen";
import ScrumScreen from "../screens/Kanban/ScrumScreen";
import GridKanbans from "../screens/Kanban/GridKanbans";
import AdminKanbans from "../screens/Kanban/AdminKanbans";
//import TaskProfile from "../screens/Kanban/TaskProfile";
import Tasks from "../screens/Kanban/Tasks";

import OperationsTicket from "../screens/Tickets/OperationsTicket";
import Tickets from "../screens/Tickets/Tickets";
import GridTickets from "../screens/Tickets/GridTickets";
import TicketProfile from "../screens/Tickets/TicketProfile";

import COAs from "../screens/Accounting/COAs";
import Invoices from "../screens/Accounting/Invoices";
import Expenses from "../screens/Accounting/Expenses";
import Products from "../screens/Accounting/Products";
import Services from "../screens/Accounting/Services";
import OperationsInvoice from "../screens/Accounting/OperationsInvoice";
import OperationsExpense from "../screens/Accounting/OperationsExpense";
import OperationsProduct from "../screens/Accounting/OperationsProduct";
import OperationsService from "../screens/Accounting/OperationsService";
import { InvoiceProfile } from "../screens/Accounting/InvoiceProfile";
import { ProfitLossStatement } from "../screens/Accounting/ProfitLossStatement";

import BusinessProfileScreen from "../screens/DirectoryList/BusinessProfileScreen";
import BusinessProfile from "../screens/DirectoryList/BusinessProfile";

import DirectoryList from "../screens/DirectoryList/DirectoryList";
import TabShare from "../screens/dashboard/TabShare";

import Contacts from "../screens/Users/Contacts";

//ERO
import EROs from "../screens/ERO/EROs";
import { OperationsERO } from "../screens/ERO/OperationsERO";
import Incidents from "../screens/ERO/Incidents";
import OperationsIncident from "../screens/ERO/OperationsIncident";

//forum imports
import Forum from "../screens/Forum/forum";
import CreatePost from "../screens/Forum/CreatePost";
import CategoryIndex from "../screens/Forum/CategoryIndex";
import CreateComment from "../screens/Tickets/CreateComment";
import CreateNote from "../screens/Tickets/CreateNote";


//need to be added later
//import MateriaMedicaAyurveda from "../screens/Books/MateriaMedicaAyurveda";
//import MateriaMedicaHomeo from "../screens/Books/MateriaMedicaHomeo";
//import MateriaMedicaTCM from "../screens/Books/MateriaMedicaTCM";
//import Acupuncture from "../screens/Books/Acupuncture";
//import FormulasTCM from "../screens/Books/FormulasTCM";
//import PathologyTCM from "../screens/Books/PathologyTCM";

import PinScreen from "../screens/subsitutional/PinScreen";



import FishboneChart from "../screens/dashboard/FishboneChart";
import PieChart from "../screens/dashboard/PieChart";
//import MapRoute from "../screens/dashboard/MapRoute";
import MapRoute from "../screens/dashboard/MapRouting";
//import BlurhashScreen from "../screens/dashboard/blurhash";
//import FileviewerScreen from "../screens/dashboard/fileviewer";

import EditComment from "../screens/Tickets/EditComment";

import ReplyComment from "../screens/Tickets/ReplyComment";

import SubCategories from "../screens/Forum/subCategories";
import TopicDetails from "../screens/Forum/TopicDetails";

import {
  AboutUs,
  Financial,
  Notifications,
  PaymentsDetails,
  PrivacyPolicy,
  TermsofUse,
} from "../screens/subsitutional";
import MyProfile from "../screens/Users/MyProfile";
// OTHER NAVIGATION SCREENS
import { TabNavigation } from "./TabNavigation";



import CreateTopic from "../screens/Forum/CreateTopic";

// import TimelineAttendance from "../screens/TimelineAttendance/TimelineAttendance";


import TimelineTasks from "../screens/TimelineTasks/TimelineTasks";
import TimelineKaizens from "../screens/TimelineKaizens/TimelineKaizens";
import TimelineTickets from "../screens/TimelineTickets/TimelineTickets";
import AppointmentInfo from "../components/Appointment/AppointmentInfo/AppointmentInfo";

import WorkingHours from "../screens/dashboard/WorkingHours";

const Stack = createStackNavigator();

  export const StackNavigation = () => {
    useNotifications();

    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="">
          <Stack.Screen
            name="PinScreen"
            component={PinScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabNavigation"
            component={TabNavigation}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="TimelineAppointments"
            component={TimelineAppointments}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Patients"
            component={Patients}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsPatient"
            component={OperationsPatient}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Users"
            component={Users}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsUser"
            component={OperationsUser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Receptions"
            component={Receptions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsReception"
            component={OperationsReception}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Accountants"
            component={Accountants}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsAccountant"
            component={OperationsAccountant}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Clinics"
            component={Clinics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsClinic"
            component={OperationsClinic}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Doctors"
            component={Doctors}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsDoctor"
            component={OperationsDoctor}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ClinicUserProfile"
            component={ClinicUserProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Slot2"
            component={Slot2}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Leaves"
            component={Leaves}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Shifts"
            component={Shifts}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Skills"
            component={Skills}
            options={{ headerShown: false }}
          />
    
          {/* <Stack.Screen
            name="PhysicalCondition"
            component={PhysicalConditionScreen}
            options={{ headerShown: false }}
          /> */}

        
          <Stack.Screen
            name="KanbanBoard"
            component={KanbansScreen}
            options={{ headerShown: false }}
          />
{/*      
          <Stack.Screen
            name="Agenda"
            component={AgendaScreen}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Appointments"
            component={Appointments}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AppointmentInfo"
            component={AppointmentInfo}
            options={{ headerShown: false }}
          />
  
          <Stack.Screen
            name="AppointmentProfile"
            component={AppointmentProfile}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="DirectoryList"
            component={DirectoryList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BusinessProfileScreen"
            component={BusinessProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BusinessProfile"
            component={BusinessProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentDetail"
            component={PaymentDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentsDetails"
            component={PaymentsDetails}
            options={{ headerShown: false }}
          />
      

          <Stack.Screen
            name="ScrumScreen"
            component={ScrumScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Tasks"
            component={Tasks}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsTasks"
            component={OperationsTasks}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GridKanbans"
            component={GridKanbans}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="AdminKanbans"
            component={AdminKanbans}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OperationsSkill"
            component={OperationsSkill}
            options={{ headerShown: false }}
          />

          {/*
          
           <Stack.Screen
            name="TaskProfile"
            component={TaskProfile}
            options={{ headerShown: false }}
          />
          
          <Stack.Screen
            name="DirectoryList"
            component={DirectoryList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Accounting"
            component={Accounting}
            options={{ headerShown: false }}
          />    */}

          {/* <Stack.Screen
            name="Human Resources"
            component={HR}
            options={{ headerShown: false }}
          /> */}

          {/*
          
           <Stack.Screen
            name="Skills"
            component={Skills}
            options={{ headerShown: false }}
          />
      
          <Stack.Screen
            name="Leave"
            component={Leave}
            options={{ headerShown: false }}
          />    
		  
          <Stack.Screen
            name="OperationsLeave"
            component={OperationsLeave}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Shift"
            component={Shift}
            options={{ headerShown: false }}
          />    
		  
          <Stack.Screen
            name="OperationsShift"
            component={OperationsShift}
            options={{ headerShown: false }}
          />
		  
		  */}

          <Stack.Screen
            name="EROs"
            component={EROs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsERO"
            component={OperationsERO}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Incidents"
            component={Incidents}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsIncident"
            component={OperationsIncident}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="BookAppointment"
            component={BookAppointment}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="AppointmentInfo"
            component={AppointmentInfo}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PrivacyPolicy"
            component={PrivacyPolicy}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TermsofUSe"
            component={TermsofUse}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AboutUs"
            component={AboutUs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Financial"
            component={Financial}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfitLossStatement"
            component={ProfitLossStatement}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen
            name="AddPatient"
            component={AddPatient}
            options={{ headerShown: false }}
          />
          
               <Stack.Screen
            name="Tasks"
            component={Tasks}
            options={{ headerShown: false }}
          />	
          
          */}
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeoPathySession"
            component={HomeoPathySession}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TCMSession"
            component={TCMSession}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="COAs"
            component={COAs}
            options={{ headerShown: false }}
          />

          {/* <Stack.Screen
            name="OperationsCOA"
            component={OperationsCOA}
            options={{ headerShown: false }}
          /> */}

          <Stack.Screen
            name="Invoices"
            component={Invoices}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OperationsInvoice"
            component={OperationsInvoice}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OperationsExpense"
            component={OperationsExpense}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="OperationsProduct"
            component={OperationsProduct}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OperationsService"
            component={OperationsService}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="InvoiceProfile"
            component={InvoiceProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Expenses"
            component={Expenses}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Products"
            component={Products}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Services"
            component={Services}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Forum"
            component={Forum}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreatePost"
            component={CreatePost}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateComment"
            component={CreateComment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditComment"
            component={EditComment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReplyComment"
            component={ReplyComment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateNote"
            component={CreateNote}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CategoryIndex"
            component={CategoryIndex}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="CreateTopic"
            component={CreateTopic}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Speacility"
            component={Speacility}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cardiolist"
            component={Cardiolist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConsultantDetails"
            component={ConsultantDetails}
            options={{ headerShown: false }}
          />

          {/* testing only */}
          {/* <Stack.Screen
            name="DateTime"
            component={DateTime}
            options={{ headerShown: false }}
          /> */}
          {/*  Ticket Screen */}
          <Stack.Screen
            name="Tickets"
            component={Tickets}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Drive"
            component={Drive}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="FileViewer"
            component={FileViewer}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="FolderDetail"
            component={FolderDetail}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="GridTickets"
            component={GridTickets}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            initialParams={{ selectedTicket: {} }}
            name="OperationsTicket"
            component={OperationsTicket}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            initialParams={{ selectedTicket: {} }}
            name="TicketProfile"
            component={TicketProfile}
            options={{ headerShown: false }}
          />
       
          <Stack.Screen
            name="Contacts"
            component={Contacts}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TabShare"
            component={TabShare}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Charts"
            component={Charts}
            options={{ headerShown: false }}
          />

    
      
          <Stack.Screen
            name="FishboneChart"
            component={FishboneChart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PieChart"
            component={PieChart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MapRoute"
            component={MapRoute}
            options={{ headerShown: false }}
          />

    

          <Stack.Screen
            name="TimelineAttendance"
            component={TimelineAttendance}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ForumSubCategories"
            component={SubCategories}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TopicDetails"
            component={TopicDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="TimelineTasks"
            component={TimelineTasks}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TimelineTickets"
            component={TimelineTickets}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TimelineKaizens"
            component={TimelineKaizens}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkingHours"
            component={ WorkingHours }
            options={{ headerShown: false }}
              />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
