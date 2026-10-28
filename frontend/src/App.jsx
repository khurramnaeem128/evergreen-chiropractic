
import { useState } from "react";
import {
  BrowserRouter,
  useNavigate,
  useLocation,
} from "react-router-dom";
import "./App.css";

const API_URL = "";

const pages = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Chiropractic Care", path: "/chiropractic-care" },
  { title: "Pain Relief", path: "/pain-relief" },
  { title: "Wellness Services", path: "/wellness-services" },
  { title: "Our Team", path: "/team" },
  { title: "Testimonials", path: "/testimonials" },
  { title: "FAQs", path: "/faqs" },
  { title: "Book Appointment", path: "/book-appointment" },
  { title: "Contact Us", path: "/contact" },
];

const services = [
  {
    title: "Chiropractic Care",
    text: "Learn about spinal health, posture, mobility, and personalized care options.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Movement & Mobility",
    text: "Explore movement strategies and mobility support for everyday activities.",
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Wellness Services",
    text: "Discover general wellness education and healthy lifestyle guidance.",
    image:
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=85",
  },
];

const pageContent = {
  "About Us": {
    eyebrow: "OUR APPROACH",
    heading: "Care that starts with understanding you.",
    intro:
      "Evergreen is a wellness website concept focused on helping visitors explore care options and make informed decisions about their well-being.",
    cards: [
      {
        title: "Personalized Attention",
        text: "Every person's needs and goals are different. Start with a conversation about what matters to you.",
      },
      {
        title: "Clear Information",
        text: "Understand available services and ask questions before deciding on a care plan.",
      },
      {
        title: "Wellness Education",
        text: "Explore everyday topics such as movement, posture, and healthy routines.",
      },
    ],
  },
  "Chiropractic Care": {
    eyebrow: "OUR SERVICES",
    heading: "Learn about chiropractic care.",
    intro:
      "Chiropractic care may involve assessment and treatment approaches for certain musculoskeletal concerns. A qualified professional can help determine what is appropriate for you.",
    cards: [
      {
        title: "Initial Consultation",
        text: "Discuss your concerns, relevant history, and goals with a qualified healthcare professional.",
      },
      {
        title: "Movement Assessment",
        text: "A professional may assess posture, mobility, and movement when clinically appropriate.",
      },
      {
        title: "Individual Care Plan",
        text: "Options should be explained clearly, including potential benefits, risks, and alternatives.",
      },
    ],
  },
  "Pain Relief": {
    eyebrow: "UNDERSTANDING YOUR OPTIONS",
    heading: "Take an informed approach to pain.",
    intro:
      "Pain can have many causes. The right approach depends on your symptoms, medical history, and a suitable professional assessment.",
    cards: [
      {
        title: "Back and Neck Discomfort",
        text: "Learn about common causes and when professional assessment may be helpful.",
      },
      {
        title: "Daily Movement",
        text: "Ask a qualified professional about appropriate movement and activity for your situation.",
      },
      {
        title: "Your Next Steps",
        text: "Seek prompt medical attention for severe or sudden pain, weakness, numbness, or other concerning symptoms.",
      },
    ],
  },
  "Wellness Services": {
    eyebrow: "EVERYDAY WELLNESS",
    heading: "Small steps toward healthier routines.",
    intro:
      "Explore general wellness topics that can help you make informed choices about everyday movement and self-care.",
    cards: [
      {
        title: "Movement and Mobility",
        text: "Explore suitable ways to keep moving and maintain everyday mobility.",
      },
      {
        title: "Posture Awareness",
        text: "Learn how to notice your posture and adjust your workspace for comfort.",
      },
      {
        title: "Healthy Routines",
        text: "Build sustainable routines around activity, rest, and general well-being.",
      },
    ],
  },
  "Our Team": {
    eyebrow: "MEET THE TEAM",
    heading: "People who put care first.",
    intro:
      "Good care starts with listening, clear communication, and respect for each person's needs.",
    cards: [
      {
        title: "Chiropractic Professional",
        text: "Sample profile. Add the real practitioner's verified name, qualifications, and experience before publishing.",
      },
      {
        title: "Wellness Specialist",
        text: "Sample profile. Add verified credentials and an accurate description of the person's role.",
      },
      {
        title: "Patient Care Coordinator",
        text: "Sample profile. Add the actual team member's name and responsibilities.",
      },
    ],
  },
  Testimonials: {
    eyebrow: "VISITOR FEEDBACK",
    heading: "Your experience matters.",
    intro:
      "We value clear communication and respectful service. This demo page is ready for genuine, permission-approved feedback.",
    cards: [
      {
        title: "Share Your Experience",
        text: "Add a real review here only after receiving permission from the person who wrote it.",
      },
      {
        title: "Tell Us What Helped",
        text: "Feedback can describe communication, the booking process, or the overall visitor experience.",
      },
      {
        title: "Help Us Improve",
        text: "Constructive feedback helps a service understand what visitors value and what could improve.",
      },
    ],
  },
  FAQs: {
    eyebrow: "FREQUENTLY ASKED QUESTIONS",
    heading: "Answers to help you get started.",
    intro:
      "Here are some general answers. Confirm actual clinic policies and service details before using this website for a real practice.",
    cards: [
      {
        title: "How do I request an appointment?",
        text: "Use the Book Appointment page to submit your preferred details. The form will connect to the backend once the API endpoint is ready.",
      },
      {
        title: "What should I bring?",
        text: "Ask the clinic about its requirements. Relevant medical history and a list of medicines may be useful.",
      },
      {
        title: "Is chiropractic care suitable for everyone?",
        text: "Not always. Suitability depends on your health and symptoms. Discuss risks and alternatives with a qualified healthcare professional.",
      },
      {
        title: "How do I contact the clinic?",
        text: "Use the Contact Us page. Real contact information still needs to be added.",
      },
    ],
  },
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const routerNavigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const activePage =
    pages.find((page) => page.path === location.pathname)?.title || "Home";

  function navigate(pageTitle) {
    const selectedPage = pages.find((page) => page.title === pageTitle);
    if (!selectedPage) return;

    routerNavigate(selectedPage.path);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function AppointmentForm() {
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);
      const appointment = Object.fromEntries(formData.entries());

      setSubmitting(true);
      setMessage("");

      try {
        const response = await fetch(`${API_URL}/api/appointments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointment),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Could not submit appointment request."
          );
        }

        setMessage("Appointment request submitted successfully!");
        form.reset();
      } catch (error) {
        setMessage(
          error.message || "Could not connect to the backend server."
        );
      } finally {
        setSubmitting(false);
      }
    }

    return (
      <form className="appointment-form" onSubmit={handleSubmit}>
        <label>
          Full name
          <input name="name" required placeholder="Your full name" />
        </label>

        <label>
          Email address
          <input
            name="email"
            required
            type="email"
            placeholder="you@example.com"
          />
        </label>

        <label>
          Phone number
          <input name="phone" type="tel" placeholder="Your phone number" />
        </label>

        <label>
          Service of interest
          <select name="service" defaultValue="" required>
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service) => (
              <option key={service.title} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </label>

        <label>
          Preferred date
          <input name="date" type="date" />
        </label>

        <label>
          Message
          <textarea name="message" rows="4" placeholder="How can we help?" />
        </label>

        <button className="button" type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send Request →"}
        </button>

        {message && <p role="status">{message}</p>}
      </form>
    );
  }

  function ContactForm() {
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {
      event.preventDefault();

      const form = event.currentTarget;
      const formData = new FormData(form);
      const contact = Object.fromEntries(formData.entries());

      setSubmitting(true);
      setMessage("");

      try {
        const response = await fetch(`${API_URL}/api/contact`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contact),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Could not send your message.");
        }

        setMessage("Your message was submitted successfully!");
        form.reset();
      } catch (error) {
        setMessage(
          error.message || "Could not connect to the backend server."
        );
      } finally {
        setSubmitting(false);
      }
    }

    return (
      <form className="appointment-form" onSubmit={handleSubmit}>
        <label>
          Your name
          <input name="name" required placeholder="Your full name" />
        </label>

        <label>
          Email address
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </label>

        <label>
          Your message
          <textarea
            name="message"
            rows="5"
            required
            placeholder="Write your message"
          />
        </label>

        <button className="button" type="submit" disabled={submitting}>
          {submitting ? "Sending..." : "Send Message →"}
        </button>

        {message && <p role="status">{message}</p>}
      </form>
    );
  }

  function HomePage() {
    return (
      <>
        <section className="hero">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">YOUR WELLNESS JOURNEY STARTS HERE</p>
            <h1>
              Feel better.
              <br />
              Move better.
              <br />
              <span>Live better.</span>
            </h1>
            <p className="hero-description">
              Personalized chiropractic and wellness information focused on
              your needs, goals, and well-being.
            </p>
            <div className="hero-actions">
              <button
                className="button button-light"
                onClick={() => navigate("Book Appointment")}
              >
                Book an Appointment ↗
              </button>
              <button
                className="hero-text-link"
                onClick={() => navigate("Chiropractic Care")}
              >
                Explore our services →
              </button>
            </div>
          </div>
          <div className="hero-badge">
            <span>✳</span>
            <p>
              Personal care.
              <br />
              <strong>Thoughtful wellness.</strong>
            </p>
          </div>
        </section>

        <section className="welcome section">
          <div className="welcome-image">
            <img
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1100&q=85"
              alt="Healthcare professional talking with a patient"
            />
            <div className="image-caption">CARE THAT STARTS WITH LISTENING</div>
          </div>
          <div className="welcome-content">
            <p className="eyebrow">WELCOME TO EVERGREEN</p>
            <h2>
              Your well-being deserves
              <br />
              <span>a personal approach.</span>
            </h2>
            <p>
              Everyone has different needs. Understanding your goals is a
              useful first step toward exploring care options.
            </p>
            <button className="button" onClick={() => navigate("About Us")}>
              Get to Know Us →
            </button>
          </div>
        </section>

        <section className="services section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">EXPLORE OUR SERVICES</p>
              <h2>
                Care designed around <span>you.</span>
              </h2>
            </div>
            <p>Explore services and options related to your wellness goals.</p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article className="service-card" key={service.title}>
                <img src={service.image} alt={service.title} />
                <div className="service-content">
                  <span className="service-number">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <button
                    onClick={() =>
                      navigate(
                        service.title === "Wellness Services"
                          ? "Wellness Services"
                          : "Chiropractic Care"
                      )
                    }
                  >
                    Discover More ↗
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="callout">
          <div>
            <p className="eyebrow">YOUR HEALTH. YOUR GOALS.</p>
            <h2>
              A thoughtful approach
              <br />
              <span>to everyday well-being.</span>
            </h2>
          </div>
          <button
            className="button button-light"
            onClick={() => navigate("Book Appointment")}
          >
            Let's Get Started →
          </button>
        </section>

        <section className="section team-preview">
          <div className="section-heading">
            <div>
              <p className="eyebrow">MEET THE TEAM</p>
              <h2>
                People who put <span>care first.</span>
              </h2>
            </div>
            <button
              className="text-button"
              onClick={() => navigate("Our Team")}
            >
              Meet Our Team →
            </button>
          </div>
          <div className="team-grid">
            <img
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=85"
              alt="Sample healthcare professional"
            />
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=85"
              alt="Sample healthcare professional"
            />
            <img
              src="https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=85"
              alt="Sample healthcare professional"
            />
          </div>
          <p className="photo-note">
            Sample photos only. Actual staff details must be verified.
          </p>
        </section>

        <section className="contact-banner">
          <p className="eyebrow">TAKE THE NEXT STEP</p>
          <h2>Let's talk about your wellness goals.</h2>
          <button
            className="button button-light"
            onClick={() => navigate("Contact Us")}
          >
            Contact Us →
          </button>
        </section>
      </>
    );
  }

  function ContentCards({ content }) {
    return (
      <div className="service-grid">
        {content.cards.map((card, index) => (
          <article className="service-card content-card" key={card.title}>
            <div className="service-content">
              <span className="service-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </div>
          </article>
        ))}
      </div>
    );
  }

  function InnerPage() {
    const content = pageContent[activePage];

    return (
      <main className="inner-page">
        <section className="inner-hero">
          <p className="eyebrow">EVERGREEN CHIROPRACTIC &amp; WELLNESS</p>
          <h1>{activePage}</h1>
          <p>
            {content?.intro ||
              (activePage === "Contact Us"
                ? "Send a message using the form below. The contact API must be configured on the backend."
                : "Submit your preferred appointment details using the form below. The appointment API must be configured on the backend.")}
          </p>
        </section>

        {content && (
          <section className="section">
            <div className="section-heading">
              <div>
                <p className="eyebrow">{content.eyebrow}</p>
                <h2>{content.heading}</h2>
              </div>
            </div>
            <ContentCards content={content} />
            {activePage === "FAQs" && (
              <p className="photo-note">
                These are general educational answers, not a substitute for
                professional medical advice.
              </p>
            )}
            {activePage === "Our Team" && (
              <p className="photo-note">
                Team profiles are placeholders, not claims about real staff.
              </p>
            )}
            {activePage === "Testimonials" && (
              <p className="photo-note">
                No fabricated patient reviews are displayed on this page.
              </p>
            )}
          </section>
        )}

        {activePage === "Book Appointment" && (
          <section className="section appointment-section">
            <div>
              <p className="eyebrow">APPOINTMENT REQUEST</p>
              <h2>Let's arrange a visit.</h2>
              <p>
                Submit your preferred details. The backend endpoint must be
                configured before requests can be accepted.
              </p>
            </div>
            <AppointmentForm />
          </section>
        )}

        {activePage === "Contact Us" && (
          <section className="section appointment-section">
            <div>
              <p className="eyebrow">GET IN TOUCH</p>
              <h2>We'd like to hear from you.</h2>
              <p>
                Phone, email, address, and opening hours can be added after
                actual business details are confirmed.
              </p>
              <p>
                <strong>Phone:</strong> Add verified number
              </p>
              <p>
                <strong>Email:</strong> Add verified email
              </p>
              <p>
                <strong>Address:</strong> Add verified address
              </p>
            </div>
            <ContactForm />
          </section>
        )}

        <section className="section">
          <div className="callout">
            <div>
              <p className="eyebrow">HAVE QUESTIONS?</p>
              <h2>Take the next step at your pace.</h2>
            </div>
            <button
              className="button button-light"
              onClick={() => navigate("Book Appointment")}
            >
              Request an Appointment →
            </button>
          </div>
        </section>

        <section className="section">
          <button className="button" onClick={() => navigate("Home")}>
            ← Back to Home
          </button>
        </section>
      </main>
    );
  }

  return (
    <div className="website">
      <header className="header">
        <button className="brand" onClick={() => navigate("Home")}>
          <span className="brand-icon">✳</span>
          <span>
            <strong>EVERGREEN</strong>
            <small>CHIROPRACTIC &amp; WELLNESS</small>
          </span>
        </button>

        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          {pages.map((page) => (
            <button
              key={page.path}
              className={`nav-link ${
                activePage === page.title ? "nav-active" : ""
              }`}
              onClick={() => navigate(page.title)}
            >
              {page.title}
            </button>
          ))}
        </nav>

        <button
          className="button header-button"
          onClick={() => navigate("Book Appointment")}
        >
          Book a Visit ↗
        </button>
      </header>

      {activePage === "Home" ? <HomePage /> : <InnerPage />}

      <footer className="footer">
        <button className="brand footer-brand" onClick={() => navigate("Home")}>
          <span className="brand-icon">✳</span>
          <span>
            <strong>EVERGREEN</strong>
            <small>CHIROPRACTIC &amp; WELLNESS</small>
          </span>
        </button>
        <p>Thoughtful care. A healthier journey.</p>
        <div className="footer-links">
          {pages.map((page) => (
            <button key={page.path} onClick={() => navigate(page.title)}>
              {page.title}
            </button>
          ))}
        </div>
        <small className="footer-note">
          Demo website. Sample content and photos; not a real clinic.
        </small>
      </footer>
    </div>
  );
}

export default App;
