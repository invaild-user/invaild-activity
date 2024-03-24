import { DiscordSDK } from "@discord/embedded-app-sdk";

// import rocketLogo from '/rocket.png';
import "./style.css";


// Will eventually store the authenticated user's access_token
let auth;

const discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);

setupDiscordSdk().then(() => {
  console.log("Discord SDK is authenticated");
  
  // We can now make API calls within the scopes we requested in setupDiscordSDK()
  // Note: the access_token returned is a sensitive secret and should be treated as such
});

async function setupDiscordSdk() {
  await discordSdk.ready();
  console.log("Discord SDK is ready");

  // Authorize with Discord Client
  const { code } = await discordSdk.commands.authorize({
    client_id: import.meta.env.VITE_DISCORD_CLIENT_ID,
    response_type: "code",
    state: "",
    prompt: "none",
    scope: [
      "identify",
      "guilds",
    ],
  });

  

  // Retrieve an access_token from your activity's server
  const response = await fetch("/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
    }),
  });
  const { access_token } = await response.json();

  // Authenticate with Discord client (using the access_token)
  auth = await discordSdk.commands.authenticate({
    access_token,
  });

  if (auth == null) {
    throw new Error("Authenticate command failed");
  }
}

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Click the button!</h1>
    <button type="button" id="counter" onclick="myFunction()">Click Me!</button>
  </div>
`;

const tag = '#';
let color = 0; // Initialize color to 0
let counter = 0;
const counterButton = document.getElementById("counter");

// Mapping function to convert numbers greater than 9 to hexadecimal characters
function toHexChar(num) {
    if (num >= 0 && num <= 9) {
        return num.toString(); // For numbers 0-9, return them as string
    } else {
        return String.fromCharCode(97 + num - 10); // For numbers greater than 9, map to 'a', 'b', 'c', etc.
    }
}

counterButton.addEventListener("click", myFunction);

function myFunction() {
    counter++;
    color += 100; // Increment color by 100
    counterButton.textContent = counter;
    if (counter % 100 === 0) {
        let hexColor = tag;
        for (let i = 0; i < 6; i++) {
            hexColor += toHexChar(Math.floor(color / Math.pow(16, 5 - i)) % 16); // Convert each pair of color values to hexadecimal characters
        }
        counterButton.style.backgroundColor = hexColor;
    }
}
/*
const tag = '#';
let firstHalf = '000';
let counter = 0;
const counterButton = document.getElementById("counter");

counterButton.addEventListener("click", myFunction);

function myFunction() {
    counter++;
    firstHalf += 100; // Increment color by 100

    counterButton.textContent = counter;
    if 
    if (counter % 100 === 0) {
        counterButton.style.backgroundColor =
    }
}
*/