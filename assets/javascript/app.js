/*create a new div that will */
var gifsCharacters = ["Barney Stinson", "Ross Geller", "Michael Scott"];
var personImage;
function renderButtons(){
	$("#gifButtons").empty();
	for (var i=0; i<gifsCharacters.length; i++){
		var a= $("<button>");
		a.addClass("giphy");
		a.attr("data-name", gifsCharacters[i]);
		a.attr("value", gifsCharacters[i]);
		a.text(gifsCharacters[i]);
		$("#gifButtons").append(a);
	}
}

$("#addGif").on("click", function(event){
	event.preventDefault();
	var gifSearched = $("#gifInput").val().trim();
	gifsCharacters.push(gifSearched);
	renderButtons();

});
renderButtons();


//**************__________________***************_______________******************_______________*************
//_____________********************______________****************_________________****************____________

// why does this not add more gifs when you click on other buttons
// $(".giphy").on("click", function(){
$(document).on("click", ".giphy", function(){
	event.preventDefault();
	var person = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
	  url: queryURL,
	  method: "GET"
	}).done(function(response){
		$("#gifSpot").empty();
		var results = response.data;
		for (var i = 0; i < results.length; i++) {
            var gifDiv = $('<div class ="gifSection">');

            var p = $("<p>").text("Rating: " + results[i].rating);
            //id="item-'+i+'">'

            personImage = $("<img>");
            personImage.attr("src", results[i].images.fixed_height.url);
            personImage.attr('src', results[i].images.fixed_height_still.url);
            //personImage.attr("src", results[i].images.fixed_height.url);
            personImage.attr('data-still', results[i].images.fixed_height_still.url);
			personImage.attr("class", "img-thumbnail");
			personImage.attr('data-animate', results[i].images.fixed_height.url);
			personImage.attr('data-state', 'still');

            gifDiv.prepend(p);
            gifDiv.prepend(personImage);

            $("#gifSpot").prepend(gifDiv);
          }

	});
	renderButtons();
});
//**************__________________***************_______________******************_______________***********
//_____________********************______________****************_________________****************__________


//for some reason, the listener for the dynamic img does not work. **consider using event.target in the morning
$(document).on("click", ".img-thumbnail", function(){
	event.preventDefault();
	var state = $(this).attr("data-state");
	console.log(state);
		if (state === "still") {
			$(this).attr("src", $(this).attr("data-animate"));
        	$(this).attr("data-state", "animate");
      	} else {
        	$(this).attr("src", $(this).attr("data-still"));
        	$(this).attr("data-state", "still");
		}

});




// $("button").on("click", function() {
// 	event.preventDefault();
//       var subject = $(this).attr("value");
//       var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//         subject + "&api_key=dc6zaTOxFJmzC&limit=10";
//       var gifSearched = $("gifInput").val();
//       console.log(gifSearched);
//       //gifs.push(gifSearched);
//       //console.log("gifs: " + gifs);


//       $.ajax({
//           url: queryURL,
//           method: "GET"
//         })
//         .done(function(response) { 
//           var results = $(response.data);
//           console.log("results:" + results);

//           for (var i = 0; i < 10; i++) {
//             var gifDiv = $('<div class ="giphy" id="item-'+i+'">');
//             //'<input id="id'+i+'" name="name'+i+'" />'

//             var rating = results[i].rating;

//             var p = $("<p>").text("Rating: " + rating);

//             // var image = $("<img>");
//             // image.attr("src", results[i].images.fixed_height.url);
//             var image = $('<img>');
//               image.attr('src', results[i].images.fixed_height_still.url);
//               image.attr('data-still', results[i].images.fixed_height_still.url);
//               image.attr('data-state', 'still');
//               image.addClass('img-thumbnail');
//               image.attr('data-animate', results[i].images.fixed_height.url);



//             //personImage.attr("data-state", still);


//             gifDiv.append(p);
//             gifDiv.append(image);

//             $("#gifSpot").prepend(gifDiv);




//           }
//         });
//     });
// //**************__________________***************_______________******************_______________******************
// //_____________********************______________****************______________****************______________

// //function to add a new button based on what was searched

// $("#addGif").on("click",function(){
// 	event.preventDefault();
// 	var subject = $(this).attr("value");
// 	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
// 	subject + "&api_key=dc6zaTOxFJmzC&limit=10";
// 	var gifSearched = $("#gifInput").val();
// 	console.log("inputted: " + gifSearched);
// 	var newButton = $("<button>").attr("value", gifSearched)
// 	//console.log("newButton: " + JSON.stringify(newButton));
// 	$("gifButtons").append(newButton);
// 	//console.log("gifs: " + gifs);
// 	});

// //**************__________________***************_______________******************_______________******************
// //_____________********************______________****************______________****************______________

// // function to change gif to pics and back

// $("img").on("click", function() {
//       // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//       var state = $(this).attr("data-state");

//       // for (var i = 0; i<10; i++){
//       // 	var state = $('"#item-"+i+""')
//       // If the clicked image's state is still, update its src attribute to what its data-animate value is.
//       // Then, set the image's data-state to animate
//       // Else set src to the data-still value
// 	      if (state === "still") {
// 	        $(this).attr("src", $(this).attr("data-animate"));
// 	        $(this).attr("data-state", "animate");
// 	      } else {
// 	        $(this).attr("src", $(this).attr("data-still"));
// 	        $(this).attr("data-state", "still");
// 	      }
//   		}
//     });












