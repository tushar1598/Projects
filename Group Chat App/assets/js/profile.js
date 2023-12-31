const socket = io()

document.querySelector("#msg-form").addEventListener("submit", myMessage);

function myMessage(event) {
    event.preventDefault();
    const textAreaValue = document.querySelector("#textarea").value;
    const userid = document.querySelector("#hide-user-id").innerText.trim();
    const username = document.querySelector("#hide-user-name").innerText.trim();
    const groupid = document.querySelector("#hide-group-id").innerText.trim();
    let obj = {
        message: textAreaValue,
        userId: userid,
        username: username,
        groupId: groupid
    }
    socket.emit("message", obj);
    setInterval(() => {
        location.reload();
    }, 500)
}

socket.on("message", () => {
    setInterval(() => {
        location.reload();
    }, 500)
})



document.querySelector("#group-form").addEventListener("submit", myGroup);
function myGroup(event) {
    event.preventDefault();
    console.log("hello")
    let groupName = document.querySelector("#name").value;
    let obj = {
        groupName
    }
    axios.post("http://localhost:9000/users/create-group", obj)
        .then((res) => {
            if (res.data.message == "group created!!") {
                alert("Group Created Successfully!!")
                location.reload();
            }
        })
}



let members = document.querySelectorAll(".members");
for (let i = 0; i < members.length; i++) {
    members[i].addEventListener("click", function () {
        let x = members[i].children[0].innerHTML;
        let obj = {
            member: x
        }
        axios.post("http://localhost:9000/users/add-members", obj)
            .then((res) => {
                if (res.data.message == "members added successfully!!") {
                    alert(res.data.member.member + " added successfully in " + res.data.member.groupname + "!!");
                    location.reload();
                }

                if (res.data.message == "member already added") {
                    alert("This user is already added!!")
                }
            })
    });
}



let admin = document.querySelectorAll(".make-user-admin");
for (let i = 0; i < admin.length; i++) {
    admin[i].addEventListener("click", function () {
        let value = admin[i].children[0].innerHTML;
        let obj = {
            value
        }
        axios.post("http://localhost:9000/users/make-other-admin", obj)
            .then((res) => {
                if (res.data.message == "This user is admin now!!") {
                    alert("This user is admin now!!")
                    location.reload();
                }
                if (res.data.message == "This user is already a admin") {
                    alert("This user is already a admin")
                }
            })
    })
}


let x = document.querySelectorAll(".leave-group");
for (let i = 0; i < x.length; i++) {
    x[i].addEventListener("click", function () {
        let group = x[i].children[0].innerHTML;
        let obj = {
            group
        }
        axios.post("http://localhost:9000/users/leave-group", obj)
            .then((res) => {
                if (res.data.message == "user left") {
                    alert("user leave successfully!!")
                    window.location.href = "/users/profile"
                }
            })
    })
}