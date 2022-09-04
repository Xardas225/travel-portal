// burger 
const navMask = document.querySelector('.header__nav-mobile-mask');
const blackout = document.querySelector('.header__nav-mobile-blackout');
const navList = document.querySelector('.nav-mobile__list');
const navCloseButton = document.querySelector('.nav-mobile__close');

function hide() {
    document.body.classList.remove('scroll__disable');
    navMask.classList.remove('header__nav-mobile-mask__active');
    blackout.classList.replace('header__nav-mobile-blackout__active', 'header__nav-mobile-blackout__show');
    blackout.addEventListener('transitionend', () => {
        blackout.classList.remove('header__nav-mobile-blackout__show');
    });
}

const burgerItem = document.querySelector('.burger');
burgerItem.addEventListener('click', () => {
    navMask.classList.add('header__nav-mobile-mask__active');
    blackout.classList.add('header__nav-mobile-blackout__active');
    document.body.classList.add('scroll__disable');
});

navCloseButton.addEventListener('click', hide);
navList.addEventListener('click', hide);
blackout.addEventListener('click', hide);

//login pop-up
const popup = document.querySelector('.header__popup').innerHTML;
const loginButton = document.querySelector('.header__button-login');
const accountButton = document.querySelector('.account-link');

const loginClick = () => {
    document.querySelector('.header__popup').innerHTML = popup;

    const loginPopup = document.querySelector('.header__popup');
    const popupBlackout = document.querySelector('.popup__blackout');

    const logCont = document.querySelector('.popup-login__content');
    const regCont = document.querySelector('.popup-reg__content');

    document.body.classList.add('scroll__disable');
    loginPopup.classList.add('header__popup-active');


    document.querySelector('.header__popup-active').addEventListener('transitionend', () => {
        document.querySelector('.popup__blackout').classList.add('popup__blackout-active');
    });

    logCont.classList.add('popup-login__content-visible');
    logCont.classList.add('popup-login__content-active');
    regCont.classList.add('popup-reg__content-active');

    popupBlackout.addEventListener('click', () => {

        document.body.classList.remove('scroll__disable');

        popupBlackout.classList.remove('popup__blackout-active');
        popupBlackout.addEventListener('transitionend', () => {

            document.querySelector('.header__popup').classList.remove('header__popup-active');

            logCont.classList.remove('popup-login__content-active');
            regCont.classList.remove('popup-reg__content-active');
            regCont.addEventListener('transitionend', () => {
                regCont.classList.remove('popup-reg__content-visible');
                logCont.classList.remove('popup-login__content-visible');
            });
        });

    });

    // change login and register modale
    const regButton = document.querySelector('.popup__content-account__register');
    const logButton = document.querySelector('.popup__content-account__login');

    regButton.addEventListener('click', () => {
        document.querySelector('.popup-login__content').classList.remove('popup-login__content-visible');
        document.querySelector('.popup-reg__content').classList.add('popup-reg__content-visible');
    })

    logButton.addEventListener('click', () => {
        document.querySelector('.popup-reg__content').classList.remove('popup-reg__content-visible');
        document.querySelector('.popup-login__content').classList.add('popup-login__content-visible');
    })
}
loginButton.addEventListener("click", loginClick);
accountButton.addEventListener("click", loginClick);

//login alert
const getLoginInput = () => {
    let emailValue = document.getElementById("email__input").value;
    let passwordValue = document.getElementById("password__input").value;
    alert('E-mail: ' + emailValue + ' \nPassword: ' + passwordValue);
};

//reg alert
const getRegInput = () => {
    let emailRegValue = document.getElementById("email__reg-input").value;
    let passwordRegValue = document.getElementById("password__reg-input").value;
    alert('E-mail: ' + emailRegValue + ' \nPassword: ' + passwordRegValue);
};

//desktop slider
let sliderItems = document.querySelector('#slides');
const prev = document.querySelector('#button-left');
const next = document.querySelector('#button-right');
let dots = document.querySelector('#destinations__dots');

function slide(items, prev, next, dots) {
    let slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneLast = lastSlide.cloneNode(true);
    items.insertBefore(cloneLast, firstSlide);

    slides = items.getElementsByClassName('slide')
    firstSlide = slides[0]
    let usaSlide = slides[2];
    let cloneUsa = usaSlide.cloneNode(true);
    items.insertBefore(cloneUsa, firstSlide)

    const slider = document.querySelector('.slides');
    let dotItems = dots.getElementsByClassName('slider__dot');
    for (const dotItem of dotItems) {
        dotItem.classList.remove('slider__dot-active');
    }
    dotItems[1].classList.add('slider__dot-active');

    prev.addEventListener('click', () => {
        if (slider.classList.contains('slides__shifting-right')) {
            slider.classList.remove('slides__shifting-right');

            for (const dotItem of dotItems) {
                dotItem.classList.remove('slider__dot-active');
            }
            dotItems[1].classList.add('slider__dot-active');
        } else {
            slider.classList.remove('slides__shifting-right');
            slider.classList.add('slides__shifting-left');

            dotItems[1].classList.remove('slider__dot-active');
            dotItems[0].classList.add('slider__dot-active');
        }
    });

    next.addEventListener('click', () => {
        if (slider.classList.contains('slides__shifting-left')) {
            slider.classList.remove('slides__shifting-left');

            for (const dotItem of dotItems) {
                dotItem.classList.remove('slider__dot-active');
            }
            dotItems[1].classList.add('slider__dot-active');
        } else {
            slider.classList.remove('slides__shifting-left');
            slider.classList.add('slides__shifting-right');

            dotItems[1].classList.remove('slider__dot-active');
            dotItems[2].classList.add('slider__dot-active');
        }
    });
}
slide(sliderItems, prev, next, dots);

//mobile slider
let mobSliderItems = document.querySelector('.slides-mob');
const prevBtn = document.querySelector('#button-left-mob');
const nextBtn = document.querySelector('#button-right-mob');
let mobDots = document.querySelector('#destinations__dots-mob');

function slideMob(mobSliderItems, prevBtn, nextBtn, dots) {
    const sliderWidth = mobSliderItems.offsetWidth;
    const activeBtnleft = document.querySelector('.destinations__slider-btn__left-mob');
    const activeBtnRight = document.querySelector('.destinations__slider-btn__right-mob');

    let dotItems = dots.getElementsByClassName('slider__dot-mob');

    for (const dotItem of dotItems) {
        dotItem.classList.remove('slider__dot-active-mob');
    }

    let activeDot = 0;
    dotItems[activeDot].classList.add('slider__dot-active-mob');

    let offset = 0;
    const max = -(sliderWidth * 2);

    prevBtn.addEventListener('click', () => {
        if (offset !== 0) {
            offset += sliderWidth;
            mobSliderItems.style.transform = `translateX(${offset}px)`;
            activeBtnRight.classList.remove('destinations__slider-btn__nonactive');

            dotItems[activeDot].classList.remove('slider__dot-active-mob');
            dotItems[--activeDot].classList.add('slider__dot-active-mob');
        }
        if (offset === 0) {
            activeBtnleft.classList.remove('destinations__slider-btn__active')
        }
    });

    nextBtn.addEventListener('click', () => {
        if (offset !== max) {
            offset -= sliderWidth;
            mobSliderItems.style.transform = `translateX(${offset}px)`;
            activeBtnleft.classList.add('destinations__slider-btn__active');

            dotItems[activeDot].classList.remove('slider__dot-active-mob');
            dotItems[++activeDot].classList.add('slider__dot-active-mob');
        }
        if (offset === max) {
            activeBtnRight.classList.add('destinations__slider-btn__nonactive')
        }
    });
}

slideMob(mobSliderItems, prevBtn, nextBtn, mobDots)