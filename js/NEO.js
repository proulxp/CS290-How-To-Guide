/*
Name: Phillip Proulx
Course: CS290
Date: 08/23/2017
Title: NEO.js
Description: A javascript program that leverages the NASA NEO API to dynamically
generate tables containing near earth objects within a certain date range.

Referenced: CS290 lecture material.
*/

var apiKey = '9Tn2WuDuvpyUzRGyYKKCt09AJJGpqfNSPBlWLvWz'; 
      
      //Event listener for submit button
      document.addEventListener('DOMContentLoaded', submitButtonsReady);

      function submitButtonsReady(){
        document.getElementById('dateInput').addEventListener('click', function(event){
          var request = new XMLHttpRequest();
          var startDate = document.getElementById('startDateValue').value;    //Start value from user
          var endDate = document.getElementById('endDateValue').value;        //End value from user

          //Splits and parses start and end date
          var startDateArray = startDate.split("-");
          var startDay = startDateArray[2];
          var endDateArray = endDate.split("-");
          var endDay = endDateArray[2];

          //Holds dynamically generated table start
          var tableHeader = document.getElementById("tableHeader");

          //Pulls number inputs to calculate total number of days
          startNum = Number(startDay);
          endNum = Number(endDay);

          //Dynamically removes tables if previously requested
            var myNode = document.getElementById("tableHeader");
            while (myNode.firstChild) 
            {
              myNode.removeChild(myNode.firstChild);
            }

          //Calculates total number of days to request
          var numDays = (endNum - startNum) + 1;

          //AJAX NEO API request
          request.open('GET', 'https://api.nasa.gov/neo/rest/v1/feed?start_date=' + startDate +'&end_date='+ endDate +'&api_key=' + apiKey, true);
          request.addEventListener('load',function(){
           if(request.status >= 200 && request.status < 400){
              var response = JSON.parse(request.responseText);
              console.log(response);
              var neoObj = response.near_earth_objects;
              var neoObjArray = neoObj[Object.keys(neoObj)];
              
              //Cycles through returned information dynamically generating tables
              for(var count = 0; count < numDays; count++)
              {

                //Parses JSON objects
                var NEOarray = neoObj[Object.keys(neoObj)[count]];
                var NEOclose = NEOarray[Object.keys(NEOarray)[0]];
                var NEOCAD = NEOclose.close_approach_data;
                var NEOCADdate = NEOCAD[Object.keys(NEOCAD)[0]];
                var capString = NEOCADdate.close_approach_date;

                //Dynamically generates table and caption elements
                var newTable = document.createElement("table");
                var tableCap = document.createElement("caption");

                //Assigns text header elements
                tableCap.textContent = "Date: " + capString;
                var row1 = document.createElement("tr");
                var header1 = document.createElement("th");
                header1.textContent = "Object Name";
                var header2 = document.createElement("th");
                header2.textContent = "Distance from Earth (miles)";
                var header3 = document.createElement("th");
                header3.textContent = "Classified Dangerous";
                var header4 = document.createElement("th");
                header4.textContent = "Link";

                //Apends generated elements to table object
                row1.appendChild(header1);
                row1.appendChild(header2);
                row1.appendChild(header3);
                row1.appendChild(header4);
                newTable.appendChild(tableCap);
                newTable.appendChild(row1);

                //Dynamically generates table cells and fills them with NEO returned info
                for(var index = 0; index < NEOarray.length; index++)
                {
                  //Creates celle elements
                  var row2 = document.createElement("tr");
                  var data1 = document.createElement("td");
                  data1.setAttribute("id", "cell1");

                  //Assigns cells returned information
                  data1.textContent = NEOarray[index].name;
                  var data2 = document.createElement("td");
                  data2.textContent = NEOarray[index].close_approach_data[0].miss_distance.miles;
                  var data3 = document.createElement("td");
                  data3.textContent = NEOarray[index].is_potentially_hazardous_asteroid;
                  var data4 = document.createElement("td");

                  //Creates link cells
                  var NEOlink = document.createElement("a");
                  var linkText = document.createTextNode("Additional Info");
                  NEOlink.appendChild(linkText);
                  NEOlink.title = "Additional Info";
                  NEOlink.href = NEOarray[index].nasa_jpl_url;
                  NEOlink.target = "_blank";
                  data4.appendChild(NEOlink);

                  //Appends created cells to generated table
                  row2.appendChild(data1);
                  row2.appendChild(data2);
                  row2.appendChild(data3);
                  row2.appendChild(data4);
                  newTable.appendChild(row2);

                }

              //Apends tables to site
              tableHeader.appendChild(newTable);

              }

              var allCells = document.body.getElementsByTagName("td");
              var allHeaders = document.body.getElementsByTagName("th");

              //Sets table style elements
              for(var index1 = 0; index1 < allCells.length; index1++)
              {
                allCells[index1].style.border = "2px solid black";
              }
              for(var index2 = 0; index2 < allHeaders.length; index2++)
              {
                  allHeaders[index2].setAttribute("style", "border: 2px solid black;");
              }

            } 
            else 
            { 

                  console.log("Error in network request: " + request.statusText);

             }});

          request.send(null);
          event.preventDefault();
        })

      }

     