class PetProfile {
    constructor(name, weight){
        this.name = name;
        this.weight = weight;
    }

    getName(){ return this.name; }
    getWeight(){ return this.weight; }
}

loadProfiles();

$('#save-btn').on('click', function(event) {
    var petName = $('#pet-name').val().trim();
    var petWeight = $('#pet-weight').val().trim(); //grabs values from the two text inputs

    if(petName.length !== 0 && petWeight.length !== 0){ //if neither are empty
        var petProfile = new PetProfile(petName, petWeight); //creates new petProfile object using the two grabbed values
        localStorage.setItem('petProfile'+(localStorage.length+1), JSON.stringify(petProfile)); //saves that petProfile object to local storage
        console.log('New pet profile saved!');
            console.log('\tName: '+petProfile.getName());
            console.log('\tWeight: '+petProfile.getWeight());
        console.log('You now have ' + localStorage.length + ' pet profiles saved.');
        loadProfiles();

    }
});

$('#profile-dropdown').on('change', function(){ //this function will be triggered if an option is selected
    if ($(this).find(':selected').text() === 'Select a profile'){ //if the default option is selected, clear the input boxes
        console.log('Clearing form');
        $('#pet-name').val('');
        $('#pet-weight').val('');
    }
    else {
        console.log('New profile selected');
        var selectedProfile = JSON.parse($(this).val()); //the profile linked to each option is saved in the value attr, so this pulls it and parses it from JSON to regular
        console.log('Loading ' + tempProfile.getName() + '\'s data');
        if (selectedProfile !== null){ //if the profile isn't null,
            var tempProfile = new PetProfile(selectedProfile.name, selectedProfile.weight);//creates a new profile with the same fields as the one from the dropdown
            console.log('Loading ' + tempProfile.getName() + '\'s data');
            $('#pet-name').val(tempProfile.getName());
            $('#pet-weight').val(tempProfile.getWeight()); //loads data into input boxes
        }
    }
});

function loadProfiles(){
    $('#profile-dropdown').empty()
    var defaultOption = $('<option>');
    defaultOption.text('Select a profile');
    $('#profile-dropdown').append(defaultOption); //this just creates a default option so the dropdown isn't completely blank when there's no profiles

    for (var i = 1; i <= localStorage.length; i++){ //if nothing in storage, then this shouldn't go through and just default will be loaded
        var storedProfile = JSON.parse(localStorage.getItem('petProfile'+i));
        var tempProfile = new PetProfile(storedProfile.name, storedProfile.weight);

        var newOption = $('<option>');
        newOption.attr('value', JSON.stringify(tempProfile));
        newOption.text(tempProfile.getName());
        $('#profile-dropdown').append(newOption);
    }
}
    