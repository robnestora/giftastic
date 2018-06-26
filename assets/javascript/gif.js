$(document).ready(function() {
    var topics = ["Hip-Hop", "MMA", "Explosions", "Dunks", "Animal Attacks", "Fails", "Wins", "Tigers" , "Jordans", "Suicide Girls", "Trick Shots", "Tackles", "Exotic Cars", "Motorcycles"];
   function renderButtons() {
   
       $("#buttons").empty();
     for (var i = 0; i < topics.length; i++) {
       var topicBtn = $("<button>");
               topicBtn.addClass("topic-button topic-button-color");
               topicBtn.attr("topic", topics[i]);
               topicBtn.text(topics[i]);
               $("#buttons").append(topicBtn);
           }
       }
       // This function handles events where one button is clicked
       $("#add-topic").on("click", function(event) {
           
           event.preventDefault();
   
           // This line will grab the text from the input box
           var newTopic = $("#new-input").val().trim();
           // The movie from the textbox is then added to our array
           topics.push(newTopic);
   
           // calling renderButtons which handles the processing of our movie array
           renderButtons();
       });
        renderButtons();
     // Adding click event listen listener to all buttons
       $("button").on("click", function() {
         // Grabbing and storing the topic property value from the button
         var query = $(this).attr("topic");
   
         // Constructing a queryURL using the topic name
         var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
           query + "&api_key=dc6zaTOxFJmzC&limit=10";
   
         // Performing an AJAX request with the queryURL
         $.ajax({
           url: queryURL,
           method: "GET"
         })
           // After data comes back from the request
           .then(function(response) {
             console.log(queryURL);
   
             console.log(response);
             // storing the data from the AJAX request in the results variable
             var results = response.data;
   
             // Looping through each result item
             for (var i = 0; i < results.length; i++) {
   
               // Creating and storing a div tag
               var topicDiv = $("<div>");
   
               // Creating a paragraph tag with the result item's rating
               var p = $("<p>").text("Rating: " + results[i].rating);
   
               // Creating and storing an image tag
               var topicImage = $("<img>");
               // Setting the src attribute of the image to a property pulled off the result item
               topicImage.attr("src", results[i].images.fixed_height_still.url);
               topicImage.attr("data-animate", results[i].images.fixed_height.url);
               topicImage.attr("data-still", results[i].images.fixed_height_still.url);
               topicImage.attr("data-state", "still");
               
               // Appending the paragraph and image tag to the topicDiv
               topicDiv.append(p);
               topicDiv.append(topicImage);
   
               // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
               $("#gifs-appear-here").prepend(topicDiv);
             
             $(topicImage).on("click", function() {
         // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
         var state = $(this).attr("data-state");
         // If the clicked image's state is still, update its src attribute to what its data-animate value is.
         // Then, set the image's data-state to animate
         // Else set src to the data-still value
         if (state === "still") {
           $(this).attr("src", $(this).attr("data-animate"));
           $(this).attr("data-state", "animate");
         } else {
           $(this).attr("src", $(this).attr("data-still"));
           $(this).attr("data-state", "still");
         }
         console.log(topicimage);
       });
           };
   
       });
   });
        
       });
   
   renderButtons();