$(document).ready( function() {
	$('.user-input').submit( function(event){
		// zero out results if previous search has run
		console.log("clicked");
		$('dt').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		console.log(tags);
		getArtistData(tags);
	});

});

var getArtistData = function(tags) {
	
	// the parameters we need to pass in our request to Echo Nests's API
	var request = { 
		api_key: "03DX98RCISRHKTJFT",
		name: tags,
		format: "json",
		results: 1,
		bucket: "biographies"

	};
	
	var result = $.ajax({
		url: "http://developer.echonest.com/api/v4/artist/search",
		data: request,
		type: "GET"
	})

	.done(function(result){

		$.each(result.items, function(i, item) {
			console.log("success");
			var artist = showArtistInfo(item);
			$('.results').append(artist);
		});
	})

	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.results').append(errorElem);
	});
};

var showArtistInfo = function(artist) {
	
	// clone our result template code
	var result = $('.artistResults').clone();
	
	// set the views for artist property in result
	var artistInfo = result.find('.biography');
	artistInfo.text(artist.biographies);


	return result;
};