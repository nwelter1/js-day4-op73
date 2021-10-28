// Global variables that may be used by many functions
let song;
let playSong;


// storing spotify creds
const clientId = 'YOUR CLIENT ID';
const clientSecret = 'YOUR CLIENT SECRET';

// function to go and get our API token
const getToken = async () =>{
    let result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
        },
        body: 'grant_type=client_credentials'
    });
    let data = await result.json()
    console.log(data.access_token)
    return data.access_token
};


const testApi = async() =>{
    // testing to see if I can query the API for a test song
    let token = await getToken();
    let track = 'stand up';
    let result = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    let response = await result.json();
    console.log(response)
}

const clickedEvent = async(img_index, item_index) =>{
    // testing to see if I can query the API for a test song
    let token = await getToken();
    let track = document.getElementsByTagName('img')[img_index].alt;
    let result = await fetch(`https://api.spotify.com/v1/search?q=${track}&type=track&limit=15`,{
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    let response = await result.json();
    let song = response.tracks.items[item_index].preview_url
    console.log(song)

    // TODO: Play this song functionality
    if(playSong){
        stopSnippet()
    }
    songSnippet(song)
};

/**
 * @param id
 * @param event
 * 
 * id = image id from the image gallery (html)
 * event = Mouse event given by the action of the user
 * 
 * Function produces songs from the clickedEvent based on the index
 * of our image on the page
 */

const getSong = (id, event) =>{
    switch(id){
        case 'fig1': {
            event.stopPropagation()
            clickedEvent(0,3)
            break
        }
        case 'fig2':{
            event.stopPropagation()
            clickedEvent(1,0)
            break
        }
        case 'fig3': {
            event.stopPropagation()
            clickedEvent(2,3)
            break
        }
        case 'fig4':{
            event.stopPropagation()
            clickedEvent(3,1)
            break
        }
        case 'fig5': {
            event.stopPropagation()
            clickedEvent(4,0)
            break
        }
        case 'fig6':{
            event.stopPropagation()
            clickedEvent(5,5)
            break
        }
    }
};

/**
 * @param url
 * 
 * url = song_preview that we get inside of clickedEvent
 * 
 * Function will return an Audio object to play a clip from given preview url
 * 
 */
const songSnippet = (url) =>{
    playSong = new Audio(url);
    return playSong.play()
};

const stopSnippet = () =>{
    return playSong.pause()
};



