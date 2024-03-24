import { DiscordSDK } from "@discord/embedded-app-sdk";

import rocketLogo from '/rocket.png';
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
let counter = 0;
          const counterButton = document.getElementById("counter");
  
          counterButton.addEventListener("click", myFunction);
  
      function myFunction() {
        counter++;
        counterButton.textContent = counter;
          if (counter > 200) {
            counterButton.style.backgroundColor = '#000000';
          } else if (counter > 100) {
            counterButton.style.backgroundColor = '#111111';
          }
      }

      discordSdk.commands.openExternalLink({
        url: 'https://discord.com/oauth2/authorize?client_id=1219430550478131291',
      });