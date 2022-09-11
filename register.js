const user_register = 'https://api-generator.retool.com/nshqf8/data';

function userRegister(){
    let user_name = "";
    let user_email = "";
    let user_password = "";
    let confirm_password= "";

    user_name = document.getElementById("user_name").value;
    user_email = document.getElementById("user_email").value;
    user_password = document.getElementById("user_password").value;
    confirm_password = document.getElementById("confirm_password").value;

    $(document).ready(function(){
        $.post(user_register, {
            user_name, user_email, user_password, confirm_password
        },
        function(data, status){
            console.log("Data: " + data + "\nStatus: " + status);

            user_name = document.getElementById("user_name").value = "";
            user_email = document.getElementById("user_email").value = "";
            user_password = document.getElementById("user_password").value = "";
            confirm_password = document.getElementById("confirm_password").value = "";
        })
    })
}