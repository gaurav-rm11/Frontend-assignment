const form=document.getElementById("contactForm");

const firstName=document.getElementById("firstname");
const lastName=document.getElementById("lastname");
const email=document.getElementById("email");
const message=document.getElementById("message");
const consent=document.getElementById("consent");

const toast=document.getElementById("toast");

document.querySelectorAll('input[name="queryType"]').forEach(radio=>{

    radio.addEventListener("change",()=>{

        document.querySelectorAll(".option").forEach(option=>{
            option.classList.remove("active");
            option.classList.remove("error-field");
        });

        document.querySelector(".query-error").textContent="";

        radio.closest(".option").classList.add("active");

    });

});

[firstName,lastName,email,message].forEach(field=>{

    field.addEventListener("input",()=>{

        field.nextElementSibling.textContent="";
        field.classList.remove("error-field");

    });

});

form.addEventListener("submit",function(e){

    e.preventDefault();

    let isValid=true;

    document.querySelectorAll(".error").forEach(error=>{
        error.textContent="";
    });

    document.querySelectorAll(".error-field").forEach(field=>{
        field.classList.remove("error-field");
    });

    if(firstName.value.trim()===""){

        firstName.nextElementSibling.textContent=
        "This field is required";

        firstName.classList.add("error-field");

        isValid=false;
    }

    if(lastName.value.trim()===""){

        lastName.nextElementSibling.textContent=
        "This field is required";

        lastName.classList.add("error-field");

        isValid=false;
    }

    if(email.value.trim()===""){

        email.nextElementSibling.textContent=
        "This field is required";

        email.classList.add("error-field");

        isValid=false;
    }
    else if(!email.checkValidity()){

        email.nextElementSibling.textContent=
        "Please enter a valid email address";

        email.classList.add("error-field");

        isValid=false;
    }

    const queryType=document.querySelector('input[name="queryType"]:checked');

    if(!queryType){

        document.querySelector(".query-error").textContent=
        "Please select a query type";

        document.querySelectorAll(".option").forEach(option=>{
            option.classList.add("error-field");
        });

        isValid=false;
    }

    if(message.value.trim()===""){

        message.nextElementSibling.textContent=
        "This field is required";

        message.classList.add("error-field");

        isValid=false;
    }

    if(!consent.checked){

        document.querySelector(".consent-error").textContent=
        "To submit this form, please consent to being contacted";

        isValid=false;
    }

    if(!isValid){
        return;
    }

    const formData={
        firstName:firstName.value,
        lastName:lastName.value,
        email:email.value,
        queryType:queryType.value,
        message:message.value
    };

    localStorage.setItem(
        "contactForm",
        JSON.stringify(formData)
    );

    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },3000);

    form.reset();

    document.querySelectorAll(".option").forEach(option=>{
        option.classList.remove("active");
    });

});