// script.js

// Journey Data
const JOURNEY_DATA = [
    {}, // Stage 0 is landing page placeholder
    {
        id: 1,
        theme: 'retro',
        questionnaireTitle: 'Traveller',
        questions: [
            { 
                id: 'q1', 
                text: 'How many different countries did LK visit?', 
                type: 'mcq',
                options: ['2-5', '6-10', '11-15' , 'more than 15'],
                correctAnswer: 'more than 15'
            },
            { 
                id: 'q2', 
                text: 'Out of those, how many did he take ammu along with him to visit?', 
                type: 'mcq',
                options: ['less than 5', 'less than 10', 'less than 15'],
                correctAnswer: 'less than 5'
            }
        ],
        photos: [
            { id: 'p1', src: 'image.png', caption: 'The fashion era we all remember fondly' },
            { id: 'p2', src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', caption: 'Pizza: the eternal birthday companion' }
        ]
    },
    {
        id: 2,
        theme: 'vintage',
        questionnaireTitle: 'Memory Lane Chronicles',
        questions: [
            { 
                id: 'q1', 
                text: 'Favorite childhood cartoon?', 
                type: 'mcq',
                options: ['Tom & Jerry', 'Scooby-Doo', 'Looney Tunes', 'Other'],
                correctAnswer: 'Tom & Jerry'
            },
            { 
                id: 'q2', 
                text: 'Most embarrassing moment from school?', 
                type: 'mcq',
                options: ['Forgot homework', 'Fell in class', 'Called teacher mom', 'Other'],
                correctAnswer: 'Called teacher mom'
            }
        ],
        photos: [
            { id: 'p1', src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400', caption: 'Memories captured in time' },
            { id: 'p2', src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400', caption: 'Adventures that shaped us' }
        ]
    },
    {
        id: 3,
        theme: 'cosmic',
        questionnaireTitle: 'Galactic Reflections',
        questions: [
            { 
                id: 'q1', 
                text: 'If you could travel anywhere, where would you go?', 
                type: 'mcq',
                options: ['Mars', 'Moon', 'Saturn', 'Other'],
                correctAnswer: 'Mars'
            },
            { 
                id: 'q2', 
                text: 'Dream superpower?', 
                type: 'mcq',
                options: ['Invisibility', 'Flying', 'Time travel', 'Other'],
                correctAnswer: 'Time travel'
            }
        ],
        photos: [
            { id: 'p1', src: 'https://images.unsplash.com/photo-141924290_2214-272b3f66ee7a?w=400', caption: 'Reaching for the stars' },
            { id: 'p2', src: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=400', caption: 'Cosmic dreams and aspirations' }
        ]
    },
    {
        id: 4,
        theme: 'modern',
        questionnaireTitle: 'Today’s Trends',
        questions: [
            { 
                id: 'q1', 
                text: 'Favorite social media platform?', 
                type: 'mcq',
                options: ['Instagram', 'TikTok', 'Twitter', 'Other'],
                correctAnswer: 'Instagram'
            },
            { 
                id: 'q2', 
                text: 'Go-to streaming service?', 
                type: 'mcq',
                options: ['Netflix', 'Hulu', 'Disney+', 'Other'],
                correctAnswer: 'Netflix'
            }
        ],
        photos: [
            { id: 'p1', src: 'https://images.unsplash.com/photo-1551232864-3f0890e58e35?w=500', caption: 'Modern vibes' },
            { id: 'p2', src: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=500', caption: 'Trendy moments' }
        ]
    }
];

// State Management
let currentStage = 0;
const answers = {};

// Initialize App
function initApp() {
    renderLandingPage();
}

// Move to Next Stage
function moveToNextStage() {
    currentStage++;
    if (currentStage < JOURNEY_DATA.length) {
        renderQuestionnaire(JOURNEY_DATA[currentStage]);
    } else {
        renderFinalPage();
    }
}

// Landing Page
function renderLandingPage() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="landing-page">
            <div class="cake-background" id="cake">🧁</div>
            <div class="balloons-container" id="balloons"></div>
            <div class="landing-content">
                <h1 class="birthday-title" style="filter: blur(2px); opacity: 2;">Happy Birthday!</h1>
                <p class="subtitle">On this occasion, let's explore three fun avatars of LK 🎉</p>
                <button class="start-button" id="start-btn">Start</button>
            </div>
        </div>
    `;

    gsap.fromTo('#cake', 
        { scale: 0, rotation: 0, opacity: 0 }, 
        { 
            duration: 2, 
            scale: 2, 
            rotation: 360, 
            opacity: 0.5, 
            ease: 'elastic.out(1, 0.5)',
            onComplete: () => {
                gsap.to('#cake', {
                    duration: 1,
                    scale: 1,
                    ease: 'power1.inOut'
                });
            }
        }
    );

    const title = document.querySelector('.birthday-title');
    const text = title.textContent;
    title.innerHTML = text.split('').map(char => 
        char === ' ' ? ' ' : `<span style="display:inline-block;opacity:0">${char}</span>`
    ).join('');

    gsap.to('.birthday-title span', {
        duration: 0.8,
        opacity: 1,
        y: 0,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        onComplete: () => {
            title.style.filter = 'none';
        }
    });

    for (let i = 0; i < 20; i++) {
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.backgroundColor = getRandomColor();
        balloon.style.left = `${Math.random() * 100}%`;
        balloon.style.animationDelay = `${Math.random() * 5}s`;

        const string = document.createElement('div');
        string.className = 'balloon-string';
        balloon.appendChild(string);

        document.getElementById('balloons').appendChild(balloon);
    }

    document.getElementById('start-btn').addEventListener('click', function(e) {
        gsap.to(e.target, {
            duration: 0.1,
            scale: 0.95,
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                setTimeout(moveToNextStage, 300);
            }
        });
    });
}

function getRandomColor() {
    const colors = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#955251', '#B565A7', '#009B77'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Questionnaire
function renderQuestionnaire(stage) {
    const container = document.getElementById('app-container');
    let currentQuestionIndex = 0;

    function showQuestion() {
        const question = stage.questions[currentQuestionIndex];
        container.innerHTML = `
            <div class="questionnaire">
                <div class="questionnaire-container">
                    <h2 class="questionnaire-title">${stage.questionnaireTitle}</h2>
                    <div class="question">
                        <label class="question-label">${question.text}</label>
                        <div class="options-container">
                            ${question.options.map(option => `
                                <button class="option-button">${option}</button>
                            `).join('')}
                        </div>
                    </div>
                    <div class="feedback" id="feedback"></div>
                </div>
            </div>
        `;

        const optionButtons = document.querySelectorAll('.option-button');
        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                const selectedAnswer = button.textContent;
                const feedback = document.getElementById('feedback');
                optionButtons.forEach(btn => btn.disabled = true);

                if (selectedAnswer === question.correctAnswer) {
                    feedback.innerHTML = `<p class='correct'>Correct! 👍</p>`;
                } else {
                    feedback.innerHTML = `<p class='incorrect'>Incorrect. The correct answer is: <strong>${question.correctAnswer}</strong></p>`;
                }

                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < stage.questions.length) {
                        showQuestion();
                    } else {
                        showPhotoCollage(stage);
                    }
                }, 2000);
            });
        });
    }

    showQuestion();
}


// Refactored Photo Collage
function showPhotoCollage(stage) {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="photo-collage">
            <div class="photo-container">
                ${stage.photos.map(photo => `
                    <div class="photo-item"
                         data-src="${photo.src}"
                         data-caption="${photo.caption}"
                         style="background-image: url('${photo.src}')">
                    </div>
                `).join('')}
            </div>
            <button class="continue-button" id="next-stage-btn">Continue</button>
        </div>
    `;

    const collage = document.querySelector('.photo-collage');
    collage.classList.add(`theme-${stage.theme}`);
    document.getElementById('next-stage-btn').addEventListener('click', moveToNextStage);

    const photos = document.querySelectorAll('.photo-item');

    photos.forEach(photo => {
        // 1. Define a final "resting" position for the photo to be scattered to.
        const restingPosition = {
            x: gsap.utils.random(-window.innerWidth / 4, window.innerWidth / 4),
            y: gsap.utils.random(-window.innerHeight / 4, window.innerHeight / 4),
            rotation: gsap.utils.random(-15, 15)
        };

        // 2. Animate from a random off-screen position TO the resting position.
        gsap.fromTo(photo, 
        { // FROM properties
            x: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
            y: gsap.utils.random(-window.innerHeight / 2, window.innerHeight / 2),
            scale: 0.1,
            opacity: 0,
            rotation: gsap.utils.random(-270, 270),
        },
        { // TO properties
            ...restingPosition,
            scale: 1,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            delay: Math.random() * 0.2
        });

        // 3. Create the continuous hover animation based on the resting position.
        const hoverAnimation = gsap.to(photo, {
            x: () => restingPosition.x + gsap.utils.random(-20, 20),
            y: () => restingPosition.y + gsap.utils.random(-20, 20),
            rotation: () => restingPosition.rotation + gsap.utils.random(-5, 5),
            duration: gsap.utils.random(4, 7),
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        }).pause();

        // Start the hover animation after the intro animation is complete.
        setTimeout(() => {
            hoverAnimation.play();
        }, 2000);

        // 4. Add listeners for hover and click interactions.
        photo.addEventListener('mouseenter', () => {
            hoverAnimation.pause();
            gsap.to(photo, { scale: 1.1, zIndex: 10, duration: 0.3 });
            const captionEl = document.createElement('div');
            captionEl.className = 'photo-caption';
            captionEl.textContent = photo.dataset.caption;
            photo.appendChild(captionEl);
        });

        photo.addEventListener('mouseleave', () => {
            hoverAnimation.resume();
            gsap.to(photo, { scale: 1.0, zIndex: 1, duration: 0.3 });
            const captionEl = photo.querySelector('.photo-caption');
            if (captionEl) captionEl.remove();
        });

        photo.addEventListener('click', () => {
            showLightbox({
                src: photo.dataset.src,
                caption: photo.dataset.caption
            });
        });
    });
}


// Lightbox
function showLightbox(photo) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">&times;</button>
            <img src="${photo.src}" alt="${photo.caption}">
            <p class="lightbox-caption">${photo.caption}</p>
        </div>
    `;
    document.body.appendChild(lightbox);

    gsap.from(lightbox, { duration: 0.3, opacity: 0 });
    gsap.from('.lightbox-content', {
        duration: 0.5,
        scale: 0.8,
        opacity: 0,
        ease: 'back.out(1.7)'
    });

    const closeLightbox = () => {
        gsap.to(lightbox, {
            duration: 0.3,
            opacity: 0,
            onComplete: () => lightbox.remove()
        });
    };
    
    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
}

// Final Page
function renderFinalPage() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="final-page">
            <h1 class="final-message">👍 You Made It! 👍</h1>
            <p class="final-text">
                What an amazing journey through memories! Here's to another year of adventures, laughter, and unforgettable moments. May your day be filled with joy and your year ahead be extraordinary!
            </p>
        </div>
    `;

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        confetti({
            particleCount: 50,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });
    }, 250);

    gsap.from('.final-message', {
        duration: 1,
        scale: 0,
        rotation: 360,
        ease: 'elastic.out(1, 0.5)'
    });

    gsap.from('.final-text', {
        duration: 1,
        opacity: 0,
        y: 50,
        delay: 0.5,
        ease: 'power3.out'
    });
    
    console.log("Collected Answers:", answers); 
}

initApp();

