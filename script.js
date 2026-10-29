
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Open and close the mobile navigation
menuToggle.addEventListener("click", () => {
  const isExpanded =
    menuToggle.getAttribute("aria-expanded") === "true";

  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute(
    "aria-label",
    isExpanded ? "Open navigation menu" : "Close navigation menu"
  );

  navLinks.classList.toggle("open", !isExpanded);
});

// Close the menu when a navigation link is selected
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// Close the menu when the user clicks outside it
document.addEventListener("click", (event) => {
  const clickedInsideMenu = navLinks.contains(event.target);
  const clickedToggle = menuToggle.contains(event.target);

  if (!clickedInsideMenu && !clickedToggle) {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
});

// Automatically update the footer year
document.getElementById("year").textContent =
  new Date().getFullYear();

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = navLinks.querySelectorAll('a[href^="#"]');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navigationLinks.forEach((link) => {
          const isCurrent =
            link.getAttribute("href") === `#${entry.target.id}`;

          if (isCurrent) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  },
  {
    rootMargin: "-25% 0px -60% 0px"
  }
);

sections.forEach((section) => sectionObserver.observe(section));
