/*
Name: Phillip Proulx
Course: CS290
Date: 08/23/2017
Title: ROVER.js
Description: A javascript program that leverages the NASA ROVER API to pull image 
information from the ROVER servers from a date field on the hosted webpage.

Referenced: CS290 lecture material.
*/

var apiKey = '9Tn2WuDuvpyUzRGyYKKCt09AJJGpqfNSPBlWLvWz'; 
  
      //Event listener for submit button
      document.addEventListener('DOMContentLoaded', submitButtonsReady);

      function submitButtonsReady(){
        document.getElementById('dateInput').addEventListener('click', function(event){
          var request = new XMLHttpRequest();
          var date = document.getElementById('dateValue').value;    //Date input from user
          var roverName = "";   //Initialize roverName variable until checked
          var buttonStatus1 = document.getElementById('button1').checked;
          var buttonStatus2 = document.getElementById('button2').checked;
          var buttonStatus3 = document.getElementById('button3').checked;

          //Assigns rover name variable based on selected button
          if(buttonStatus1 === true)
          {
            roverName = "curiosity";
          }
          else if(buttonStatus2 === true)
          {
            roverName = "opportunity";
          }
          else 
          {
            roverName = "spirit";
          }

          //AJAX ROVER API request
          request.open('GET', 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + roverName +'/photos?earth_date='+ date + '&api_key=' + apiKey, true);
          request.addEventListener('load',function(){
           if(request.status >= 200 && request.status < 400){
              var response = JSON.parse(request.responseText);
              console.log(response);

              //Display content to user
              document.getElementById('imageStatus').textContent = 'Found';
              document.getElementById('imageID').src = response.photos[0].img_src;
              document.getElementById('roverCaption').textContent = response.photos[0].rover.name;
              document.getElementById('landingCaption').textContent = response.photos[0].rover.landing_date;
              document.getElementById('endingCaption').textContent = response.photos[0].rover.max_date;

            } 
            else //Display error to user
            { 
                  console.log("Error in network request: " + request.statusText);

             }});
          //Prompts user to check syntax until proper response comes through.
          document.getElementById('imageStatus').textContent = 'Please try a different date or check your syntax!';
          request.send(null);
          event.preventDefault();
        })

      }

    