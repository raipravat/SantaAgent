document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');

// Check for saved theme preference or use preferred color scheme
const currentTheme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Apply the current theme
if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.checked = true;
} else {
    document.body.removeAttribute('data-theme');
    themeToggle.checked = false;
}

// Theme toggle event listener
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    }
});
  
  // Animate hero text
  const movingText = document.getElementById('moving-text');
  if (movingText) {
    const text = movingText.textContent;
    movingText.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      setTimeout(() => {
        movingText.textContent += text[i];
      }, i * 50);
    }
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70,
                  behavior: 'smooth'
              });
          }
      });
  });
  
  // Highlight active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  function highlightNavLink() {
      let index = sections.length;
      
      while (--index && window.scrollY + 100 < sections[index].offsetTop) {}
      
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
  }
  
  // Run on scroll
  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Run once on page load
  
  // Add scroll animation to sections
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.section-title, .about .content, .service-card, .policy-card, .testimonial-card, .accordion-item, .info, .php-email-form');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementPosition < windowHeight - 100) {
              element.classList.add('animate__animated', 'animate__fadeInUp');
          }
      });
  };
  
  // Run once on page load
  animateOnScroll();
  
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Form submission handling
  const contactForm = document.querySelector('.php-email-form');
  if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
          e.preventDefault();
          alert('Thank you for your request! Our agent will contact you shortly to discuss your life insurance options.');
          this.reset();
      });
  }
});