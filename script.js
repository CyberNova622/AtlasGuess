
document.getElementById("logo").addEventListener("click", function(){
    window.location.href = "index.html";
})

document.getElementById("logo1").addEventListener("click", function(){
    window.location.href = "index.html";
})

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: "smooth"
        });
    }
}

function startGame() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('gameModal');
    
    overlay.style.display = 'block';
    modal.style.display = 'block';
    
    modal.offsetHeight;
    
    overlay.classList.add('active');
    modal.classList.add('active');
}

function closeModal() {
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('gameModal');
    
    overlay.classList.remove('active');
    modal.classList.remove('active');
    
    setTimeout(() => {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }, 300);

    window.location.href = "game.html";

}

const map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView([20, 0], 2);
  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
  ).addTo(map);

  const cursor = document.getElementById("cursor");
  let markerPlaced = false;

  document.body.style.cursor = "none";

  document.addEventListener("mousemove", (e) => {
    if (!markerPlaced) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  });

  let marker;
  map.on("click", (e) => {
    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(e.latlng, {
        icon: L.icon({
          iconUrl: "images/location.png",
          iconSize: [40, 50],
          iconAnchor: [20, 50],
        }),
      }).addTo(map);

      markerPlaced = true;
      document.body.style.cursor = "default";
      cursor.style.display = "none";
    }
  });

  map.on("click", () => {
    if (markerPlaced) {
      document.body.style.cursor = "default";
      cursor.style.display = "none";
    }
  });

  const mapDiv = document.getElementById("map");

  mapDiv.classList.add("hide-cursor");

  let cursorUnlocked = false;

  mapDiv.addEventListener("click", () => {
    if (!cursorUnlocked) {
      cursorUnlocked = true;
      mapDiv.classList.remove("hide-cursor");
    }
  });



  class Auth {
    static async handleSignup(event) {
        event.preventDefault();
        
        const form = event.target;
        const isDiscordSignup = window.location.pathname.includes('disup.html');
        
        const data = {
            username: form.querySelector('input[placeholder="Username"]').value,
            password: form.querySelector('input[type="password"]').value,
        };

        try {
            if (isDiscordSignup) {
                await this.handleDiscordSignup(data, form);
            } else {
                await this.handleEmailSignup(data, form);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup. Please try again.');
        }
    }

    static async handleDiscordSignup(data, form) {
        data.discord_username = form.querySelector('input[placeholder="Discord Username"]').value;
        const response = await this.sendRequest('/signup/discord', data);
        
        if (response.ok) {
            UI.showVerificationModal();
        } else {
            UI.showError(response.error);
        }
    }

    static async handleEmailSignup(data, form) {
        data.email = form.querySelector('input[type="email"]').value;
        const response = await this.sendRequest('/signup/email', data);
        
        if (response.ok) {
            UI.showSuccess('Please check your email for verification link');
        } else {
            UI.showError(response.error);
        }
    }

    static async verifyDiscordCode() {
        const code = document.getElementById('verificationCode').value;
        const discord_username = document.querySelector('input[placeholder="Discord Username"]').value;
        
        const response = await this.sendRequest('/verify/discord', {
            code: code,
            discord_username: discord_username
        });

        if (response.ok) {
            UI.showSuccess('Verification successful!');
            window.location.href = '/login.html';
        } else {
            UI.showError('Invalid verification code');
        }
    }

    static async sendRequest(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        return {
            ok: response.ok,
            ...(await response.json())
        };
    }
}

class UI {
    static showVerificationModal() {
        const modal = document.createElement('div');
        modal.className = 'verification-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Discord Verification</h2>
                <p>Please check your Discord for the verification code</p>
                <input type="text" placeholder="Enter verification code" id="verificationCode">
                <button onclick="Auth.verifyDiscordCode()">Verify</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    static showError(message) {
        alert(message);
    }

    static showSuccess(message) {
        alert(message);
    }
}

class PasswordToggle {
    static init() {
        const passIcon = document.getElementById('pass');
        if (passIcon) {
            passIcon.addEventListener('click', this.toggleVisibility);
        }
    }

    static toggleVisibility() {
        const password = document.getElementById('passa');
        password.type = password.type === "password" ? "text" : "password";
    }
}

class ParticleSystem {
    static particles = [];

    static init() {
        this.startParticleSystem();
        this.updateParticles();
    }

    static createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const size = Math.random() * 10 + 5;
        const xStart = Math.random() * window.innerWidth;
        const yStart = Math.random() * window.innerHeight;
        const zStart = Math.random() * 500 - 250;

        const particleData = {
            element: particle,
            x: xStart,
            y: yStart,
            z: zStart,
            size: size,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 - 2,
            speedZ: Math.random() * 2 - 1,
            color: this.getRandomColor(),
            opacity: 0.9,
        };

        this.setupParticleElement(particle, particleData);
        this.particles.push(particleData);
        document.getElementById("particles-container").appendChild(particle);
    }

    static getRandomColor() {
        const colors = ["#FF5733", "#33FF57", "#5733FF", "#FF33A6", "#33A6FF"];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    static setupParticleElement(particle, data) {
        particle.style.width = `${data.size}px`;
        particle.style.height = `${data.size}px`;
        particle.style.left = `${data.x}px`;
        particle.style.top = `${data.y}px`;
        particle.style.backgroundColor = data.color;
    }

    static updateParticles() {
        this.particles.forEach((particle, index) => {
            this.updateParticlePosition(particle, index);
        });
        requestAnimationFrame(() => this.updateParticles());
    }

    static updateParticlePosition(particle, index) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.z += particle.speedZ;

        const scale = Math.max(0.1, 1 - Math.abs(particle.z) / 300);
        const opacity = Math.max(0.1, 1 - Math.abs(particle.z) / 300);
        
        particle.element.style.transform = `translate3d(${particle.x}px, ${particle.y}px, ${particle.z}px) scale(${scale})`;
        particle.element.style.opacity = opacity;

        if (this.isParticleOutOfBounds(particle)) {
            this.removeParticle(index);
        }
    }

    static isParticleOutOfBounds(particle) {
        return (
            particle.x < 0 ||
            particle.x > window.innerWidth ||
            particle.y < 0 ||
            particle.y > window.innerHeight ||
            Math.abs(particle.z) > 300
        );
    }

    static removeParticle(index) {
        this.particles[index].element.remove();
        this.particles.splice(index, 1);
    }

    static startParticleSystem() {
        setInterval(() => this.createParticle(), 3);
    }
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handlers
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', Auth.handleSignup.bind(Auth));
    }

    // Initialize password toggle
    PasswordToggle.init();

    // Initialize particle system if container exists
    if (document.getElementById('particles-container')) {
        ParticleSystem.init();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('tvakopche');

    if (!button) {
        console.error("Button #tvakopche not found in DOM!");
        return;
    }

    console.log("Button found! Adding event listener...");

    button.addEventListener('click', () => {
        console.log("Button clicked! Calling pyrvo()...");
        pyrvo();
    });
});

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
