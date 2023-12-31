document.querySelector("form").addEventListener("submit", myFun);

async function myFun(event) {
  event.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let obj = {
    email,
    password,
  };

  let user = await axios.post(
    "http://localhost:9000/users/create-session",
    obj
  );

  if (user) {
    window.location.href = "/users/profile";
  } else {
    alert("username and password does't match!!");
  }
}
