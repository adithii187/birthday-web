// script.js

// Journey Data
const JOURNEY_DATA = [
    {}, // Stage 0 (landing page)
    {
        id: 1,
        theme: 'retro',
        photos: [
            { id: 'p1', src: 'images/mom1.jpg', caption: 'Styleee 😎' },
            { id: 'p2', src: 'images/mom2.jpg', caption: 'Queen 💅' },
            { id: 'p3', src: 'images/mom3.jpg', caption: 'The OG 😘' }
        ]
    },
        { id: 2, theme: 'bow', isBow: true },    
    {
        id: 3,
        theme: 'vintage',
        photos: [
            { id: 'p1', src: 'images/mom8.jpg', caption: 'Fammm ❤️' },
            { id: 'p2', src: 'images/mom5.jpg', caption: 'Same same but different 🍏 🍎' },
            { id: 'p3', src: 'images/mom6.jpg', caption: '💞' }
        ]
    },

    {
        id: 4,
        theme: 'cosmic',
        photos: [
            { id: 'p1', src: 'images/mom14.jpg', caption: 'Us, Amma and Amamma 💐' },
            { id: 'p2', src: 'images/mom12.jpg', caption: 'Amma in her prime 🥰' }
        ]
    },
    {
        id: 5,
        theme: 'modern',
        photos: [
            { id: 'p1', src: 'images/mom9.jpg', caption: '✨' },
            { id: 'p2', src: 'images/mom10.jpg', caption: 'Vibes 😎' },
            { id: 'p3', src: 'images/mom11.jpg', caption: 'Thanks mommy❤️' }
        ]
    },
    {
        id: 6,
        theme: 'selfie',
        photos: [
            { id: 'p1', src: 'images/mom4.jpg', caption: '' },
            { id: 'p2', src: 'images/mom13.jpg', caption: '' },
            { id: 'p3', src: 'images/mom7.jpg', caption: 'Aloo and Amma 🥔' },
            { id: 'p4', src: 'images/mom15.jpg', caption: '' },
            // { id: 'p5', src: 'images/Selfie_Hill.jpg', caption: 'Selfie at Hill also' },
            // { id: 'p6', src: 'images/Selfie_randomly.jpg', caption: 'Just your everyday Selfie, cuz why not?' },
            // { id: 'p7', src: 'images/Selfie_Sea.jpg', caption: 'Selfie at Sea also' },
            // { id: 'p8', src: 'images/Selfie_Theatre.jpg', caption: 'Even in a dark theatre, Kanth finds a way to click a selfie :)' },
            // { id: 'p9', src: 'images/Selfie_Train.jpg', caption: 'Selfie with a Train also' },
            // { id: 'p10', src: 'images/Selfie_Waterfall.jpg', caption: 'Selfie at Waterfall also' }
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
        const stage = JOURNEY_DATA[currentStage];
        if (stage.isBow) {
            showBowUI();
        } else {
            showPhotoCollage(stage);
        }
    } else {
        renderFinalPage();
    }
}


function showBowUI() {
  const container = document.getElementById('app-container');
  container.innerHTML = `
    <div class="photo-collage theme-bow">
      <div id="bow-container">
        <div id="bow"></div>
        <div id="arrow"></div>
        <div id="target"></div>
      </div>
      <button class="continue-button" id="next-stage-btn">Next</button>
    </div>
  `;

  const arrow = document.getElementById('arrow');
  let isDragging = false;
  let startX = 0;
  const minX = 50;
  const maxX = 300;
  arrow.style.left = minX + 'px';

  arrow.addEventListener('mousedown', (e) => {
    e.preventDefault(); // stop conflicts with clicks
    isDragging = true;
    startX = e.clientX;
    arrow.style.transition = 'none';
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = startX - e.clientX;
    const newX = Math.min(Math.max(minX, minX - dx), maxX);
    arrow.style.left = newX + 'px';
  });

  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    arrow.style.transition = 'left 0.3s ease-out';

    gsap.to(arrow, {
      duration: 1,
      x: 300,
      rotation: 0,
      ease: "power2.in",
      onComplete: () => {
        gsap.to("#target", { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
gsap.to(arrow, {
  duration: 1,
  x: 300,
  rotation: 0,
  ease: "power2.in",
  onComplete: () => {
    gsap.to("#target", { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
    gsap.to(arrow, {
      delay: 0.5,
      duration: 0.5,
      x: 0,          // <-- THIS sends the arrow BACK to start
      left: minX + 'px'
    });
  }
});
      }
    });
  });

  // Make sure only **one listener** is attached
  const nextBtn = document.getElementById('next-stage-btn');
  nextBtn.replaceWith(nextBtn.cloneNode(true)); // remove any old listeners
  document.getElementById('next-stage-btn').addEventListener('click', moveToNextStage);
}



window.onload = () => {
    initApp();
};


// Landing Page
function renderLandingPage() {
    const container = document.getElementById('app-container');
    container.innerHTML = `
        <div class="landing-page">
            <div class="cake-background" id="cake">🧁</div>
            <div class="balloons-container" id="balloons"></div>
            <div class="landing-content">
                <h1 class="birthday-title" style="filter: blur(2px); opacity: 2;">Happy Birthday Amma!</h1>
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
// function renderQuestionnaire(stage) {
//     const container = document.getElementById('app-container');
//     let currentQuestionIndex = 0;

//     function showQuestion() {
//         const question = stage.questions[currentQuestionIndex];
//         container.innerHTML = `
//             <div class="questionnaire">
//                 <div class="questionnaire-container">
//                     <h2 class="questionnaire-title">${stage.questionnaireTitle}</h2>
//                     <div class="question">
//                         <label class="question-label">${question.text}</label>
//                         <div class="options-container">
//                             ${question.options.map(option => `
//                                 <button class="option-button">${option}</button>
//                             `).join('')}
//                         </div>
//                     </div>
//                     <div class="feedback" id="feedback"></div>
//                 </div>
//             </div>
//         `;

//         const optionButtons = document.querySelectorAll('.option-button');
//         optionButtons.forEach(button => {
//             button.addEventListener('click', () => {
//                 const selectedAnswer = button.textContent;
//                 const feedback = document.getElementById('feedback');
//                 optionButtons.forEach(btn => btn.disabled = true);

//                 if (selectedAnswer === question.correctAnswer) {
//                     feedback.innerHTML = `<p class='correct'>Correct! 👍</p>`;
//                 } else {
//                     feedback.innerHTML = `<p class='incorrect'>Incorrect. The correct answer is: <strong>${question.correctAnswer}</strong></p>`;
//                 }

//                 setTimeout(() => {
//                     currentQuestionIndex++;
//                     if (currentQuestionIndex < stage.questions.length) {
//                         showQuestion();
//                     } else {
//                         showPhotoCollage(stage);
//                     }
//                 }, 2000);
//             });
//         });
//     }

//     showQuestion();
// }


// Refactored Photo Collage
// function showPhotoCollage(stage) {
//     const container = document.getElementById('app-container');
//     container.innerHTML = `
//         <div class="photo-collage">
//             <div class="photo-container">
//                 ${stage.photos.map(photo => `
//                     <div class="photo-item"
//                          data-src="${photo.src}"
//                          data-caption="${photo.caption}"
//                          style="background-image: url('${photo.src}')">
//                     </div>
//                 `).join('')}
//             </div>
//             <button class="continue-button" id="next-stage-btn">Continue</button>
//         </div>
//     `;

//     const collage = document.querySelector('.photo-collage');
//     collage.classList.add(`theme-${stage.theme}`);
//     document.getElementById('next-stage-btn').addEventListener('click', moveToNextStage);

//     const photos = document.querySelectorAll('.photo-item');

//     photos.forEach(photo => {
//         // 1. Define a final "resting" position for the photo to be scattered to.
//         const restingPosition = {
//             x: gsap.utils.random(-window.innerWidth / 4, window.innerWidth / 4),
//             y: gsap.utils.random(-window.innerHeight / 4, window.innerHeight / 4),
//             rotation: gsap.utils.random(-15, 15)
//         };

//         // 2. Animate from a random off-screen position TO the resting position.
//         gsap.fromTo(photo, 
//         { // FROM properties
//             x: gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
//             y: gsap.utils.random(-window.innerHeight / 2, window.innerHeight / 2),
//             scale: 0.1,
//             opacity: 0,
//             rotation: gsap.utils.random(-270, 270),
//         },
//         { // TO properties
//             ...restingPosition,
//             scale: 1,
//             opacity: 1,
//             duration: 1.2,
//             ease: 'power2.out',
//             delay: Math.random() * 0.05
//         });

//         // 3. Create the continuous hover animation based on the resting position.
//         const hoverAnimation = gsap.to(photo, {
//             x: () => restingPosition.x + gsap.utils.random(-20, 20),
//             y: () => restingPosition.y + gsap.utils.random(-20, 20),
//             rotation: () => restingPosition.rotation + gsap.utils.random(-5, 5),
//             duration: gsap.utils.random(4, 7),
//             repeat: -1,
//             yoyo: true,
//             ease: 'power1.inOut',
//         }).pause();

//         // Start the hover animation after the intro animation is complete.
//         setTimeout(() => {
//             hoverAnimation.play();
//         }, 2000);

//         // 4. Add listeners for hover and click interactions.
//         photo.addEventListener('mouseenter', () => {
//             hoverAnimation.pause();
//             gsap.to(photo, { scale: 1.1, zIndex: 10, duration: 0.3 });
//             const captionEl = document.createElement('div');
//             captionEl.className = 'photo-caption';
//             captionEl.textContent = photo.dataset.caption;
//             photo.appendChild(captionEl);
//         });

//         photo.addEventListener('mouseleave', () => {
//             hoverAnimation.resume();
//             gsap.to(photo, { scale: 1.0, zIndex: 1, duration: 0.3 });
//             const captionEl = photo.querySelector('.photo-caption');
//             if (captionEl) captionEl.remove();
//         });

//         photo.addEventListener('click', () => {
//             showLightbox({
//                 src: photo.dataset.src,
//                 caption: photo.dataset.caption
//             });
//         });
//     });

//     const photoItems = document.querySelectorAll('.photo-item');
//     photoItems.forEach(photoItem => {
//         photoItem.addEventListener('click', () => {
//             const previewModal = document.createElement('div');
//             previewModal.className = 'photo-preview-modal';
//             previewModal.innerHTML = `
//                 <div class="modal-content">
//                     <img src="${photoItem.dataset.src}" alt="Photo Preview">
//                     <p>${photoItem.dataset.caption}</p>
//                     <button class="close-modal">Close</button>
//                 </div>
//             `;
//             document.body.appendChild(previewModal);

//             previewModal.querySelector('.close-modal').addEventListener('click', () => {
//                 document.body.removeChild(previewModal);
//             });
//         });
//     });
// }
function showPhotoCollage(stage) {
  const container = document.getElementById('app-container');
  container.innerHTML = `
    <div class="photo-collage theme-${stage.theme}">
      <div class="collage">
        ${stage.photos.map(photo => `
          <div class="photo-wrapper">
            <img src="${photo.src}" alt="${photo.caption}">
            <p class="photo-caption">${photo.caption}</p>
          </div>
        `).join('')}
      </div>
      <button class="continue-button" id="next-stage-btn">Next</button>
    </div>
  `;

  // Add click-to-view (lightbox)
  document.querySelectorAll('.photo-wrapper img').forEach(img => {
    img.addEventListener('click', () => {
      showLightbox({
        src: img.src,
        caption: img.nextElementSibling.textContent
      });
    });
  });

  // Animate fade-in for the grid
  gsap.from('.photo-wrapper', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out'
  });

  document.getElementById('next-stage-btn').addEventListener('click', moveToNextStage);
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
            <h1 class="final-message"> Thank you, Amma! ❤️ </h1>
            <p class="final-text">
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

