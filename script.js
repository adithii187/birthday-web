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
                text: 'How many different countries did Kanth visit?', 
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
            { id: 'p1', src: 'Camel_Traveller.jpg', caption: 'Dessert Explorer' },
            { id: 'p2', src: 'kerala.jpg', caption: 'Lake Conqueror Part 1: Kerala' },
            { id: 'p3', src: 'Lake_Traveller.jpg', caption: 'Lake Conqueror Part 2 : Udaipur' },
            { id: 'p4', src: 'Temple_Traveller.jpg', caption: 'Temples of the Dessert' },
            { id: 'p5', src: 'Warangal_Traveller.jpg', caption: 'Lake Conqueror Part 3 : Warangal' },
        ]
    },
    {
        id: 2,
        theme: 'vintage',
        questionnaireTitle: 'Athlete',
        questions: [
            { 
                id: 'q1', 
                text: 'How many full marathons has Kanth completed?', 
                type: 'mcq',
                options: ['atleast 2', 'atleast 3', 'atleast 4', 'atleast 5'],
                correctAnswer: 'atleast 3'
            },
            { 
                id: 'q2', 
                text: 'How frequently does Kanth work out/stay active in a week?', 
                type: 'mcq',
                options: ['3 times', '4 times', '😮‍💨 everyday'],
                correctAnswer: '😮‍💨 everyday'
            },
            { 
                id: 'q3', 
                text: 'Despite all that, what is his waist size?😊', 
                type: 'mcq',
                options: ['32 inch', '30 inch', '😮 More than 34 inch'],
                correctAnswer: '😮 More than 34 inch'
            }
        ],
        photos: [
            { id: 'p1', src: 'Badminton_Sports.jpg', caption: 'Torturing Team members on court also' },
            { id: 'p2', src: 'Hyd_Marathon.jpg', caption: 'Marathon Finish 1' },
            { id: 'p3', src: 'Hyd_Run.jpg', caption: 'Run Finish 2' },
            { id: 'p4', src: 'Ice_Sports.jpg', caption: 'Woah Icy' },
            { id: 'p5', src: 'Mumbai_marathon.png', caption: 'Marathon Finish 2: Mumbai' }
        ]
    },
    {
        id: 3,
        theme: 'cosmic',
        questionnaireTitle: 'OverAchiever',
        questions: [
            { 
                id: 'q1', 
                text: 'Kanth\'s EAMCET Rank?', 
                type: 'mcq',
                options: ['< 300', ' < 500', '< 1000', '< 5000'],
                correctAnswer: '< 300'
            },
            { 
                id: 'q2', 
                text: 'Which of the following did Kanth achieve?', 
                type: 'mcq',
                options: ['UPSC-IRS', 'IIT-M Gold Medal', 'IIM MBA Grad', '😮‍💨😮‍💨😮‍💨 All, Hard to match'],
                correctAnswer: '😮‍💨😮‍💨😮‍💨 All, Hard to match'
            }
        ],
        photos: [
            { id: 'p1', src: 'IESA_Qcomm.jpg', caption: 'Reaching for the stars' },
            { id: 'p2', src: 'Awards_Qcomm.jpg', caption: 'So many Qcomm wafers' }
        ]
    },
    {
        id: 4,
        theme: 'modern',
        questionnaireTitle: 'Bonus',
        questions: [
            { 
                id: 'q1', 
                text: 'After going through many of Kanth\'s pictures, one quirk was identified. Guess what it is?', 
                type: 'mcq',
                options: ['Clicks a selfie everywhere', 'Looks at camera with 😑 face', 'Clicks funny pictures of Ammu', 'All?'],
                correctAnswer: 'Clicks a selfie everywhere'
            }
        ],
        photos: [
            { id: 'p1', src: 'Selfie_Covid.jpg', caption: 'COVID may come and go, but selfie-fever, stays forever.' },
            { id: 'p2', src: 'Selfie_AIgen.jpg', caption: 'Can make a normally clicked selfie, look like it\'s AI generated.' },
            { id: 'p3', src: 'Selfie_Chutney.jpg', caption: 'Always irritated Chutney, even in Kanth\'s infamous selfies.' },
            { id: 'p4', src: 'Selfie_Fam.jpg', caption: 'Selfie can\'t be bad if Potato is in it :)' },
            { id: 'p5', src: 'Selfie_Hill.jpg', caption: 'Selfie at Hill also' },
            { id: 'p6', src: 'Selfie_randomly.jpg', caption: 'Just your everyday Selfie, cuz why not?' },
            { id: 'p7', src: 'Selfie_Sea.jpg', caption: 'Selfie at Sea also' },
            { id: 'p8', src: 'Selfie_Theatre.jpg', caption: 'Even in a dark theatre, Kanth finds a way to click a selfie :)' },
            { id: 'p9', src: 'Selfie_Train.jpg', caption: 'Selfie with a Train also' },
            { id: 'p10', src: 'Selfie_Waterfall.jpg', caption: 'Selfie at Waterfall also' }
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
            delay: Math.random() * 0.05
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

    const photoItems = document.querySelectorAll('.photo-item');
    photoItems.forEach(photoItem => {
        photoItem.addEventListener('click', () => {
            const previewModal = document.createElement('div');
            previewModal.className = 'photo-preview-modal';
            previewModal.innerHTML = `
                <div class="modal-content">
                    <img src="${photoItem.dataset.src}" alt="Photo Preview">
                    <p>${photoItem.dataset.caption}</p>
                    <button class="close-modal">Close</button>
                </div>
            `;
            document.body.appendChild(previewModal);

            previewModal.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(previewModal);
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
                Here's to another year of adventures, laughter, and unforgettable moments. May your year ahead be extraordinary!. Happy Birthday!            </p>
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

