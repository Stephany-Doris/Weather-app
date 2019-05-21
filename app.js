window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let degree = document.querySelector('.degree');
    let locationTimezone = document.querySelector('.location-timezone');
    
    if (navigator.geolocation) {  //to ask user to allow location access
        navigator.geolocation.getCurrentPosition(
            position =>{        //running an error function
                long = position.coords.longitude;
                lat = position.coords.latitude;
                
                const proxy = `https://cors-anywhere.herokuapp.com/`;
                const api =`${proxy}https://api.darksky.net/forecast/d30d445767674d940faba51470762a7f/${lat},${long}`;

                fetch(api)    //make a call for the url with our own lat and long
                .then(response =>{     //what to do with the data fetched
                     return response.json();
          
                })      
              .then(data => {
                const {temperature, summary, icon} = data.currently;  //ES15 allows to pull up the data from data.currently by shortening our syntax
            //set DOM elements from the API
            
            degree.textContent = temperature;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            //set icon
            setIcons(icon, document.querySelector('.icon'));

            });
            
     });
    }
      
    function setIcons(icon, iconID){
        const skycons = new Skycons({color: 'white'});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();         //replaces every - with _
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});