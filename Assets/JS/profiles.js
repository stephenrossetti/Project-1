class PetProfile {
    constructor(name, weight){
        this.name = name;
        this.weight = weight;
    }

    getName(){ return this.name; }
    getWeight(){ return this.weight; }
}

var profileList = [];
loadProfiles();

$('#save-btn').on('click', function(event) {
    event.preventDefault();
    var petName = $('#pet-name').val().trim();
    var petWeight = $('#pet-weight').val().trim();
    
    
    //grabs values from the two text inputs
    if(petName.length !== 0 && petWeight.length !== 0){ //if neither are empty
        var petProfile = new PetProfile(petName, petWeight); //creates new petProfile object using the two grabbed values
            console.log('\tName: '+petProfile.getName());
            console.log('\tWeight: '+petProfile.getWeight());
        profileList.push(petProfile);


        localStorage.setItem("profileList", JSON.stringify(profileList)); //saves that profileList array to local storage
        console.log('New pet profile saved!');
            
        console.log('You now have ' + profileList.length + ' pet profiles saved.');
        loadProfiles();

    }
});

$('#clear-profs').on('click', function(){ 
    profileList.length = 0;
    localStorage.setItem("profileList", JSON.stringify(profileList));
    loadProfiles(); 
    console.log('Profiles cleared!');
    $('#pet-name').val('');
    $('#pet-weight').val('')
})

$('#profile-dropdown').on('change', function(){ //this function will be triggered if an option is selected
    if ($(this).find(':selected').text() === 'Select a profile'){ //if the default option is selected, clear the input boxes
        console.log('Clearing form');
        $('#pet-name').val('');
        $('#pet-weight').val('');
    }
    else {
        console.log('New profile selected');
        var selectedProfile = JSON.parse($(this).val()); //the profile linked to each option is saved in the value attr, so this pulls it and parses it from JSON to regular
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
    
    
    storedList = JSON.parse(localStorage.getItem('profileList'));
    if (storedList !== null){
        profileList = storedList;
        for (var i = 0; i < profileList.length; i++){ //if array is empty, then this shouldn't go through and just default will be loaded
            var tempProfile = new PetProfile(profileList[i].name, profileList[i].weight);
            var newOption = $('<option>');
            newOption.attr('value', JSON.stringify(tempProfile));
            newOption.text(tempProfile.getName());
            $('#profile-dropdown').append(newOption);
        }
    }
    
}
    