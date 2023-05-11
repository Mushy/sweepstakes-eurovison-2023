let countries = [];
let players = [];
let stepPosition = 0;
let totalCountries = countries.length;
let totalPlayers = players.length;
let countriesPerPlayer = 0;
let floatingCountries = 0;
let countriesFull = 0;
let unnamed = 0;



const runQuickAssign = document.querySelector('.js-quickAssign');
runQuickAssign.addEventListener('click', () => {
	clearSweepstake();
	rollAllCountries();
});

const runStepAssign = document.querySelector('.js-stepAssign');
runStepAssign.addEventListener('click', () => {
	clearSweepstake();
	stepAssign();
});

const runClearSweeps = document.querySelector('.js-clearSweeps');
runClearSweeps.addEventListener('click', () => {
	clearSweepstake();
})

const runSingleAssign = document.querySelector('.js-singleAssign');
runSingleAssign.addEventListener('click', () => {
	if (stepPosition > 0) {
		document.querySelector('.artist-holder').style.opacity = 0;
		document.querySelector('.js-singingFor').style.opacity = 0;
		document.querySelector('.assigned-to').style.opacity = 0;
	}

	setTimeout(function() {
		// Slight delay to allow the above elements to fade out before switching the values around.
		singleAssign();
	}, 1000);
	
});



// Just in case someone wants to be able to quick assign / step through without refreshing.
function clearSweepstake() {
	shuffleArray(countries);

	countriesFull = 0;
	stepPosition = 0;

	for (i = 0; i < totalPlayers; i++) {
		players[i].countryCount = 0;
		players[i].assignedCountries = [];
	}

	cpu.countryCount = 0;
	cpu.assignedCountries = [];

	document.querySelector('.log-entries').innerHTML = '';
	document.querySelector('.assigns').innerHTML = '';
	document.querySelector('#stt-currentCountry').innerText = '0';
}



function rollAllCountries() {
	let i = 0;
	let playerListContainer = document.querySelector('.assigns');
	
	if (i === 0) {
		playerListContainer.style.display = 'none';
		playerListContainer.style.opacity = 0;
		playerListContainer.style.transition = 'opacity .3s ease-in';
	}

	for (i = 0; i < totalCountries; i++) {
		document.querySelector('#stt-currentCountry').innerText = i + 1;

		let thisDiv = document.createElement('div');
			thisDiv.id = 'roll-all_'+i;
			thisDiv.className = 'roll-all-entry';

		let countrySafe = countries[i].country.replace(' ', '-').toLowerCase();

		currCountryFlagExtension = 'png';
		if (countrySafe === 'armenia' || countrySafe === 'czechia') currCountryFlagExtension = 'svg';

		if (countriesFull == totalPlayers) {
			cpu.incrementCountryCount();
			cpu.assignCountry(countries[i]);

			thisDiv.innerHTML = '<span class="flag-country"><img src="assets/'+countrySafe+'/'+countrySafe+'-flag.'+currCountryFlagExtension+'" width="32" height="32">'+countries[i].country+'</span><div> assigned to '+cpu.name+'</div>';
			document.querySelector('.log-entries').insertAdjacentElement('beforeend', thisDiv);
		} else {
			playerNumber = randomPlayer();

			thisDiv.innerHTML = '<span class="flag-country"><img src="assets/'+countrySafe+'/'+countrySafe+'-flag.'+currCountryFlagExtension+'" width="32" height="32">'+countries[i].country+'</span><div> assigned to '+players[playerNumber].name+'</div>';
			document.querySelector('.log-entries').insertAdjacentElement('beforeend', thisDiv);

			players[playerNumber].incrementCountryCount();
			players[playerNumber].assignCountry(countries[i]);

			if (players[playerNumber].countryCount == countriesPerPlayer) countriesFull++;
		}
	}

	if (cpu.countryCount > 0) players.push(cpu);

	if (i === totalCountries) {
		setTimeout(function() {
			for (j = 0; j < totalCountries; j++) {
				document.querySelector('#roll-all_'+j).style.opacity = 1;
			}
		}, 100);

		setTimeout(function() {
			playerListContainer.style.display = 'flex';
			playerListContainer.style.opacity = 1;
		}, 300);
	}

	updatePlayerBlocks();
}



function buildArtist() {
	let domAssigned = document.createElement('div');
		domAssigned.classList.add('assigned');

	let domArtistHolder = document.createElement('div');
		domArtistHolder.classList.add('artist-holder');
	
	let domArtistImgHolder = document.createElement('div');
		domArtistImgHolder.classList.add('artist-img', 'slide-image');
	
	let domArtistImg = document.createElement('img');
		domArtistImg.classList.add('js-artistImg');
	
	let domArtistCountry = document.createElement('div');
		domArtistCountry.classList.add('artist-country');

	let domCountryFlag = document.createElement('img');
		domCountryFlag.classList.add('js-countryImg');

	let domCountryText = document.createElement('span');
		domCountryText.classList.add('js-countryText');
		
	let domArtistName = document.createElement('h2');
		domArtistName.classList.add('artist-name');

	let domArtistSong = document.createElement('div');
		domArtistSong.classList.add('artist-song');

	let domSingingFor = document.createElement('h3');
		domSingingFor.classList.add('js-singingFor');
		domSingingFor.innerText = 'Singing For';

	let domAssignedTo = document.createElement('div');
		domAssignedTo.classList.add('assigned-to');

	let domIframeHolder = document.createElement('div');
		domIframeHolder.classList.add('videoWrapper', 'slide-video');

	let domIframe = document.createElement('iframe');
		domIframe.width = '368px';
		domIframe.height = '207px';
		domIframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
		domIframe.allowfullscreen = true;
		domIframe.title = 'YouTube video player';
		domIframe.src = 'https://www.youtube.com/embed/CoUTzNXQud0'; // If I don't set a default src it won't show on the first slide :(
		domIframe.classList.add('js-video-frame');

	let domSlideContainer = document.createElement('div');
		domSlideContainer.classList.add('slide-container');

	let ctrlContainer = document.createElement('div');
		ctrlContainer.classList.add('ctrl-container');

	let ctrlImageSlide = document.createElement('div');
		ctrlImageSlide.classList.add('ctrl-image-slide');
		ctrlImageSlide.innerHTML = '<i class="fas fa-chevron-left"></i>';

	let ctrlVideoSlide = document.createElement('div');
		ctrlVideoSlide.classList.add('ctrl-video-slide');
		ctrlVideoSlide.innerHTML = '<i class="fas fa-chevron-right"></i>';

	domAssigned.appendChild(domArtistHolder);
		domArtistHolder.appendChild(domSlideContainer);
			domSlideContainer.appendChild(domArtistImgHolder);
//		domArtistHolder.appendChild(domArtistImgHolder);
				domArtistImgHolder.appendChild(domArtistImg);
			domSlideContainer.appendChild(domIframeHolder);
//		domArtistHolder.appendChild(domIframeHolder);
				domIframeHolder.appendChild(domIframe);
			domSlideContainer.appendChild(ctrlContainer);
				ctrlContainer.appendChild(ctrlImageSlide);
				ctrlContainer.appendChild(ctrlVideoSlide);
		domArtistHolder.appendChild(domArtistCountry);
			domArtistCountry.appendChild(domCountryFlag);
			domArtistCountry.appendChild(domCountryText);
		domArtistHolder.appendChild(domArtistName);
		domArtistHolder.appendChild(domArtistSong);
	domAssigned.appendChild(domSingingFor);
	domAssigned.appendChild(domAssignedTo);

	document.querySelector('.log-entries').appendChild(domAssigned);

	let imgSlide = document.querySelector('.slide-image');
	let vidSlide = document.querySelector('.slide-video');

	let imgSlideCtrl = document.querySelector('.ctrl-image-slide');
		imgSlideCtrl.addEventListener('click', () => {
			vidSlide.classList.remove('slideInVid');
			imgSlide.classList.remove('slideOutImg');
		});

	let vidSlideCtrl = document.querySelector('.ctrl-video-slide');
		vidSlideCtrl.addEventListener('click', () => {
			imgSlide.classList.add('slideOutImg');
			vidSlide.classList.add('slideInVid');
		});
}



function startSweep() {
	loadPlayerHolders();

	document.querySelector('.js-assignInfo').style.opacity = 1;
	document.querySelector('#stt-countriesTotal').innerText = totalCountries;

	buildArtist();
}



function setNextCountry(timerPlayerNameIn, timerCountryNameIn, timerFlagGrow, timerStart) {
	currCountryFlag = countries[stepPosition].country.replace(' ', '-').toLowerCase();
	currCountryName = countries[stepPosition].country;

	document.querySelector('#stt-currentCountry').innerText = stepPosition + 1;

	currCountryFlagExtension = 'png';
	if (currCountryFlag === 'armenia' || currCountryFlag === 'czechia') currCountryFlagExtension = 'svg';

	// document.querySelector('.js-artistImg').src = 'assets/'+currCountryFlag+'/'+currCountryFlag+'.jpg';
	document.querySelector('.js-artistImg').src = 'assets/'+currCountryFlag+'/'+currCountryFlag+'.webp';
	//document.querySelector('.js-countryImg').src = `assets/${currCountryFlag}/${currCountryFlag}-flag.png`;
	document.querySelector('.js-countryImg').src = `assets/${currCountryFlag}/${currCountryFlag}-flag.${currCountryFlagExtension}`;
	document.querySelector('.js-countryText').innerText = currCountryName;
	document.querySelector('.artist-name').innerText = countries[stepPosition].artist;
	document.querySelector('.artist-song').innerText = countries[stepPosition].song;
	document.querySelector('.js-video-frame').src = countries[stepPosition].video;

	setTimeout(function() {
		setTimeout(function() {
			document.querySelector('.artist-holder').style.opacity = 1;

			setTimeout(function() {
				document.querySelector('.js-singingFor').style.opacity = 1;

				setTimeout(function() {
					document.querySelector('.assigned-to').style.opacity = 1;
				}, timerPlayerNameIn);
			}, timerCountryNameIn);
		}, timerFlagGrow);
	}, timerStart);
}



function assignArtistTo(playerName, playerNumber, tableRow, timerPanelName) {
	document.querySelector('.assigned-to').innerText = playerName;

	currCountryFlagExtension = 'png';
	if (currCountryFlag === 'armenia' || currCountryFlag === 'czechia') currCountryFlagExtension = 'svg';

	let tbl = document.querySelector('#player-table_'+(playerNumber));
	let rows = tbl.rows;
	rows[tableRow].cells[0].innerHTML = `<img src="assets/${currCountryFlag}/${currCountryFlag}-flag.${currCountryFlagExtension}" width="20" height="20">`;
	rows[tableRow].cells[1].innerText = currCountryName;

	setTimeout(function() {
		rows[tableRow].classList.add('is-visible');
	}, timerPanelName);
}



function assignCPU(timerPanelName) {
	cpu.incrementCountryCount();
	cpu.assignCountry(countries[stepPosition]);

	if (cpu.countryCount === 1) players.push(cpu);

	assignArtistTo(cpu.name, totalPlayers, cpu.countryCount - 1, timerPanelName);
}



function assignPlayer(timerPanelName) {
	playerNumber = randomPlayer();

	document.querySelector('.assigned-to').innerText = players[playerNumber].name;

	assignArtistTo(players[playerNumber].name, playerNumber, players[playerNumber].countryCount, timerPanelName);

	players[playerNumber].incrementCountryCount();
	players[playerNumber].assignCountry(countries[stepPosition]);

	if (stepPosition < totalCountries && players[playerNumber].countryCount == countriesPerPlayer) countriesFull++;
}



function singleAssign() {
	let timerStart = 1000;
	let timerFlagGrow = 100;
	let timerCountryNameIn = 3000;
	let timerPlayerNameIn = 3000;
	let timerPanelName = timerStart + timerFlagGrow + timerCountryNameIn + timerPlayerNameIn;
	let timerNextCountry = 10000;

	if (stepPosition == 0) startSweep();

	document.querySelector('.slide-image').classList.remove('slideOutImg');
	document.querySelector('.slide-video').classList.remove('slideInVid');

	if (stepPosition < totalCountries) {
		setNextCountry(timerPlayerNameIn, timerCountryNameIn, timerFlagGrow, timerStart);

		if (countriesFull === totalPlayers) {
			assignCPU(timerPanelName);
		} else {
			assignPlayer(timerPanelName);
		}

		stepPosition++;
	}
}



function stepAssign() {
	let timerStart = 1000;
	let timerFlagGrow = 100;
	let timerCountryNameIn = 3000;
	let timerPlayerNameIn = 3000;
	let timerPanelName = timerStart + timerFlagGrow + timerCountryNameIn + timerPlayerNameIn;
	let timerNextCountry = 10000;

	if (stepPosition == 0) startSweep();

	if (stepPosition < totalCountries) {
		setNextCountry(timerPlayerNameIn, timerCountryNameIn, timerFlagGrow, timerStart);

		if (countriesFull === totalPlayers) {
			assignCPU(timerPanelName);
		} else {
			assignPlayer(timerPanelName);
		}

		stepPosition++;

		setTimeout(function() {
			document.querySelector('.artist-holder').style.opacity = 0;
			document.querySelector('.js-singingFor').style.opacity = 0;
			document.querySelector('.assigned-to').style.opacity = 0;
		}, (timerNextCountry - timerStart));

		setTimeout(function() {
			stepAssign();
		}, timerNextCountry);
	}
}



// Because apparenly I can't use country as a function name, it complains about constructors.
function acountry(artist, song, country, video) {
	this.artist = artist;
	this.song = song;
	this.country = country;
	this.video = video;
}



function addArtist(artist, song, country, video) {
	countries.push(new acountry(artist, song, country, video));
	shuffleArray(countries);
	updateTotalStats();
}



function player(name) {
	this.name = name;
	this.countryCount = 0;
	this.assignedCountries = [];

	this.assignCountry = (country) => {
		this.assignedCountries.push(country);
	}

	this.incrementCountryCount = (amount = 1) => {
		this.countryCount += amount;
	}
}



function addPlayer(name) {
	var name = name == undefined ? document.getElementById('playerName').value : name;

	if (name == '') {
		unnamed++;
		name = 'Unnamed ' + unnamed;
	}

	let playerDiv = document.createElement('div');
		playerDiv.style.opacity = 0;
		playerDiv.style.transition = 'opacity .5s ease-in';
		playerDiv.innerText = name;

	document.getElementById('playerList').insertAdjacentElement('beforeend', playerDiv);
	setTimeout(function() {
		playerDiv.style.opacity = 1;
	}, 100);

	players.push(new player(name));
	players.sort();

	updateTotalStats();
}



function randomPlayer() {
	let player = Math.floor(Math.random() * totalPlayers);

	return players[player].countryCount == countriesPerPlayer ? randomPlayer() : player;
}



function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}



function updatePlayerBlocks() {
	let playersContainer = document.querySelector('.assigns');
	let playerBlock;
	let j = 0;
	let i = 0;

	for (i = 0; i < totalPlayers; i++) {
		playerBlock  = '<div class="profile">';
		playerBlock += '<h2>'+players[i].name+'</h2>';
		playerBlock += '<table class="table profile-stats">'; // I really shouldn't be using tables but this was a C&P from some old code that also had score columns and such. Change later.
		playerBlock += '<tbody>';

		let playerCountriesCount = players[i].countryCount;
		for (j = 0; j < playerCountriesCount; j++) {
			currCountryFlag = players[i].assignedCountries[j].country.replace(' ', '-').toLowerCase();
			//console.log(currCountryFlag);
			currCountryFlagExtension = 'png';
			if (currCountryFlag === 'armenia' || currCountryFlag === 'czechia') currCountryFlagExtension = 'svg';

			playerBlock += '<tr>';
			playerBlock += '<td><img src="assets/'+players[i].assignedCountries[j].country.replace(' ', '-').toLowerCase()+'/'+players[i].assignedCountries[j].country.replace(' ', '-').toLowerCase()+'-flag.'+currCountryFlagExtension+'"></td>';
			playerBlock += '<td>'+players[i].assignedCountries[j].country+'</td>';
			playerBlock += '</tr>';
		}

		playerBlock += '</tbody>';
		playerBlock += '</table>';
		playerBlock += '</div>';

		playersContainer.insertAdjacentHTML('beforeend', playerBlock);
	}

	if (cpu.countryCount > 0) {
		playerBlock  = '<div class="profile">';
		playerBlock += '<h2>'+cpu.name+'</h2>';
		playerBlock += '<table class="table profile-stats">';
		playerBlock += '<tbody>';

		cpuCountriesCount = cpu.countryCount;
		for (j = 0; j < cpuCountriesCount; j++) {
			currCountryFlag = players[i].assignedCountries[j].country.replace(' ', '-').toLowerCase();
			currCountryFlagExtension = 'png';
			if (currCountryFlag === 'armenia' || currCountryFlag === 'czechia') currCountryFlagExtension = 'svg';

			playerBlock += '<tr>';
			playerBlock += '<td><img src="assets/'+cpu.assignedCountries[j].country.replace(' ', '-').toLowerCase()+'/'+cpu.assignedCountries[j].country.replace(' ', '-').toLowerCase()+'-flag.'+currCountryFlagExtension+'"></td>';
			playerBlock += '<td>'+cpu.assignedCountries[j].country+'</td>';
			playerBlock += '</tr>';
		}

		playerBlock += '</tbody>';
		playerBlock += '</table>';
		playerBlock += '</div>';

		playersContainer.insertAdjacentHTML('beforeend', playerBlock);
	}
}



function updateTotalStats() {
	totalCountries = countries.length;
	totalPlayers = players.length;
	countriesPerPlayer = totalPlayers > 0 ? Math.floor(totalCountries / totalPlayers) : 0;
	floatingCountries = totalPlayers > 0 ? totalCountries - (countriesPerPlayer * totalPlayers) : totalCountries;

	document.querySelector('#countryCount').innerText = totalCountries;
	document.querySelector('#playerCount').innerText = cpu.countryCount > 0 ? totalPlayers - 1 : totalPlayers;
	document.querySelector('#countriesPerPlayer').innerText = countriesPerPlayer;
	document.querySelector('#floatingCountries').innerText = floatingCountries;
	document.querySelector('#stt-countriesTotal').innerText = totalCountries;
}



function createPlayerBlock(id, name, override) {
	playerBlock  = '<div class="profile">';
	playerBlock += '<h2>'+name+'</h2>';
	playerBlock += '<table class="table profile-stats">';
	playerBlock += '<tbody id="player-table_'+id+'">';

	let i = 0;
	let placeholders = override != undefined ? override : countriesPerPlayer;
	for (i = 0; i < placeholders; i++) {
		playerBlock += '<tr id="country_'+i+'" class="toggle-content"><td>&nbsp;</td><td>&nbsp;</td></tr>';
	}

	playerBlock += '</tbody>';
	playerBlock += '</table>';
	playerBlock += '</div>';

	document.querySelector('.assigns').insertAdjacentHTML('beforeend', playerBlock);
}



function loadPlayerHolders() {
	for (i = 0; i < totalPlayers; i++) {
		createPlayerBlock(i, players[i].name);
	}

	if (floatingCountries > 0) {
		createPlayerBlock(i, cpu.name, floatingCountries);
	}
}