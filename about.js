document.getElementById("logoa").addEventListener("click", function(){
    window.location.href = "index.html";
})

document.getElementById("logo1").addEventListener("click", function(){
    window.location.href = "index.html";
})


let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');

            });
        };
    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);
};

function OpenModal(modal){
    let overlay = document.getElementById('overlay');
    let more = document.getElementById('more');
    let h2more = document.getElementById('h2more');
    let pmore = document.getElementById('pmore');

    if (modal == 1) {
        h2more.textContent = "About The Site";
        pmore.textContent = `Think you know Asia like the back of your hand? Put your geographical knowledge to the test in this exciting guessing game. Whether you're a seasoned traveler, a geography enthusiast, or someone who enjoys a challenge, this game offers a fun way to explore Asia’s wonders.
    
    The game gives you a location in Asia, and your challenge is to pinpoint it accurately on the map. The closer your guess, the more points you earn. Precision is key, and each round is an opportunity to improve your skills and expand your knowledge.
    
    Explore famous landmarks, breathtaking wonders, and hidden gems across the continent. Each round encourages you to think critically about cities, regions, and notable sites.
    
    For those who thrive on competition, challenge friends or players worldwide and climb the global leaderboard. Track your progress and see if you can become the top player.
    
    Whether you're playing for fun, sharpening your skills, or aiming for the highest score, this game provides an enjoyable and educational experience. It’s a perfect way to explore Asia from home while improving your geographical expertise. Are you ready? Start playing now!`;
    
    }else if (modal == 2) {
        h2more.textContent = "Our Discord";
        pmore.textContent = `Step into the world of high-stakes excitement by joining our Discord Server. This is the ultimate spot for those who enjoy the thrill of casino games without the risks of real-world gambling. Whether you're a poker strategist, a fan of roulette, or a slots enthusiast, this server offers something for everyone.
    
    We offer a wide range of casino games, including Blackjack, Poker, Roulette, Slots, Craps, Baccarat, and more. Each game provides an authentic, interactive experience where you can test your skills and enjoy exciting gameplay.
    
    Compete on the leaderboards, improve your ranking, and earn bragging rights. Win virtual currency, unlock exclusive perks, and even compete for real-life rewards. With daily events and special tournaments, there’s always a new challenge.
    
    Our server features a virtual economy where strategic decisions matter just as much as luck. Maximize your winnings and rise through the ranks.
    
    Join a vibrant, friendly community of like-minded players who share your enthusiasm for casino games. Whether you’re playing casually or aiming for the top, there’s always something happening here.
    
    We’re constantly evolving, adding new games, events, and rewards to keep the fun fresh. Ready to dive in? Join us today and experience the ultimate virtual casino adventure!`;
    
    } else if (modal == 3){
        h2more.textContent = "Web Development";
        pmore.innerHTML = "CSS<br>Expert in responsive design, using frameworks like Bootstrap and Tailwind CSS. Skilled in CSS Grid and Flexbox for efficient layouts, creating animations and transitions, with a strong focus on cross-browser compatibility and mobile-first principles.<br><br>" +
                          "HTML<br>Proficient in semantic HTML for accessible, SEO-friendly web pages. Experienced in integrating HTML with CSS and JavaScript for dynamic user interactions. Comfortable working with forms, tables, multimedia elements, and HTML5 APIs.<br><br>" +
                          "JavaScript<br>Advanced knowledge of vanilla JavaScript and modern frameworks such as React.js and jQuery. Experienced with asynchronous programming (Promises, Async/Await) and building interactive web applications with a strong grasp of event-driven programming and the DOM.";
    }
    else if (modal == 4){
        h2more.textContent = "Backend & Automation";
        pmore.innerHTML = "Python<br>Proficient in Python for web development, automation, and Discord bot creation. Experienced with frameworks like Django and Flask for building scalable web applications. Skilled in RESTful APIs, database integration, and backend logic development.<br><br>" +
                          "JavaScript Backend<br>Proficient in using Node.js for backend development, building scalable web applications and RESTful APIs. Experienced with frameworks like Express.js for efficient server-side logic and routing. Familiar with Async/Await to handle real-time communication and data processing.<br><br>" +
                          "Database Knowledge<br>Skilled in working with both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB) databases. Experienced in database design, queries, and optimization for performance. Knowledgeable in data modeling, relationships, and integration with web applications.";
    }
    else if (modal == 5){
        h2more.textContent = "Discord Bots";
        pmore.innerHTML = "Discord Server Management<br>Experienced in setting up and managing Discord servers, including configuring roles, permissions, channels, and moderation tools. Skilled in creating engaging communities, organizing events, and maintaining a positive, active environment. Proficient in using bots for automation, server moderation, and improving the user experience.<br><br>" +
                          "Discord Bot Development (Python)<br>Expert in developing Discord bots using Python and libraries like discord.py. Capable of creating custom commands, automating tasks, managing user interactions, and integrating third-party APIs. Skilled in building interactive bots for moderation, entertainment, and community engagement, with experience in deploying bots to cloud services.";
    }
    
    else if (modal == 7) {
        h2more.textContent = "Why to choose us?";
        pmore.innerHTML = "We offer custom solutions designed to meet your unique needs and goals.\n" +
            "With our expert development in Discord bots, geo-based platforms, and web applications, we ensure high-quality results.\n" +
            "Our all-in-one services cover everything, from community setup to automation, making your digital experience seamless.\n" +
            "We provide ongoing support and maintenance to keep your platform up-to-date and secure.<br><br>\n" +
            "Let’s create the future of digital interaction together—get in touch with us today!";
    }
    

    overlay.style.display = 'block';
    more.style.display = 'block';

}

function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('more').style.display = 'none';
}


console.log(ScrollReveal);

ScrollReveal({
    distance: '80px',     
    duration: 2000,      
    delay: 200,         
    reset: true,    
  });
  
  ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
  ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box', { origin: 'bottom' });
  ScrollReveal().reveal('.home-content h1, .aboutsite-img, .about-content', { origin: 'left' });
  ScrollReveal().reveal('.about-img, .home-content p, .aboutsite-content', { origin: 'right' });

let typed = new Typed('.multiple-text', {
    strings: ['Frontend Developers', 'Backend Developers', 'Youtubers', 'Bot Developers', 'FullStack Developers'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});
