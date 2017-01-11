

var map = new google.maps.Map(
	document.getElementById('map'),
	{
		center:{lat:39.8282, lng: -98.5795},
		zoom: 4
	}
);
var markers = [];
var infoWindow = new google.maps.InfoWindow({});


function createMarker(city){
	var icon = 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2%7CFE7569'
	var cityLL = {
		lat: city.lat,
		lng: city.lon
	}
	var marker = new google.maps.Marker({
		position: cityLL,
		map: map,
		title: city.city,
		icon: icon
	});
	google.maps.event.addListener(marker, 'click', function(){
		infoWindow.setContent(`<h2> ${city.city}</h2><div>${city.state}</div><div>${city.yearEstimate}</div>`)
		infoWindow.open(map, marker);
		markers.push(marker)
	})
}



// REACT PORTION //
var GoogleCity = React.createClass({
	handleClickedCity: function(event){
		console.log("clicked")
	google.maps.event.trigger(markers[this.props.cityObject.yearRank-1], "click")
	},
	render: function(){
	return(
		<tr>
			<td className="city-name" onClick={this.handleClickedCity}>{this.props.cityObject.city}</td>
			<td>{this.props.cityObject.yearRank}</td>
		</tr>
	)
	}
});

var Cities = React.createClass({
	getInitialState: function(){
		return{
			currCities: this.props.cities
		}
	},

	handleInputChange: function(event){
		var newFilterValue = event.target.value;
		// console.log(newFilterValue)
		var filteredCitiesArray = [];
		this.props.cities.map(function(currCity, index){
			if(currCity.city.indexOf(newFilterValue) !== -1){
				filteredCitiesArray.push(currCity);
			}
		});
		this.setState({
			currCities: filteredCitiesArray
		})
		// console.log(newFilterValue);
	},
	updateMarkers: function(event){
		event.preventdefault();
		console.log("Update Markers");
		markers.map(function(marker, index){
		marke.setMap(null)
		});
		this.state.currCities.map(function(city, index){
			createMarker(city)
		})
	},

	render: function(){
		
		var cityRows = [];
		this.state.currCities.map(function(currentCity, index){
			createMarker(currentCity);
			cityRows.push(<GoogleCity cityObject={currentCity} key={index} />)
		});
		return(
			<div>
				<form onSubmit={this.updateMarkers}>
					<input type="text" onChange={this.handleInputChange}/>
					<input type="submit" value ="Update Markers" />
				</form>
				<table>
					<thead>
						<tr>
						<th>City Name</th>
						<th>City Rank</th>
						</tr>
					</thead>
					<tbody>
						{cityRows}
					</tbody>
				</table>
			</div>
		)
	}
})

ReactDOM.render(
	<Cities cities={cities} />,
	document.getElementById('cities-container')
	)