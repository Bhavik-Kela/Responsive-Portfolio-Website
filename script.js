// Tab switching functionality for About section
let tablinks = document.getElementsByClassName("tab-links");
let tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Mobile menu functionality
let sidemenu = document.getElementById("sidemenu");

function openmenu() {
    sidemenu.classList.add("active");
}

function closemenu() {
    sidemenu.classList.remove("active");
}

// Close menu when clicking on a link
const links = sidemenu.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', () => {
        closemenu();
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link highlighter based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.links');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    // Special case for skills section which has a different ID
    if (current === 'skills-section') {
        current = 'skills';
    }
    
    navLinks.forEach(link => {
        link.classList.remove('present-link');
        const href = link.querySelector('a').getAttribute('href').substring(1);
        
        // Compare link href with current section ID
        if (href === current || 
            (href === 'hero' && current === '') || 
            (href === 'skills' && current === 'skills-section')) {
            link.classList.add('present-link');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // You would normally handle form submission to a server here
      
    });
}
// Script to handle video behavior
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.portfolio-item:has(video)');
    
    if (videoItems.length === 0) {
        // Fallback for browsers that don't support :has selector
        document.querySelectorAll('.portfolio-item').forEach(item => {
            if (item.querySelector('video')) {
                setupVideoItem(item);
            }
        });
    } else {
        videoItems.forEach(setupVideoItem);
    }
    
    function setupVideoItem(item) {
        const video = item.querySelector('video');
        
        // Pause video on hover
        item.addEventListener('mouseenter', function() {
            video.pause();
        });
        
        item.addEventListener('mouseleave', function() {
            if (video.readyState >= 2) { // Only if video is loaded
                video.play().catch(e => console.log("Autoplay prevented:", e));
            }
        });
        
        // Visibility observer to pause videos when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    video.pause();
                } else {
                    video.play().catch(e => console.log("Autoplay prevented:", e));
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(item);
        
        // If video is clicked directly, toggle play/pause
        video.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
});

// Contact Form Logic

// Alternative method using native form submission - more reliable with Google Apps Script

document.addEventListener('DOMContentLoaded', function() {
    // Create blur overlay for form feedback
    const blurOverlay = document.createElement('div');
    blurOverlay.className = 'blur-overlay';
    blurOverlay.id = 'blurOverlay';
    blurOverlay.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        background-color: rgba(0, 0, 0, 0.2);
        z-index: 99;
        animation: fadeIn 0.3s ease forwards;
    `;
    document.body.appendChild(blurOverlay);
    
    // Initialize form elements and hide messages
    document.getElementById('loader').style.display = 'none';
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
    
    // Add form submit handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Update the form to use a hidden iframe for submission
        // Replace this URL with your actual Google Apps Script Web App URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwQNHDfeybE16z57U7oLgouBypUmfqSK4uqPNFZBBgNv0CCP5wOy05cpIYZywkJiRmO/exec';
        
        // Set the form's action and method attributes
        contactForm.setAttribute('action', scriptURL);
        contactForm.setAttribute('method', 'POST');
        
        // Create a hidden iframe to handle the form submission
        const iframe = document.createElement('iframe');
        iframe.setAttribute('name', 'hidden_iframe');
        iframe.setAttribute('id', 'hidden_iframe');
        iframe.setAttribute('style', 'display:none;');
        document.body.appendChild(iframe);
        
        // Set the form's target to the hidden iframe
        contactForm.setAttribute('target', 'hidden_iframe');
        
        // Handle form submission
        contactForm.addEventListener('submit', function(e) {
            // Don't prevent default - we want the form to actually submit
            
            // Show loader
            document.getElementById('loader').style.display = 'block';
            
            // Hide any previous messages
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('errorMessage').style.display = 'none';
            
            // Add event listener to the iframe to detect when the form submission is complete
            iframe.addEventListener('load', function() {
                // Hide loader
                document.getElementById('loader').style.display = 'none';
                
                // Show blur effect
                document.getElementById('blurOverlay').style.display = 'block';
                
                // Show success message
                const successMessage = document.getElementById('successMessage');
                successMessage.style.position = 'relative';
                successMessage.style.zIndex = '100';
                successMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message and blur effect after 5 seconds
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'none';
                    document.getElementById('blurOverlay').style.display = 'none';
                }, 5000);
            });
        });
    } else {
        console.error('Contact form element not found!');
    }
});