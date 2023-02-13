class Day {
  constructor(id, numday, day) {
    this.id = id
    this.numday = numday
    this.day = day
  }
}

class Hour {
	constructor(id, hour) {
		this.id = id
		this.hour = hour
	}
}

class Month {
	constructor(id, month) {
		this.id = id
		this.month = month
	}
}

class User {
  constructor(id, name, surname, avatar) {
    this.id = id
    this.name = name
    this.surname = surname
    this.avatar = avatar
  }
}

export const DAYS = [
  new Day("1", "1"),
  new Day("2", "2", "TUE"),
  new Day("3", "3", "WED"),
  new Day("4", "4", "THU"),
  new Day("5", "5", "FRD"),
  new Day("6", "6", "SAT"),
  new Day("7", "7", "SUN"),
  new Day("8", "8", "MON"),
  new Day("9", "9", "TUE"),
  new Day("10", "10", "WED"),
  new Day("11", "11", "THU"),
  new Day("12", "12", "FRD"),
  new Day("13", "13", "SAT"),
  new Day("14", "14", "SUN"),
  new Day("15", "15", "MON"),
  new Day("16", "16", "TUE"),
  new Day("17", "17", "WED"),
  new Day("18", "18", "THU"),
  new Day("19", "19", "FRD"),
  new Day("20", "20", "SAT"),
  new Day("21", "21", "SUN"),
  new Day("22", "22", "MON"),
  new Day("23", "23", "TUE"),
  new Day("24", "24", "WED"),
  new Day("25", "25", "THU"),
  new Day("26", "26", "FRD"),
  new Day("27", "27", "SAT"),
  new Day("28", "28", "SUN"),
  new Day("29", "29", "MON"),
  new Day("30", "30", "TUE"),
  new Day("31", "31", "WED"),
];

export const newDate = (yearId,monthId) => {
  var dt = new Date(yearId, monthId);
  var month = dt.getMonth() + 1;

  var daysInMonth = new Date(yearId, month, 0).getDate();
  var DayS = [];
  for (let i = 0; i < daysInMonth; i++) {
    const day = [
      "Mon",
      "Tue",
      "Wed",
      "Thr",
      "Fri",
      "Sat",
      "Sun",
    ][new Date(yearId, monthId, i).getDay()];
    var x = new Day(i+1, i+1, day);
    DayS.push(x);
  }
  return DayS;
};

export const USERS = [
  new User(
    "1",
    "John",
    "Smith",
    "https://www.elevatosoftware.com/blog/wp-content/uploads/2019/08/People-Analytics-2.jpg"
  ),
  new User(
    "2",
    "Anna",
    "Muller",
    "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400"
  ),
  new User(
    "3",
    "Jason",
    "Jablonsky",
    "https://media.nature.com/w300/magazine-assets/d41586-021-00808-3/d41586-021-00808-3_18979164.jpg"
  ),
];

export const HOURS = [
  new Hour("1", "08:00"),
  new Hour("2", "09:00"),
  new Hour("3", "10:00"),
  new Hour("4", "11:00"),
  new Hour("5", "12:00"),
  new Hour("6", "13:00"),
  new Hour("7", "14:00"),
  new Hour("8", "15:00"),
  new Hour("9", "16:00"),
  new Hour("10", "17:00"),
  new Hour("11", "18:00"),
  new Hour("12", "19:00"),
  new Hour("13", "20:00"),
  new Hour("14", "21:00"),
  new Hour("15", "22:00"),
];

export const MONTHS = [
  new Month(0, "January"),
  new Month(1, "February"),
  new Month(2, "March"),
  new Month(3, "April"),
  new Month(4, "May"),
  new Month(5, "June"),
  new Month(6, "July"),
  new Month(7, "August"),
  new Month(8, "September"),
  new Month(9, "October"),
  new Month(10, "November"),
  new Month(11, "December"),
];


export const event1 = [
  {
    color:'#91ebe8',
    hours:'12:00 - 12:30',
    topic:"Meeting1",
    start:true
  }
]


export const dateevent = [
  {
    date: "20/6/2021",
    events: event1
  },
  {
    date: "20/6/2021",
    events: event1
  },
  {
    date: "20/6/2021",
    events: event1
  }
]
{/* <CalendarDetail
										color={Colors.primaryColor}
										mins={60}
										marginVertical={5}
										hours='09:30 - 09:30'
										topic='Meeting'
										description='Meet with Andrea Jhonson'
										star={true}
									/> */}