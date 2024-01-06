document.querySelector("form").addEventListener("submit", myUser);
async function myUser(event) {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let phone = document.querySelector("#phone").value;
  let password = document.querySelector("#password").value;
  let confirm_password = document.querySelector("#confirm_password").value;
  let obj = {
    name,
    email,
    phone,
    password,
  };

  if (password != confirm_password) {
    alert("password is not matched!!!");
    location.reload();
  } else {
    let res = await axios.post("http://localhost:9000/users/create-user", obj);
    if (res.data.created) {
      alert("user created successfully!!");
      location.reload();
    } else {
      alert("user already found!!");
      location.reload();
    }
  }
}