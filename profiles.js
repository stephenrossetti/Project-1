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

$('#profile-dropdown').on('change', function(){
    if ($(this).find(':selected').text() === 'Select a profile'){
        console.log('Clearing form');
        $('#pet-name').val('');
        $('#pet-weight').val('');
    }
    else {
        console.log('New profile selected');
        var selectedProfile = JSON.parse($(this).val());
        var tempProfile = new PetProfile(selectedProfile.name, selectedProfile.weight);
        console.log('Loading ' + tempProfile.getName() + '\'s data');
        if (selectedProfile !== null){
            var tempProfile = new PetProfile(selectedProfile.name, selectedProfile.weight);
            console.log('Loading ' + tempProfile.getName() + '\'s data');
            $('#pet-name').val(tempProfile.getName());
            $('#pet-weight').val(tempProfile.getWeight());
        }
    }
});

function loadProfiles(){
    $('#profile-dropdown').empty()
    var defaultOption = $('<option>');
    defaultOption.text('Select a profile');
    $('#profile-dropdown').append(defaultOption);

    if (localStorage.length > 0){
        for (var i = 1; i <= localStorage.length; i++){
            var storedProfile = JSON.parse(localStorage.getItem('petProfile'+i));
            var tempProfile = new PetProfile(storedProfile.name, storedProfile.weight);

            var newOption = $('<option>');
            newOption.attr('value', JSON.stringify(tempProfile));
            newOption.text(tempProfile.getName());
            $('#profile-dropdown').append(newOption);
        }
    }
}
    