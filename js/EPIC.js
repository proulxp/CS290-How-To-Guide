/*
Name: Phillip Proulx
Course: CS290
Date: 08/23/2017
Title: EPIC.js
Description: A javascript program that leverages the NASA EPIC API to pull image 
information from the EPIC servers from a date field on the hosted webpage.

Referenced: CS290 lecture material.
*/

var apiKey = '9Tn2WuDuvpyUzRGyYKKCt09AJJGpqfNSPBlWLvWz'; 
      
      //Event listener for submit button
      document.addEventListener('DOMContentLoaded', submitButtonsReady);

      function submitButtonsReady(){
        document.getElementById('dateInput').addEventListener('click', function(event){
          var request = new XMLHttpRequest();
          var date = document.getElementById('dateValue').value;  //Date input from user
          var dateArray = date.split("-");  //Splits input into year, month, and day
          var year = dateArray[0];          
          var month = dateArray[1];
          var day = dateArray[2];
          request.open('GET', 'https://api.nasa.gov/EPIC/api/natural/date/' + date + '?api_key=' + apiKey, true);   //AJAX request on EPIC API
          request.addEventListener('load',function(){
           if(request.status >= 200 && request.status < 400){
              var response = JSON.parse(request.responseText);
              console.log(response);
              console.log(typeof(response[0].image));

              //Conditional if response is a string
              if(typeof(response[0].image) === 'string')
              { 
                //Display content to user
                document.getElementById('imageStatus').textContent = 'Found';
                document.getElementById('imageID').src = 'https://epic.gsfc.nasa.gov/archive/natural/' + year + '/' + month + '/' + day + '/jpg/' + response[0].image + '.jpg';
                document.getElementById('imageCaption').textContent = response[0].caption;
              }

            } 
            else //Displays error message
            { 
                  console.log("Error in network request: " + request.statusText);

             }});
          //Prompts user to check syntax until proper response comes through.
          document.getElementById('imageStatus').textContent = 'Please try a different date or check your syntax!';
          request.send(null);
          event.preventDefault();
        })

      }

   