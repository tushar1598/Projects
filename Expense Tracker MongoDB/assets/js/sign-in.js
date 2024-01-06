document.querySelector("form").addEventListener("submit", myLogin);
async function myLogin(event) {
  event.preventDefault();
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let obj = {
    email, password
  }
  let res = await axios.post("http://localhost:9000/users/create-session", obj);
  if (res.data.login) {
    alert("you are logged in successfully!!");
    window.location.href = "/users/profile";
  } else {
    alert("username or password invalid");
    location.reload();
  }
}