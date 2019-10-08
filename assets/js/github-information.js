//user.name will return the users public display name
//href will provide a link to the user's public profile on GitHub.
//gh-content is wheere the is where the content about the user is going to appear
//gh-avatar is where there git hub avatar will appear
function userInfomationHTML(user) {
  return;
  `<h2>${user.name}
  <span>"small-name<'span>
  (@<a href="${user.hml_url}"target="_blank">${user.login}</a>)
  </span></h2>
  <div class="gh-content>
  <div class="gh-avatar>
  <a href="${user.html_url}"target="blank">
  <img src="${user.avatar_url}" width="80px height="80px" alt="${user.login}"/>
  </a> <div>
  <<br>Followers: ${user.followers}-folllowing${user.following}<br>Repos: ${user.pubic_repos}</p>
  </div>
  `;
}

//function to feth the git hub infomation here
function fetchGitHubInformation(event) {
  //var added here for username value(what goes inside the box)
  var username = $("#gh-username").val();
  //if theres noting inside the box enter a  h2 element  in the div just below the box
  if (!username) {
    $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
    return;
  }
  //other wise put this loading gif in the div below the box
  $("#gh-user-data").html(
    `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />
        </div>`
  );

  //Promises
  //$when(we got a response from the GitHub API )
  //.then (function to display in the gh-user-data-div)
  //unless we get an error!is whats happening below
  //when() method takes get jason function as its first argument
  //when() thats done then() we want to display the github user data  it in gh-user-data-div(the box)
  //the response passed in as agrument is the response that came back from our get json method
  //then select user data div//(userInfomationHTML is a function that hasnt been created yet userdata(response) will be passed in
  //an error function is then added//if errorResponse is not found then 'no infomation was found'
  //which means if the git hub username cannot be found
  // ' No Infomation was found for user ' will be displayed plus the incorrect github
  // {username}that was wriiten as a value in the box
  //we add the last else incase the error that comes back is not a 404 error
  //then error plus the json response will be displayed

  $.when($.getJSON(`https://api.github.com/users/${username}`)).then(
    function(response) {
      var userData = response;
      $("#gh-user-data").html(userInfomationHTML(userData));
    },
    function(errorResponse) {
      if (errorResponse.status === 404) {
        $("gh-user-data").html(
          `<h2>No Infomation was found for user ${username}</h2>`
        );
      } else {
        console.log(errorResponse);
        $("#gh-user-data").html(
          `<h2>Error${errorResponse.responseJSON.message}</h2>`
        );
      }
    }
  );
}
