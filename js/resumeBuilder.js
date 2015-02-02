
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
    "biopic": "images/rdg.jpg",
    "display": "function"
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
         "url": "ihttps://www.udacity.com/"},
         {"title": "JavaScript Basics",
         "school": "Udacity",
         "date": 2015,
         "url": "ihttps://www.udacity.com/"},
         {"title": "Intro to jQuery",
         "school": "Udacity",
         "date": 2015,
         "url": "ihttps://www.udacity.com/"}
         ],
    "display": "function"
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
         ],
    "display": "function"
    }


var projects = {
    "projects":[
          {"title": "Email Sign Up" ,
          "dates": "2012-Present",
          "description": "An Android App",
          "images": ["images/email-sign-up.png","images/email-sign-up-collection.png",
                     "images/email-sign-up-winner.png"]},
          {"title": "Eggspense" ,
          "dates": "2013",
          "description": "An Android App",
          "images": ["images/eggspense.png","images/eggspense-share.png",
                     "images/eggspense-stats.png"]},
          {"title": "Eco Trip" ,
          "dates": "2012",
          "description": "An Android App",
          "images": ["images/eco-trip.png","images/eco-trip-graph.jpg",
                     "images/eco-trip-history.jpg"]}
          ],
    "display": "function taking no parameters"

    }


/*
 *  Update an html string with the value of data
 */
function prependHTML(id, string, data){
  var update = string.replace("%data%", data);
  $(id).prepend(update);
}
function appendHTML(id, string, data){
  var update = string.replace("%data%", data);
  $(id).append(update);
}

function updateContact(string, contact, data){
  var update = string.replace("%contact%", contact);
  appendHTML("#topContacts",update, data);
}
function updateContacts(contacts){
  for(contact in contacts){
    updateContact(HTMLcontactGeneric, contact, contacts[contact]);
  }
  
}
function appendHTMLArray(id,html, array){
  for(item in array){
    appendHTML(id, html, array[item]);
  }
}

function displayWork () {
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

function displayProjects(){
  //create new div for projects
  $("#projects").append(HTMLprojectStart);
  for (project in projects.projects){
    appendHTML(".project-entry:last", HTMLprojectTitle, projects.projects[project].title);
    appendHTML(".project-entry:last", HTMLprojectDates, projects.projects[project].dates);
    appendHTML(".project-entry:last", HTMLprojectDescription, projects.projects[project].description);
    appendHTMLArray(".project-entry:last", HTMLprojectImage,projects.projects[project].images); 
  }
  
}

//var HTMLonlineClasses = '<h3>Online Classes</h3>';
//var HTMLonlineTitle = '<a href="#">%data%';
//var HTMLonlineSchool = ' - %data%</a>';
//var HTMLonlineDates = '<div class="date-text">%data%</div>';
//var HTMLonlineURL = '<br><a href="#">%data%</a>';
function displayEducation(){
  //create new div for education
  $("#education").append(HTMLschoolStart);
  for(school in education.schools){
    var update = HTMLschoolName.replace("#", education.schools[school].url);
    appendHTML(".education-entry:last", update, education.schools[school].name);
    appendHTML(".education-entry:last", HTMLschoolDegree, education.schools[school].degree);
    appendHTML(".education-entry:last", HTMLschoolDates, education.schools[school].dates);
    appendHTML(".education-entry:last", HTMLschoolLocation, education.schools[school].location);
    appendHTML(".education-entry:last", HTMLschoolMajor, education.schools[school].majors);
  }
}


updateContacts(bio.contacts);
prependHTML("#header",HTMLheaderRole, bio.role);
prependHTML("#header",HTMLheaderName, bio.name);

appendHTML("#header",HTMLWelcomeMsg, bio.welcomeMessage);
appendHTML("#header",HTMLbioPic, bio.biopic);
$("#header").append(HTMLskillsStart);
appendHTMLArray("#skills",HTMLskills, bio.skills);

displayWork();
displayProjects();
displayEducation();

