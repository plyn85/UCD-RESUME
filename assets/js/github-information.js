//user passed in here is an object from our gitHub Api
//function below adds users git hub information to the input box its passed into the function below
function userInformationHTML(user) {
  return `
      <h2>${user.name}
          <span class="small-name">
              (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
          </span>
      </h2>
      <div class="gh-content">
          <div class="gh-avatar">
              <a href="${user.html_url}" target="_blank">
                  <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
              </a>
          </div>
          <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
      </div>`;
}
//function below will get repo infomation from the github API
//and return a list of github repos
//repos passed in here is an object from our gitHub API
//if the gitnhub repository is empty return non repos
//then the map method is used to loop trough the repos array
//and will return an array with the results of the function
//repo html link will take us to the actul repo when we click on it
//repo.name will be the name of the repo, which will bw  displayed inside the link

function repoInformationHTML(repos) {
  if (repos.length === 0) {
    return `<div class ="clearfix repo-list">No Repos</div>`;
  }
  var listItemsHTML = repos.map(function(repo) {
    return `
<li>
<a href="${repo.html_url}" target="blank">${repo.name}</a>
</li>
    `;
  });
  return `<div class="clearfix repo-list">'

  <p><strong>Repo List:</strong></p>
  <ul>${listItemsHTML.join("\n")}</ul></div>
  `;
}

//if theres no username in box display the <h2> in user data div
function fetchGitHubInformation(event) {
  //setting the html content to an empty string here has the effect of emptying these divs when the text cox is empty
  $("gh-user-data").html("");
  $("gh-repo-data").html("");
  var username = $("#gh-username").val();
  if (!username) {
    $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
    return;
  }
  //or else dispaly laoding gif
  $("#gh-user-data").html(
    `<div id="loader">
          <img src="assets/css/loader.gif" alt="loading..." />
      </div>`
  );

  //fetch json data from git hub server
  //response is passed into function above
  //two get json calls means too responses in our functions
  //when we have two responses the when method makes each response an array
  //each will be the first element of the array
  $.when(
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)
  ).then(
    function(firstResponse, secondResponse) {
      var userData = firstResponse[0];
      var repoData = secondResponse[0];
      $("#gh-user-data").html(userInformationHTML(userData));
      $("#gh-repo-data").html(repoInformationHTML(repoData));
    },
    //404 means not found and 403 means forbbidden
    //adding the second else if statment because github has a limt on how may request u can make in a given time frame
    //X-RateLimit-Reset this is a header thats provided by git hub to let us know when our quota will be reset
    // to get it into a format we can read, we need to multiply it by 1000 and then turn it into a date object.
    function(errorResponse) {
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
      } else if (errorResponse.status === 403) {
        var resetTime = new Date(
          errorResponse.getResponseHeader("X-RateLimit-Reset") * 1000
        );
        $("#gh-user-data").html(resetTime);
      } else {
        console.log(errorResponse);
        $("#gh-user-data").html(
          `<h2>Error: ${errorResponse.responseJSON.message}</h2>`
        );
      }
    }
  );
}
//adding this line means that octo cat is automatically displayed when the page is loaded
$(document).ready(fetchGitHubInformation);
