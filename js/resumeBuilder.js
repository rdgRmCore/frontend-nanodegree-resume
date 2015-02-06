
/* JSON */

/* BIO */
var bio = {
    "name" : "Rand Graham",
    "role" : "Software Developer",
    "contacts" : {
          "mobile": "815-555-1234",
          "email": "rdg@rmcore.com" ,
          "github": "rdgRmCore",
          "twitter": "@rdg_rmcore" ,
          "location": "Crystal Lake"
    },
    "welcomeMessage": "I make a living making software." ,
    "skills": ["Embedded Systems", "Real Time Systems", "Image Processing", "Android" ],
    "biopic": "images/rdg.jpg"
    }


var education ={
    "schools": [
         {"name": "University of Illinois",
         "location": "Urbana Champaign, IL",
         "degree": "BS",
         "majors": ["Computer Science"],
         "dates": "1999",
         "url": "http://illinois.edu/"}
         ],
    "onlineCourses": [
         {"title": "Intro to HTML and CSS",
         "school": "Udacity",
         "date": 2014,
         "url": "https://www.udacity.com/"},
         {"title": "JavaScript Basics",
         "school": "Udacity",
         "date": 2015,
         "url": "https://www.udacity.com/"},
         {"title": "Intro to jQuery",
         "school": "Udacity",
         "date": 2015,
         "url": "https://www.udacity.com/"}
         ]
    }


var work = {
    "jobs": [
         {"employer": "Zenith" ,
         "title": "Senior Software Engineer" ,
         "location": "Lincolnshire, IL" ,
         "dates": "2013-Present" ,
         "description": "I work on video encryption technology." },
         {"employer": "Toshiba Medical Research Institute US" ,
         "title": "Senior Software Engineer" ,
         "location": "Vernon Hills, IL" ,
         "dates": "2007-2013" ,
         "description": "I worked on embedded C++ for medical imaging devices." },
         {"employer": "Cummins Allison" ,
         "title": "Embedded Software Engineer" ,
         "location": "Mt Prospect, IL" ,
         "dates": "2005-2007" ,
         "description": "I worked on embedded C++ for banking automation machines." }
         ]
    }


var projects = {
    "projects":[
          {"title": "Email Sign Up" ,
          "dates": "2012-Present",
          "description": "An Android App to collect names and email addresses from an Android device.",
          "images": ["images/email-sign-up.png","images/email-sign-up-collection.png",
                     "images/email-sign-up-winner.png"]},
          {"title": "Eggspense" ,
          "dates": "2013",
          "description": "An Android App to keep track of chicken expenses.",
          "images": ["images/eggspense.png","images/eggspense-share.png",
                     "images/eggspense-stats.png"]},
          {"title": "Eco Trip" ,
          "dates": "2012",
          "description": "An Android App to calculate gas mileage.",
          "images": ["images/eco-trip.png","images/eco-trip-graph.jpg",
                     "images/eco-trip-history.jpg"]}
          ]
    }



//  Update by prepending an html string with the value of data
function prependHTML(id, string, data){
  var update = string.replace("%data%", data);
  $(id).prepend(update);
}

//Update an HTML string by appending
function appendHTML(id, string, data){
  var update = string.replace("%data%", data);
  $(id).append(update);
}

//Function to update a Contact
function updateContact(string, contact, data){
  var update = string.replace("%contact%", contact);
  appendHTML("#topContacts",update, data);
  appendHTML("#footerContacts",update, data);
}

//Function to update contacts
//@contacts an array of strings representing contact information
function updateContacts(contacts){
  for(contact in contacts){
    updateContact(HTMLcontactGeneric, contact, contacts[contact]);
  }
  
}

//Append an array of strings to an jquery selector id by replacing place holder text in a string.
//@id - jquery selector id
//@html - a string that has place holder text
//@array - an array of strings
function appendHTMLArray(id,html, array){
  for(item in array){
    appendHTML(id, html, array[item]);
  }
}

//Display work history. Fill in resume from JSON.
work.display = function () {
  for (job in work.jobs){
    //create new div for work experience
    $("#workExperience").append(HTMLworkStart);
    //concat employer and title
    var formattedEmployer =  HTMLworkEmployer.replace("%data%",work.jobs[job].employer);
    var formattedTitle =  HTMLworkTitle.replace("%data%",work.jobs[job].title);
    var formattedEmployerTitle = formattedEmployer + formattedTitle;
    $(".work-entry:last").append(formattedEmployerTitle);
    appendHTML(".work-entry:last", HTMLworkLocation, work.jobs[job].location);
    
    appendHTML(".work-entry:last", HTMLworkDates, work.jobs[job].dates);
    appendHTML(".work-entry:last", HTMLworkDescription, work.jobs[job].description);

  }
}

//Display projects. Fill in data from JSON.
projects.display = function (){
  //create new div for projects
  for (project in projects.projects){
    $("#projects").append(HTMLprojectStart);
    appendHTML(".project-entry:last", HTMLprojectTitle, projects.projects[project].title);
    appendHTML(".project-entry:last", HTMLprojectDates, projects.projects[project].dates);
    appendHTML(".project-entry:last", HTMLprojectDescription, projects.projects[project].description);
    appendHTMLArray(".project-entry:last", HTMLprojectImage,projects.projects[project].images); 
  }
  
}

//Display education. Fill in data from JSON.
education.display = function (){
  //create new div for education
  $("#education").append(HTMLschoolStart);
  for(school in education.schools){
    var update = HTMLschoolName.replace("#", education.schools[school].url);
    var formattedName = update.replace("%data%", education.schools[school].name);
    var formattedDegree = HTMLschoolDegree.replace("%data%", education.schools[school].degree);
    var formattedNameDegree = formattedName + formattedDegree;
    $(".education-entry").append(formattedNameDegree);

    appendHTML(".education-entry", HTMLschoolDates, education.schools[school].dates);
    appendHTML(".education-entry", HTMLschoolLocation, education.schools[school].location);
    appendHTML(".education-entry", HTMLschoolMajor, education.schools[school].majors);
  }

  //add online classes to education section
  $(".education-entry").append(HTMLonlineClasses);
  for(course in education.onlineCourses){
    //concat title and school
    var formattedTitle =  HTMLonlineTitle.replace("%data%",education.onlineCourses[course].title);
    var formattedSchool =  HTMLonlineSchool.replace("%data%",education.onlineCourses[course].school);
    var formattedTitleSchool = formattedTitle + formattedSchool;
    $(".education-entry").append(formattedTitleSchool);
    
    appendHTML(".education-entry", HTMLonlineDates, education.onlineCourses[course].date);
    appendHTML(".education-entry", HTMLonlineURL, education.onlineCourses[course].url);
  }
}


//Display the bio JSON
bio.display = function(){
  updateContacts(bio.contacts);
  prependHTML("#header",HTMLheaderRole, bio.role);
  prependHTML("#header",HTMLheaderName, bio.name);

  appendHTML("#header",HTMLWelcomeMsg, bio.welcomeMessage);
  appendHTML("#header",HTMLbioPic, bio.biopic);
  $("#header").append(HTMLskillsStart);
  appendHTMLArray("#skills",HTMLskills, bio.skills);
}

//Call the functions to display the resume
bio.display();
work.display();
projects.display();
education.display();

//add the map
$("#mapDiv").append(googleMap);

