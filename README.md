## Table of Contents

- [What Is This?](#what-is-this)
- [Original Project Requirements](#original-project-requirements)
  - [Summary](#summary)
  - [Video Demonstration](#video-demonstration)
  - [Features](#features)
  - [Resources](#resources)
- [Features and Functionality I've added](#features-and-functionality-ive-added)
  - [Retaining The Search Term When Fetching An Access Token](#retaining-the-search-term-when-fetching-an-access-token)
  - [Improved Authentication Flow](#improved-authentication-flow)  
  - [Perform Search Upon Hitting Enter in Search Field](#perform-search-upon-hitting-enter-in-search-field)
  - [Remove Track From Search Results Upon Adding to Playlist](#remove-track-from-search-results-upon-adding-to-playlist)
  - [Use the React-Alert Package For More User Feedback](#use-the-react-alert-package-for-more-user-feedback)
  - [Added 'Load More' Button](#added-load-more-button)
- [Features and Functionality That's Next](#features-and-functionality-thats-next)
  - [View Full List](#features-and-functionality-thats-next)
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
   #### Background
   The access token is typically fetched upon entering a search term and clicking search. The access token is gotten by going to a URL endpoint on Spotify with the app's client id and a callback url in the endpoint URL. At this endpoint, if the user has not yet approved the app they will approve the app to give it permission to access the public playlists on their Spotify account. They will be asked to login before clicking approve, if they weren't already logged in. If the user has already approved the app on a previous visit, the flow from Jammming to Spotify and back is almost imperceivable to the user. The Spotify endpoint then sends the user back via the specified callback url along with some parameters in the url, one of which is the access token.
   #### Previous Behavior
   Previously, upon returning to the Jammming webpage, the search term is gone and no search results are shown. This is because it's as if we reloaded the page, because in a way we did.
   #### Solution
   I looked at the Spotify Docs and found that a 'state' variable could be sent as a URL parameter to the endpoint when requesting an access token, on the return one of the parameters in the URL is then this same variable and value. With this knowledge, I changed the app's functionality for fetching and setting the access token to send the search term as the 'state' variable in the URL. The URL on the return then contains the search term. When the app detects that a search term is present in the URL, it loads this search term into the search bar performs a search using the search term.
    
 
  ### Improved Authentication Flow
  #### Previous Behavior
  Previously, when the user landed on the site they would have to try searching for something at least two times—often three times—before the search results would actually come through.
    - One time to go request the access token from Spotify
    - A second time to store the access token, and if timing lines up perfectly it will then use the access token to make the search
    - A third time when the timing inevitably did not line up on the second time.
  - This created for an awful user experience so I set out to improve upon it.
  #### Solution
  Part of the solution to this was immediately calling on page load the function for setting the access token.  The function had to be slightly modified for this. I did not want the user to be redirected to Spotify immediately upon landing on my page, so I modified the function to accept an onLoad parameter. When the onLoad parameter is present / set to true, the app does not redirect to Spotify to get an access token. It tries to set the access token from the url, and if it can't it will wait until the user searches something. Another part of my solution was storing the access token in a cookie, along with a proper expiration. The access token can now be gotten from the cookies on page load and reload. Previously, a new access token would be requested on every page load and reload. Coming full circle here, these changes coupled with the changes to retain and use the search term when fetching an access token creates for a new, vastly improved flow.  The user now has to hit the search button just one time to get results, regardless of the access token status. The search will merely take a second or two longer to be completed, if an access token must be requested from Spotify.
   
  
 ### Perform Search Upon Hitting Enter in Search Field
 #### Background
 It has become something of an expectation among users that pressing the _Enter_, _Return_, or _Carriage Return_ key will trigger for a search or any number of other activities on websites and web apps. This means it is important to include such functionality in the relevant places. In the case of Jammming, this place is in the search bar / search field.
 #### Previous Behavior
 Previously, nothing happened if the user typed in a search term in the search bar and pressed enter.
 #### Solution
 I added a keypress event listener/handler to the searchBar component. When a key is pressed, it is checked for if it equals 'Enter'. If the key is 'Enter', a search is triggered just the same as if the search button had been pressed.


 ### Remove Track From Search Results Upon Adding to Playlist
 It now removes a track from the search results when it is added to the playlist. This gives the user a sense that something has happened in the case that they cannot see the playlist panel.  This also reduces "clutter" in the search results. There are less tracks for the user to look through.
 
 
 ### Use the React-Alert Package For More User Feedback
 A nice little notification is now shown at the bottom on the screen each time a track is added to the playlist.  Also, a little notification is now displayed when the playlist is saved to the users Spotify.
 
 
 ### Added 'Load More' Button
 Now when there are more possible search results available than are intially displayed, a 'Load More' button is placed at the end of the results list. Pressing the button triggers the app to perform an offset search which results in the _next page_ on the results being displayed.
 

## Features and Functionality That's Next
  - Adding a nice big dynamic spinning loading indicator for searching and saving playlists
    - Code is already mostly written, but not yet implemented
  - Change from using a 'Load More' button to using user scrolling for displaying more results.  Probably a 'pull up to load more' model
  - Add functionality to preview a track (listening to part of a track to determine playlist admissibility)
  - Add ability to upload custom playlist artwork / image
    - This is an exciting one because not everyone can do this even on the official Spotify client
  - Add functionality for reordering the tracks in the playlist
  - When a new search is performed, don’t display tracks already in the playlist 
  - *Maybe* Displaying album artwork in search results or playlist track list
  - *Maybe* Add ability to edit existing playlists
  - *Maybe* Allow clicking on an artists name to see more songs by them


## Credits
  Giving credit where it's due:
  - This project was started using [Create React App](https://github.com/facebookincubator/create-react-app)
  - The _original_ CSS and images were written/procured by someone at Codecademy (https://codecademy.com)
    - These assets have been changed slightly as of this writing, and I have plans to overhaul the CSS.

