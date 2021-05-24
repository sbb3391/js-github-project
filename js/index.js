document.addEventListener("DOMContentLoaded", () => {
  submitFormListener();
});

function fetchUsers(perPage = 30) {
  const userInput = document.querySelector("input#search");
  const userSearchQuery = encodeURIComponent(userInput.value);
  fetch(`https://api.github.com/search/users?q=${userSearchQuery}&per_page=${perPage}`)
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
      const ul = document.querySelector("ul#repos-list");
      while (ul.lastElementChild) {
        ul.lastElementChild.remove();
      }

      showUserRepos(user.login, 5);
    }
  })
}

function showUserRepos(username, perPage = 30) {
  fetch(`https://api.github.com/users/${username}/repos?per_page=${perPage}`)
  .then(resp => resp.json())
  .then(json => showUserRepoElements(json))
}

function showUserRepoElements(json) {
  for (const repo of json) {
    addRepoToDOM(repo);
  }
}

function addRepoToDOM(repo) {
  const ul = document.querySelector("ul#repos-list");
  const li = document.createElement("li");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  const p = document.createElement("p");
  const a = document.createElement("a");
  ul.appendChild(li);
  li.appendChild(div);
  div.appendChild(h2)
  div.appendChild(p);
  p.appendChild(a);
  a.setAttribute("src", repo.html_url);
  a.innerText = repo.html_url;
  h2.innerText = repo.name;

}

function submitFormListener() {
  const submitForm = document.querySelector("div#main")

  submitForm.addEventListener("click", function(event) {
    if (event.target === submitForm.querySelectorAll("input")[1]) {
      event.preventDefault();
      console.log("success");

      const userList = document.querySelector("ul#user-list");
      while (userList.lastElementChild) {
        userList.lastElementChild.remove();
      }
      fetchUsers(5);
    }
  })
}
