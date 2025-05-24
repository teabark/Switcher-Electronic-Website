import React, { useState } from "react";
import emailjs from "emailjs-com";
import TopNavBar from "../ui/TopNavBar/TopNavBar";
import Footer from "../ui/Footer/Footer";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;    

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };

    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Oops! Something went wrong. Try again.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <>
      <TopNavBar />
      <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "32px", marginBottom: "10px" }}>Contact Us</h1>
        <p style={{ marginBottom: "30px", color: "#555" }}>
          Have questions or feedback? We'd love to hear from you.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            style={{ ...inputStyle, resize: "vertical" }}
          />
          <button
            type="submit"
            disabled={isSending}
            style={{
              padding: "12px 20px",
              fontSize: "16px",
              backgroundColor: isSending ? "#ccc" : "#ff4c00",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: isSending ? "not-allowed" : "pointer",
            }}
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div style={{ marginTop: "40px", color: "#666" }}>
          <p>
            <strong>Email:</strong> support@yourshop.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (234) 567-890
          </p>
          <p>
            <strong>Address:</strong> 123 Tech Street, Silicon Valley, CA
          </p>
        </div>

        {/* Google Map Embed */}
        <div
          style={{
            marginTop: "40px",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3988.815087703813!2d36.82331582358524!3d-1.2849049356217195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1snational%20archives!5e0!3m2!1sen!2ske!4v1747899469264!5m2!1sen!2ske"
            width="600"
            title="Shop Location"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

const inputStyle = {
  padding: "12px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

export default ContactPage;
