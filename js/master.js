// Random Background Option
let backgroundOption = true;

// Variable To Control Background Option Interval
let backgroundInterval;

// Check If Locale Sotrage Color Option
let mainColors = localStorage.getItem("color_option");

if (mainColors != null) {
  //! Change The main-color To What We Have In Locale Storage
  document.documentElement.style.setProperty("--main-color", mainColors);

  //? Remove Class Active From All The Color Li And Add it To li That Have The Same DAtaset With Content OF mainColors
  document.querySelectorAll(".colors-list li").forEach((li) => {
    //! Remove Active Class From All Li
    li.classList.remove("active");

    //! Add Active Class To The Target When li.datase === mainColors
    if (li.dataset.color === mainColors) li.classList.add("active");
  });
}

// Check If Locale Storage Backgroun Option
let mainBackground = localStorage.getItem("background_option");

if (mainBackground !== null) {

  if (mainBackground === "true") {

    backgroundOption = true;

  } else {

    backgroundOption = false;

  }

  // Get All Spans
  document.querySelectorAll(".random-background span").forEach((span) => {
    // Remove All Active Class From spans
    span.classList.remove("active");

    // Add Class Active To The Target
    if (mainBackground === "true") {
      document.querySelector(".random-background .yes").classList.add("active");
    } else {
      document.querySelector(".random-background .no").classList.add("active");
    }
  });
}

// Toggle Spin Class On Icon
document.querySelector(".settings-box .settings-toggle .fa-gear").onclick =
  function () {
    //! Toggle Class Fa-Spin For Rotation On It's Self
    this.classList.toggle("fa-spin");

    //! Toggle Class Open On Main Setting Box
    document.querySelector(".settings-box").classList.toggle("open");
  };

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");

// Loop On All List Item
colorsLi.forEach((li) => {
  //Click On Every List Item
  li.addEventListener("click", (ele) => {

    hundeleActive(ele);

    //! Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      ele.target.dataset.color
    );

    //! Set Color On Locale Storage
    localStorage.setItem("color_option", ele.target.dataset.color);
  });
});

// Switch Rnadom Background Option
const randomBckEl = document.querySelectorAll(".random-background span");

// Loop On All span Item
randomBckEl.forEach((span) => {
  //Click On Every List Item
  span.addEventListener("click", (ele) => {
  hundeleActive(ele);

    if (ele.target.dataset.background == "yes") {
      backgroundOption = true;

      localStorage.setItem("background_option", true);

      randomiseImgs();
    } else {
      backgroundOption = false;

      clearInterval(backgroundInterval);

      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");
landingPage.style.transition = `.4s`;

// Get Array Of Imgs
let imgsArray = [];
for (let i = 0; i < 5; i++) {
  imgsArray.push(`../imgs/0${i + 1}.jpg`);
}

// Function To Randomise Imgs
let randomiseImgs = () => {
  // Check If True
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Image
      landingPage.style.backgroundImage = `url(${imgsArray[randomNumber]})`;
    }, 10000);
  }
};

randomiseImgs();

//! Scroll Down Animation
let skills = document.querySelector(".skills");

// Function For The Animation
window.onscroll = () => {
  // Skills Offset Top
  let skillsOffsetTop = skills.offsetTop;

  // Skills Offset Hieght
  let skillsOffsetHeight = skills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window Scroll Top
  let windowScrollTop = this.scrollY;

  // Start Animation
  if (windowScrollTop > skillsOffsetHeight + skillsOffsetTop - windowHeight) {

    // Get All Skills
    let skillsProgress = document.querySelectorAll(".skill-progress span");

    skillsProgress.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};


// Create Popup With The Image

let ourGallery = document.querySelectorAll(".images-box img");

ourGallery.forEach(img => {

  img.onclick = () => {

    // !Create Overlay Element
    let div = document.createElement("div");

    // !Adding Overllay Class
    div.className = 'popup-overlay';

    //! Add Overlay To The Body
    document.body.appendChild(div);

    //! Create Popup div Element
    let popupBox = document.createElement("div");

    //! Add popup-box Class
    popupBox.className = 'popup-box';

    if(img.alt !== "") {

      //! Create h3 Element
      let imgtitle = document.createElement("h3");

      //! Adding Image Title To The imgTitle
      imgtitle.innerText = img.alt;

      //! Append h3 To The popupBox
      popupBox.appendChild(imgtitle);

    }

    //! Create Image Element
    let popupImg = document.createElement("img");

    //! Add Image To The popupimg
    popupImg.src = img.src;

    //! Appeng popupImg to popupBox
    popupBox.appendChild(popupImg);

    //! Appeng popupBox To The Body
    document.body.appendChild(popupBox);

  //! Create Clese Span
  let closeBtn = document.createElement("span");

  //! Add Class clode-btn to The closeBtn
  closeBtn.className = 'close-btn';

  //! Add Text To The closeBtn
  closeBtn.innerText = 'X';

  //! Append closeBtn To The popupBox
  popupBox.appendChild(closeBtn);

  }

});

// Close Popup
addEventListener('click', function (e) {

  if(e.target.className == 'close-btn') {

    // Remove The Current Popup
    e.target.parentElement.remove();

    // Remove The Overlay
    this.document.querySelector('.popup-overlay').remove();

  }

});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const allLinks = document.querySelectorAll(".links a");

goToSection(allBullets);
goToSection(allLinks);

// Allow Bullets Option
const bulletsOption = document.querySelectorAll(".option-box .bullets-option span");
const bulletsContainer = document.querySelector(".nav-bullets");
const mainBullet = localStorage.getItem("bullet_option");


// Check if LocaleStorage Is Not Empty
if (mainBullet !== null) {

  bulletsOption.forEach(span => span.classList.remove("active"));

  if (mainBullet === 'show') {

    bulletsContainer.style.display = 'block';
    document.querySelector(".option-box .bullets-option .yes").classList.add("active");

  } else {

    bulletsContainer.style.display = 'none';
    document.querySelector(".option-box .bullets-option .no").classList.add("active");

  }

};

bulletsOption.forEach(ele => {

  ele.addEventListener("click", (e) => {

    if (ele.dataset.display === 'show') {

      bulletsContainer.style.display = 'block';
      localStorage.setItem("bullet_option", ele.dataset.display);

    } else {

      bulletsContainer.style.display = 'none';
      localStorage.setItem("bullet_option", ele.dataset.display);

    }

    // Add Active Classe
    hundeleActive(e);

  });

});

// Reset Button
document.querySelector(".rest-option").onclick = function() {

  // Clear LocaleStorage Two Way
  localStorage.clear();//? First Way
  //? Secons Way
  // localStorage.removeItem("color_option");
  // localStorage.removeItem("background_option");
  // localStorage.removeItem("bullet_option");

  // Relode The Window
  window.location.reload();

}

// Toggle menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links-container .links");


toggleBtn.onclick = (e) => {

  // Stop Propagation
  e.stopPropagation();

  // Toggle The Button
  toggleBtn.classList.toggle("menu-active");

  // Toggle The Links
  tLinks.classList.toggle("open");

};

// Stop Propagation For Links
tLinks.onclick = (e) => e.stopPropagation();

//! Click Anywher in The Screen To Close To Menu
document.addEventListener("click", (e) => {

  if (e.target !== tLinks && e.target !== toggleBtn) {

    if (tLinks.classList.contains("open")) {

      // Toggle The Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle The Links
      tLinks.classList.toggle("open");

    }

  }

});

//!  ------------------------- Start Function Section ------------------------- */
//* Scroll page Function
function goToSection(elements) {

  elements.forEach(ele => {

    ele.addEventListener("click", (e) => {

      e.preventDefault();

      document.querySelector(e.target.dataset.section).scrollIntoView({

        behavior: 'smooth'

      });

    });

  });

};

//* Hundelle Evets Function
function hundeleActive(ev) {

  ev.target.parentElement.querySelectorAll(".active").forEach( element => {

    //? Remove Class Active from All The Chilldern
    element.classList.remove("active");

  } );

  //? Add Active Class On Self
  ev.target.classList.add("active");

}
