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
  //.then (function to display in thr gh-user-data-div)
  //unless we get an error!is whats happening below
  //when method takes get jason function as its first argument
  $.when($.getJSON(`https://api.github.com/users/${username}`)).then(
    function(response) {
      var userData = response;
      $("#gh-user-data").html(userInfomationHTML(userData));
    },
    function(errorResponse) {
      if (errorResponse.status === 404) {
        $("gh-user-data").html(
          `<h2>No Infomation was found for ${username}</h2>`
        );
      } else {
        console.log(error);
        $("#gh-user-data").html(
          `<h2>Error${errorResponse.responseJSON.message}</h2>`
        );
      }
    }
  );
}