


document.getElementById("btn").addEventListener("click",getWeather);
document.getElementById("input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

async function getWeather(){
    const city =  document.getElementById("input").value.trim();;
    const api_key = "L7J2TBLVF2F7DKFZMZX45JB24";
    const info  = document.getElementById("info");

    if(!city){
        info.innerHTML = "<p>Please Enter a City Name</p>";
        return;
    }
    try{
        const response = await fetch(`
            https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${api_key}&contentType=json
            `);

        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data);

        info.innerHTML = `
        <h2>${data.resolvedAddress}</h2>
        <p>Temperature: ${data.currentConditions.temp}°C</p>
        <p>Conndition: ${data.currentConditions.conditions}</p>
        <p>Humidity: ${data.currentConditions.humidity}%</p>
        <p>Wind Speed: ${data.currentConditions.windspeed} k/h</p>
        `;
    }
    catch(error){
        info.innerHTML = `<p>Error: ${error.message}</p>`
    }
}