document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    fetch("https://project-repo-61np.onrender.com/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name, email, message })
    })
    .then(res => res.json()) 
    .then(data => {
        if (data.success) {
            document.getElementById("msg").innerText = data.message;
            document.getElementById("msg").style.color = "#fff"; 
            document.getElementById("contactForm").reset();
        } else {
            document.getElementById("msg").innerText = data.error || "Server error!";
            document.getElementById("msg").style.color = "#ff5555";
        }
    })
    .catch(err => {
        document.getElementById("msg").innerText = "Server error!";
        document.getElementById("msg").style.color = "#ff5555";
    });
});
