function initContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!status) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const inbox = window.PORTFOLIO_CONFIG?.contact?.email;
    if (!inbox) {
      status.textContent = "Contact email is not configured.";
      status.classList.remove("is-success");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;
    status.classList.remove("is-success");
    status.textContent = "Sending…";

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            phone: data.phone || "Not provided",
            subject: data.subject,
            message: data.message,
            _subject: data.subject || `Portfolio message from ${data.name}`,
            _template: "table",
            _captcha: "false",
          }),
        }
      );

      const result = await response.json().catch(() => ({}));
      const ok =
        response.ok &&
        (result.success === true || result.success === "true");

      if (!ok) {
        throw new Error(result.message || "Failed to send");
      }

      status.textContent = "Thanks! Your message was sent. I'll get back to you soon.";
      status.classList.add("is-success");
      form.reset();
    } catch {
      status.textContent =
        "Sorry, the message could not be sent. Please email me directly.";
      status.classList.remove("is-success");
    } finally {
      if (submitBtn) submitBtn.disabled = false;
      setTimeout(() => {
        status.textContent = "";
        status.classList.remove("is-success");
      }, 6000);
    }
  });
}
