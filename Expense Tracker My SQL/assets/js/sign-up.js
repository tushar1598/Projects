document.querySelector("form").addEventListener("submit", myFun);

async function myFun(event) {
  event.preventDefault();
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let phone = document.querySelector("#phone").value;
  let password = document.querySelector("#password").value;
  let confirm_password = document.querySelector("#confirm_password").value;

  if (password == confirm_password) {
    let obj = {
      name,
      email,
      phone,
      password,
    };
    let users = await axios.post(
      "http://localhost:9000/users/create-user",
      obj
    );
    console.log(users.data.user);
    window.location.href = "/users/sign-in";
  } else {
    alert("please enter same password!!");
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#password").value = "";
    document.querySelector("#confirm_password").value = "";
  }
}
