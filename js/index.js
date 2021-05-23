document.addEventListener("DOMContentLoaded", () => {
  submitFormListener();
});

function fetchUsers() {
  const userInput = document.querySelector("input#search");
  const userSearchQuery = encodeURIComponent(userInput.value);
  fetch(`https://api.github.com/search/users?q=${userSearchQuery}`)
  .then(resp => resp.json())
  .then(json => returnUsers(json))
}

function returnUsers(json) {
  for (const user of json.items) {
    createUserElement(user);
  }
  
}

function createUserElement(user) {
  const userList = document.querySelector("ul#user-list")
  const div = document.createElement("div")
  div.setAttribute("class", "user");
  const h2 = document.createElement("h2");
  h2.innerText = user.login;
  h2.style.cursor = "pointer";
  const p = document.createElement("p");
  const a = document.createElement("a");
  a.setAttribute("href", `${user.html_url}`);
  a.innerText = `${user.html_url}`;
  p.appendChild(a);
  const img = document.createElement("img");
  img.setAttribute("src", user.avatar_url);
  img.width = 300;
  img.height = 175;

  userList.appendChild(div)
  div.appendChild(h2);
  div.appendChild(p);
  div.appendChild(img);

  div.addEventListener("click", function() {
    if (event.target === h2) {
      showUserRepos(user.login);
    }
  })
}

function showUserRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
  .then(resp => resp.json())
  .then(json => showUserRepoElements(json))
}

function showUserRepoElements(json) {
  debugger;
}

function submitFormListener() {
  const submitForm = document.querySelector("div#main")

  submitForm.addEventListener("click", function(event) {
    if (event.target === submitForm.querySelectorAll("input")[1]) {
      event.preventDefault();
      console.log("success");
      fetchUsers();
    }
  })
}
