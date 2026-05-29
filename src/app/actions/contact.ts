"use server";

export async function submitContact(formData: FormData) {
  // Honeypot check for spam protection
  if (formData.get("bot-field")) {
    // Silently succeed for bots
    return { success: true, message: "Message sent successfully!" };
  }

  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return { success: false, error: "Please fill out all fields." };
  }

  try {
    const formspreeEndpoint = process.env.FORMSPREE_ENDPOINT || "https://formspree.io/f/mjgzlzjl";
    
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      }),
    });

    if (response.ok) {
      return { success: true, message: "Message sent successfully!" };
    } else {
      const data = await response.json();
      return { 
        success: false, 
        error: data.error || "Failed to send message. Please try again later." 
      };
    }
  } catch {
    return { 
      success: false, 
      error: "An unexpected error occurred. Please try again later." 
    };
  }
}
