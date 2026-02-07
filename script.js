
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

   
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const msgEl = document.getElementById("msg");

   
    if (!name || !email || !message) {
        msgEl.innerText = "All fields are required!";
        msgEl.style.color = "#ff5555";
        return;
    }

    try {
       
        const response = await fetch("https://project-repo-61np.onrender.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message })
        });

        
        const data = await response.json();

        if (response.ok && data.success) {
            msgEl.innerText = data.message || "Message sent successfully!";
            msgEl.style.color = "#fff";
            document.getElementById("contactForm").reset();
        } else {
            msgEl.innerText = data.error || "Something went wrong!";
            msgEl.style.color = "#ff5555";
        }

    } catch (err) {
        
        console.error("Fetch error:", err);
        msgEl.innerText = "Server error! Please try again later.";
        msgEl.style.color = "#ff5555";
    }
});
