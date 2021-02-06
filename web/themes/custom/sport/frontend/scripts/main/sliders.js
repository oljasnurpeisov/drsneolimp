import Swiper, { Navigation, Pagination } from "swiper";
Swiper.use([Navigation, Pagination]);

const initSliders = () => {
  const swiper = new Swiper(".swiper--nav .swiper-container", {
    loop: true,
    slidesPerView: "auto",
    loopedSlides: 30,
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper--nav .swiper-btn-next",
      prevEl: ".swiper--nav .swiper-btn-prev",
    },
  });

  const swiperNews = new Swiper(".swiper--news .swiper-container", {
    loop: false,
    slidesPerView: 1,
    spaceBetween: 5,
    navigation: {
      nextEl: ".swiper--news .swiper-btn-next",
      prevEl: ".swiper--news .swiper-btn-prev",
    },

    pagination: {
      el: ".swiper--news .swiper-pagination",
      type: "bullets",
    },
  });

  const swiperSportKinds = new Swiper(
    ".swiper--sport-kinds .swiper-container",
    {
      loop: false,
      navigation: {
        nextEl: ".swiper-btns--sport-kinds .swiper-btn-next",
        prevEl: ".swiper-btns--sport-kinds .swiper-btn-prev",
      },

      breakpoints: {
        0: {
          spaceBetween: 14,
          width: 264,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 14,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 32,
        },
      },
    }
  );

  const swiperPlans = new Swiper(".swiper--plans .swiper-container", {
    loop: true,
    navigation: {
      nextEl: ".swiper-btns--plans .swiper-btn-next",
      prevEl: ".swiper-btns--plans .swiper-btn-prev",
    },

    breakpoints: {
      0: {
        spaceBetween: 14,
        width: 264,
      },
      576: {
        slidesPerView: 2,
        spaceBetween: 14,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      992: {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    },
  });

  const swiperTrainers = new Swiper(".swiper--trainers .swiper-container", {
    loop: true,
    navigation: {
      nextEl: ".swiper-btns--trainers .swiper-btn-next",
      prevEl: ".swiper-btns--trainers .swiper-btn-prev",
    },

    breakpoints: {
      0: {
        spaceBetween: 14,
        width: 175,
      },
      576: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      768: {
        slidesPerView: 4,
        spaceBetween: 14,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 32,
      },
      1200: {
        slidesPerView: 6,
        spaceBetween: 32,
      },
    },
  });

  const swiperGallery = new Swiper(".swiper--gallery .swiper-container", {
    loop: true,
    navigation: {
      nextEl: ".swiper-btns--gallery .swiper-btn-next",
      prevEl: ".swiper-btns--gallery .swiper-btn-prev",
    },

    breakpoints: {
      0: {
        spaceBetween: 14,
        width: 264,
      },
      992: {
        slidesPerView: 2,
        spaceBetween: 32,
      }
    },
  });
};

export default initSliders;
