## Table of Contents

- [What Is This?](#what-is-this)
- [Original Project Requirements](#original-project-requirements)
  - [Summary](#summary)
  - [Video Demonstration](#video-demonstration)
  - [Features](#features)
  - [Resources](#resources)
- [Features and Functionality I've added](#features-and-functionality-ive-added)
- [Features and Functionality That's Next](#features-and-functionality-thats-next)
- [Credits](#credits)

## What Is This?
  This is a web app I created as the capstone project for an 8week(+2week) course I took to learn ReactJS. This is a very nice culmination of the things I learned during the course.

## Original Project Requirements
Below is the original instructions with projects requirements, a video demonstration of how the finished web app should work, features the finished web app should have, and some resources so we can focus on the Javascript/React portion of the project.
  ### Summary
  Use your knowledge of React components, state, and requests with the Spotify API to build a website that allows users to search the Spotify library, create a custom playlist, then save it to their Spotify account.
  
  ### Video Demonstration
  [Link to video demonstration](https://s3.amazonaws.com/codecademy-content/programs/react/jammming/jammming-demonstration.mp4)
  
  ### Features
  Below is a list of the website's features:
  - Spotify Login — the first time a user searches for a song, album, or artist, Spotify will ask them to log in or set up a new account. You will need to follow the steps in the Spotify Developer Guide to register your application.
  - Search by Song, Album, or Artist — a user can type the name of a song, artist, or album into the search bar and click the SEARCH button. The app will request song data about the user's input from the Spotify library (find Spotify endpoints here).
  - Populate Results List — Jammming displays the list of returned tracks from the user's query.
  - Add Song to a Custom Playlist — users can add a track to their playlist by selecting a + sign on the right side of the track's display container.
  - Remove Song from Custom Playlist — users can remove a track from their playlist by selecting a - sign on the right side of the track's display container.
  - Change Playlist Title — users can change the title of their custom playlist.
  - Save Playlist to Account — users can save their custom playlist by clicking a button called SAVE TO SPOTIFY.

  ### Resources
  Because we want you to focus on building the React infrastructure, we have provided links to the HTML/CSS and visual assets below. Notice, we did not break the HTML and CSS into their components. To complete the project you will need to split the HTML/CSS into their components.
  - [index.html](https://s3.amazonaws.com/codecademy-content/programs/react/jammming/static-html-css/indexHtml.txt) — all of the HTML for a static version of the website.
  - [style.css](https://s3.amazonaws.com/codecademy-content/programs/react/jammming/static-html-css/indexCss.txt) — all of the CSS for a static version of the website.
  - [image assets](https://s3.amazonaws.com/codecademy-content/programs/react/jammming/image_assets.zip) — all of the image assets used in the website.
  
## Features and Functionality I've added
  ### Retaining The Search Term When Fetching An Access Token
  - The access token is typically fetched upon entering a search term and clicking search.
  - The access token is gotten by going to an url endpoint on Spotify with the apps client id and a callback url in the endpoint url
    - At this endpoint, if the user has not yet approved the app they will approve the app to give it permission to access the public playlists on their Spotify account. They will be asked to login before this if they weren't already logged in.
    - If the user has already approved the app on a previous visit, it doesn't stop here.
    - The Spotify end point then sends the user back via the specified callback url along with some parameters in the url, one of which is the access token.
  - Upon returning to the Jammming webpage, the search term is gone and no search results are shown. This is because it's as if we reloaded the page, because in a way we did.
  - Looked at the Spotify Docs and found that a 'state' variable could be sent as a url parameter to the endpoint for getting an access token, one of the parameters in the url on the return is then this same variable.
  - With this knowledge, I changed the app's function for fetching and setting the access to allow for the search term as a parameter.  I was then able to pass the search term to 
    
  - Previously, when the application first took the user to go get an access token from Spotify, 
  ### Improved Authentication Flow
  - I changed the authentication flow to feel more seamless to the user.
  - Previously, when the user landed on the site they would have to try searching for something at least two times—often three times—before the search results would actually come through.
    - One time to go request the access token from Spotify
    - A second time to store the access token, and if timing lines up perfectly it will then use the access token to make the search
    - A third time when the timing inevitably did not line up on the second time.
  - This created for an awful user experience so I set out to improve upon it.

## Features and Functionality That's Next
  aaa

## Credits
  Giving credit where it's due:
  - This project was started using [Create React App](https://github.com/facebookincubator/create-react-app)
  - The _original_ CSS and images were written/procured by someone at Codecademy (https://codecademy.com)
    - These assets have been changed slightly as of this writing, and I have plans to overhaul the CSS.

