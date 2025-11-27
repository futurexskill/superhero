// Get DOM elements
const heroNameInput = document.getElementById('heroName');
const superpowerSelect = document.getElementById('superpower');
const color1Input = document.getElementById('color1');
const color2Input = document.getElementById('color2');
const heroStoryTextarea = document.getElementById('heroStory');
const charCountSpan = document.getElementById('charCount');
const createHeroBtn = document.getElementById('createHeroBtn');
const heroCard = document.getElementById('heroCard');
const cardName = document.getElementById('cardName');
const cardPower = document.getElementById('cardPower');
const cardStory = document.getElementById('cardStory');
const costumePreview = document.getElementById('costumePreview');
const heroGallery = document.getElementById('heroGallery');
const clearGalleryBtn = document.getElementById('clearGalleryBtn');

// Storage key for localStorage
const STORAGE_KEY = 'superheroGallery';

// Superpower emojis mapping
const superpowerEmojis = {
    'flying': '🦅',
    'super-strength': '💪',
    'invisibility': '👻',
    'laser-eyes': '👀'
};

// Superpower display names
const superpowerNames = {
    'flying': 'Flying',
    'super-strength': 'Super Strength',
    'invisibility': 'Invisibility',
    'laser-eyes': 'Laser Eyes'
};

// Character counter for story textarea
heroStoryTextarea.addEventListener('input', () => {
    const count = heroStoryTextarea.value.length;
    charCountSpan.textContent = count;
    
    // Change color when approaching limit
    if (count > 250) {
        charCountSpan.style.color = '#f5576c';
    } else {
        charCountSpan.style.color = '#666';
    }
});

// Load heroes from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    loadGallery();
});

// Create Hero button click event
createHeroBtn.addEventListener('click', () => {
    const heroName = heroNameInput.value.trim();
    const superpower = superpowerSelect.value;
    const color1 = color1Input.value;
    const color2 = color2Input.value;
    const heroStory = heroStoryTextarea.value.trim();

    // Validation
    if (!heroName) {
        alert('🦸 Please enter a superhero name!');
        heroNameInput.focus();
        return;
    }

    if (!superpower) {
        alert('⚡ Please choose a superpower!');
        superpowerSelect.focus();
        return;
    }

    if (!heroStory) {
        alert('📖 Please write a story about your hero!');
        heroStoryTextarea.focus();
        return;
    }

    // Create hero object
    const hero = {
        id: Date.now(),
        name: heroName,
        superpower: superpower,
        color1: color1,
        color2: color2,
        story: heroStory
    };

    // Display hero card preview
    displayHeroCard(hero);

    // Save hero to gallery
    saveHero(hero);

    // Add celebration effect
    celebrateHeroCreation();

    // Clear form
    setTimeout(() => {
        clearForm();
    }, 500);
});

// Display hero card in preview section
function displayHeroCard(hero) {
    heroCard.classList.remove('hidden');
    
    cardName.textContent = hero.name;
    cardPower.textContent = `${superpowerEmojis[hero.superpower]} ${superpowerNames[hero.superpower]}`;
    cardStory.textContent = hero.story;
    
    // Apply costume colors
    costumePreview.style.background = `linear-gradient(135deg, ${hero.color1} 0%, ${hero.color2} 100%)`;
    heroCard.style.background = `linear-gradient(135deg, ${hero.color1} 0%, ${hero.color2} 100%)`;
    
    // Trigger animation
    heroCard.style.animation = 'none';
    setTimeout(() => {
        heroCard.style.animation = 'slideIn 0.5s ease';
    }, 10);
}

// Save hero to localStorage and update gallery
function saveHero(hero) {
    let heroes = getHeroes();
    heroes.unshift(hero); // Add to beginning of array
    localStorage.setItem(STORAGE_KEY, JSON.stringify(heroes));
    
    // Update gallery display
    loadGallery();
}

// Get heroes from localStorage
function getHeroes() {
    const heroes = localStorage.getItem(STORAGE_KEY);
    return heroes ? JSON.parse(heroes) : [];
}

// Load and display gallery
function loadGallery() {
    const heroes = getHeroes();
    
    if (heroes.length === 0) {
        heroGallery.innerHTML = '<p class="empty-message">No heroes yet! Create your first superhero above! 🚀</p>';
        return;
    }
    
    heroGallery.innerHTML = '';
    
    heroes.forEach(hero => {
        const card = createGalleryCard(hero);
        heroGallery.appendChild(card);
    });
}

// Create gallery card element
function createGalleryCard(hero) {
    const card = document.createElement('div');
    card.className = 'gallery-card';
    card.style.background = `linear-gradient(135deg, ${hero.color1} 0%, ${hero.color2} 100%)`;
    
    card.innerHTML = `
        <button class="delete-btn" onclick="deleteHero(${hero.id})">❌</button>
        <h3>${hero.name}</h3>
        <span class="power-badge">${superpowerEmojis[hero.superpower]} ${superpowerNames[hero.superpower]}</span>
        <div class="costume-colors">
            <div class="color-swatch" style="background: ${hero.color1}"></div>
            <div class="color-swatch" style="background: ${hero.color2}"></div>
        </div>
        <p>${hero.story}</p>
    `;
    
    return card;
}

// Delete hero from gallery
function deleteHero(heroId) {
    if (confirm('Are you sure you want to delete this hero? 🦸')) {
        let heroes = getHeroes();
        heroes = heroes.filter(hero => hero.id !== heroId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(heroes));
        loadGallery();
        
        // Add delete animation
        const cards = document.querySelectorAll('.gallery-card');
        cards.forEach(card => {
            if (card.querySelector('.delete-btn').getAttribute('onclick').includes(heroId)) {
                card.style.animation = 'popIn 0.3s ease reverse';
            }
        });
    }
}

// Clear entire gallery
clearGalleryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to delete ALL heroes? This cannot be undone! 🗑️')) {
        localStorage.removeItem(STORAGE_KEY);
        loadGallery();
        heroCard.classList.add('hidden');
    }
});

// Clear form inputs
function clearForm() {
    heroNameInput.value = '';
    superpowerSelect.value = '';
    heroStoryTextarea.value = '';
    charCountSpan.textContent = '0';
    color1Input.value = '#ff6b6b';
    color2Input.value = '#4ecdc4';
}

// Celebration effect when hero is created
function celebrateHeroCreation() {
    // Add shake animation to button
    createHeroBtn.style.animation = 'bounce 0.5s ease';
    
    setTimeout(() => {
        createHeroBtn.style.animation = '';
    }, 500);
    
    // Create floating emojis
    const emojis = ['🎉', '⭐', '✨', '🎊', '💫', '🌟'];
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createFloatingEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
        }, i * 100);
    }
}

// Create floating emoji animation
function createFloatingEmoji(emoji) {
    const element = document.createElement('div');
    element.textContent = emoji;
    element.style.position = 'fixed';
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = window.innerHeight + 'px';
    element.style.fontSize = '2rem';
    element.style.zIndex = '9999';
    element.style.pointerEvents = 'none';
    element.style.transition = 'all 2s ease-out';
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.style.top = '-100px';
        element.style.opacity = '0';
        element.style.transform = 'rotate(360deg)';
    }, 10);
    
    setTimeout(() => {
        element.remove();
    }, 2000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Press Enter while in name or story field (with Ctrl/Cmd) to create hero
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        createHeroBtn.click();
    }
});

// Add hover effect to color pickers
color1Input.addEventListener('input', () => {
    updateColorPreview();
});

color2Input.addEventListener('input', () => {
    updateColorPreview();
});

function updateColorPreview() {
    const color1 = color1Input.value;
    const color2 = color2Input.value;
    costumePreview.style.background = `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

// Initialize color preview
updateColorPreview();
