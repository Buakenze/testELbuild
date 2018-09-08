var jokesArray = [];

$(document).ready(function(){
	
	$.get("http://api.icndb.com/categories", function(categoriesJson){
		
		if(categoriesJson.type == "success"){
			var categories = categoriesJson.value;
			
			var htmlCategories = "<option value = ''></option>";
			for(var i = 0 ; i < categories.length ; i++){
				
				htmlCategories += "<option value = '" + categories[i] + "'>" + categories[i] + "</option>";
				
			}
			
			$("#category").html(htmlCategories);
			
		}
		
	});
	
	$(document).on("change", "#category", function(){
		
		if($(this).val() != ''){
			
			var selectedCategory = $("#category").val();
			$.get("http://api.icndb.com/jokes?limitTo=[" + selectedCategory + "]", function(jokesJson){
				
				if(jokesJson.type == "success"){
					jokesArray = jokesJson.value;
					
					var htmlJokes = '';
					for(var i = 0 ; i < jokesArray.length ; i++){
						
						htmlJokes += "<div id='" + jokesArray[i].id + "' class='jokes' style='cursor:pointer'>" + jokesArray[i].joke + "</div><br></br>";
						
					}
					
					$("#tableOfJokes").html(htmlJokes);
					
				}
				
			});
			
		}
		
		$("#tableOfJokes").show();
		
	});
	
	$(document).on("click", ".jokes", function(){
		
		$("#jokeSelector").hide();
		$("#jokeDetail").show();
		
		var id = $(this).prop("id");
		
		var joke = '';
		var found = false;
		
		for(var i = 0 ; i < jokesArray.length && !found ; i++){
			
			if(jokesArray[i].id == id){
				
				joke = jokesArray[i].joke;
				found = true;
				
			}
			
		}
		
		$("#joke").html(joke);
		
	});
	
	$(document).on("click", "#return", function(){
		
		$("#jokeSelector").show();
		$("#jokeDetail").hide();
		$("#joke").html("");
		
	});
	
	$(document).on("click", "#random", function(){
		
		$("#jokeSelector").hide();
		$("#jokeDetail").show();
		
		$.get("http://api.icndb.com/jokes/random", function(randomJson){
			
			if(randomJson.type == "success"){
				var joke = randomJson.value.joke;
				
				$("#joke").html(joke);
			}
			
		});
		
	});
	
});