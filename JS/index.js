 window.addEventListener('DOMContentLoaded', function() {
  /* header */
  const params = {
    btnClassName: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled"
  }

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(params.disabledClassName, params.activeClassName);
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  (() => {
    function setMenuListener() {
      document.body.addEventListener("click", (evt) => {
        const activeElements = document.querySelectorAll(`.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`);

        if (activeElements.length && !evt.target.closest(`.${params.activeClassName}`)) {
          activeElements.forEach((current) => {
            if (current.classList.contains(params.btnClassName)) {
              current.classList.remove(params.activeClassName);
            } else {
              current.classList.add(params.disabledClassName);
            }
          });
        }

        if (evt.target.closest(`.${params.btnClassName}`)) {
          const btn = evt.target.closest(`.${params.btnClassName}`);
          const path = btn.dataset.path;
          const drop = document.querySelector(`.${params.dropClassName}[data-target="${path}"]`);

          btn.classList.toggle(params.activeClassName);

          if (!drop.classList.contains(params.activeClassName)) {
            drop.classList.add(params.activeClassName);
            drop.addEventListener("animationend", onDisable);
          } else {
            drop.classList.add(params.disabledClassName);
          }
        }
      });
    }
    setMenuListener();
  })();

  function setBurger(params) {
    const btn = document.querySelector(`.${params.btnClass}`);
    const menu = document.querySelector(`.${params.menuClass}`);
    const links = menu.querySelectorAll(`.${params.linksClass}`);

    btn.setAttribute('aria-expanded', false);

    function onBtnClick() {
      if (window.getWindowWidth() <= window.TABLET_WIDTH) {
        btn.classList.toggle(params.activeClass);

        if (
          !menu.classList.contains(params.activeClass) &&
          !menu.classList.contains(params.hiddenClass)
        ) {
          menu.classList.add(params.activeClass);
          document.body.style.overflow = 'hidden';
          btn.setAttribute('aria-expanded', true);
        } else {
          menu.classList.add(params.hiddenClass);
          document.body.removeAttribute('style');
          btn.classList.toggle(params.hiddenClass);
          btn.setAttribute('aria-expanded', false);
        }
      }
    };

    menu.addEventListener("animationend", function () {
      if (this.classList.contains(params.hiddenClass)) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        btn.classList.remove(params.hiddenClass);
      }
    });

    btn.addEventListener("click", window.debounce(onBtnClick, 600));
    links.forEach((link) => {
      link.addEventListener("click", window.debounce(onBtnClick, 600));
    });
  }

  // здесь мы вызываем функцию и передаем в нее классы наших элементов
  setBurger({
    btnClass: "js-burger", // класс бургера
    menuClass: "js-menu-wrap", // класс меню
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
    linksClass: "js-menu-link"
  });

  function scrollToContent (link, isMobile) {
		if (isMobile && window.getWindowWidth() <= window.TABLET_WIDTH) {
			return;
		}

	  const href = link.getAttribute('href').substring(1);
	  const scrollTarget = document.getElementById(href);
	  const elementPosition = scrollTarget.getBoundingClientRect().top;

	  window.scrollBy({
	      top: elementPosition,
	      behavior: 'smooth'
	  });
	}

	document.querySelectorAll('.js-scroll-link').forEach(link => {
	  link.addEventListener('click', function(e) {
	      e.preventDefault();

	      scrollToContent(this, false);
	  });
	});

  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener('click', function(evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function (evt) {
      this.disabled = true;
      this.style.opacity = 0;

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });

    closeBtn.addEventListener('click', function () {
      openBtn.disabled = false;
      openBtn.style.opacity = '';
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener('click', function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        openBtn.style.opacity = '';
        search.classList.add(params.hiddenClass);
      }
    });
  }

  setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    closeBtnClass: "js-close-search", // класс кнопки закрытия
    searchClass: "js-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });

  /* hero */
  const swiper = new Swiper('.js-slider-back', {
    allowTouchMove: false,
    loop: true,
    effect: 'fade',
    speed: 10000,
    autoplay: {
      delay: 10000
    }
  });

  /* gallery */
  const gallerySlider = new Swiper(".gallery-right__slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".js-gallery-pagination",
      type: "fraction",
      clickable: true,
    },
    navigation: {
      nextEl: ".js-gallery-next",
      prevEl: ".js-gallery-prev",

    },

    breakpoints: {
      611: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 38
      },

      971: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
      },

      1281: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      }
    }
  });

  const gallerySelect = document.querySelector('.js-gallery-select');
  const galleryChoices = new Choices(gallerySelect, {
    shouldSort: false,
    searchEnabled: false,
    resetScrollPosition: false,
    itemSelectText: '',
    position: 'bottom',
    classNames: {
      containerOuter: 'gallery-choices',
      containerInner: 'gallery-choices__inner',
      input: 'gallery-choices__input',
      inputCloned: 'gallery-choices__input--cloned',
      list: 'gallery-choices__list',
      listItems: 'gallery-choices__list--multiple',
      listSingle: 'gallery-choices__list--single',
      listDropdown: 'gallery-choices__list--dropdown',
      item: 'gallery-choices__item',
      itemSelectable: 'gallery-choices__item--selectable',
      itemDisabled: 'gallery-choices__item--disabled',
      itemChoice: 'gallery-choices__item--choice',
      placeholder: 'gallery-choices__placeholder',
      group: 'gallery-choices__group',
      groupHeading: 'gallery-choices__heading',
      button: 'gallery-choices__button',
      activeState: 'is-active',
      focusState: 'is-focused',
      openState: 'is-open',
      disabledState: 'is-disabled',
      highlightedState: 'is-highlighted',
      selectedState: 'is-selected',
      flippedState: 'is-flipped',
      loadingState: 'is-loading',
      noResults: 'has-no-results',
      noChoices: 'has-no-choices'
    },
  });

  /* catalog */
  function setTabs (dataPath, dataTarget) {
    const btns = document.querySelectorAll(`.js-tab-btn[${dataPath}]`);
    const contents = document.querySelectorAll(`.js-catalog-tab-content[${dataTarget}]`);

    btns.forEach((btn) => {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();
          const path = this.getAttribute(dataPath);
          console.log(path);
          const target = document.querySelector(`.js-catalog-tab-content[${dataTarget}="${path}"]`);


          btns.forEach((currentBtn) => {
              currentBtn.classList.remove('tab-active');
          });

          this.classList.add('tab-active');

          contents.forEach((content) => {
              content.classList.remove('tab-active');
          });

          target.classList.add('tab-active');
      });
    });

    function scrollToContent (link, isMobile) {
      if (isMobile && getWindowWidth() >= window.MOBILE_WIDTH) {
        return;
      }

      const href = link.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition - 5,
          behavior: 'smooth'
      });
    }

    document.querySelectorAll('.js-tab-btn').forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();

          scrollToContent(this, true);
      });
    });
  }

  setTabs('data-path', 'data-target');

  const catalogAccordion = new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });

  /* events */
  const eventsSlider = new Swiper(".js-events-slider", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    pagination: {
      el: ".js-events-pagination",
      type: 'bullets',
      clickable: true,
    },
    navigation: {
      nextEl: ".js-events-next",
      prevEl: ".js-events-prev",
    },

    breakpoints: {
      611: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34
      },

      971: {
        slidesPerView: 3,
        slidesPerGroup: 2,
        spaceBetween: 27
      },

      1281: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50
      }
    },
  });

  /* projects */
  tippy('#projectsTippy-1', {
    placement: 'top',
    theme: 'projectsTeams',
    trigger: 'click',
    content: 'Пример современных тенденций - современная методология разработки',
  });

  tippy('#projectsTippy-2', {
    placement: 'top',
    theme: 'projectsTeams',
    trigger: 'click',
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
  });

  tippy('#projectsTippy-3', {
    placement: 'top',
    theme: 'projectsTeams-2',
    trigger: 'click',
    content: 'В стремлении повысить качество',
  });

  const projectsSlider = new Swiper(".js-partners-slider", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row"
    },
    spaceBetween: 20,
    navigation: {
      nextEl: ".js-partners-next",
      prevEl: ".js-partners-prev",
    },

    breakpoints: {
      611: {
        slidesPerView: 2,
        spaceBetween: 34
      },

      971: {
        slidesPerView: 2,
        spaceBetween: 50
      },

      1281: {
        slidesPerView: 3,
        spaceBetween: 50
      }
    },
  });

  /* contacts */
  var selector = document.querySelector("input[type=tel]");
  var im = new Inputmask("+7 (999)-999-99-99");
  im.mask(selector);

  const validation = new JustValidate('#form', {
    spaceBetween: 20,
  });
  validation
    .addField('#name', [
      {
        rule: 'required',
        errorMessage: 'Недопустимый формат',
      },
      {
        rule: 'minLength',
        value: 3,
        errorMessage: 'Минимум 3 символа',
      },
      {
        rule: 'maxLength',
        value: 30,
        errorMessage: 'Максимум 30 символов',
      },
    ])
    .addField('#phone', [
      {
        validator: function(name, value) {
          const phone = selector.inputmask.unmaskedvalue()
          return Number(phone) && phone.length === 10
        },
        errorMessage: 'Недопустимый формат',
      }
    ]).onSuccess((event) => {

      let formData = new FormData(event.target);
      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
           let doneMessage = document.querySelector('.feedback__message');
           doneMessage.classList.add('visible-message');

           (function() {
            // Создаём таймер
            setTimeout(function() {
              doneMessage.classList.remove('visible-message'); // Меняем прозрачность
            }, 5000); // 10000 мсек = 10 сек
          })();
          }
        }
      }

      xhr.open('POST', 'mail.php', true);
      xhr.send(formData);

      event.target.reset();
    });

  ymaps.ready(init);
  function init() {
    const mapElem = document.querySelector('#map');
    const myMap = new ymaps.Map(
      "map",
      {
        center: [55.760407, 37.614890],
        zoom: 14,
        controls: ['geolocationControl', 'zoomControl']
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition:  { top: "400px", right: "20px" },
        geolocationControlFloat: 'none',
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "330px", right: "20px" }
      },
    );

    myMap.behaviors.disable('scrollZoom');

    const myPlacemark = new ymaps.Placemark(
      [55.760407, 37.614890],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "../Blanchard/img/contacts-map-mark.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-10, -10],
      }
    );

    myMap.geoObjects.add(myPlacemark);
    myMap.container.fitToViewport();
  };

  /* modal */

  var linkArray = document.querySelectorAll('.js-open-modal');
  var overlay = document.querySelector('.js-modal-overlay');
  var crossArray = document.querySelectorAll('.js-close-modal');

  linkArray.forEach(function(item) {
    item.addEventListener('click', function (event) {
      event.preventDefault();

      var modalName = this.getAttribute('data-modal');
      var modal = document.querySelector('.js-modal[data-modal="' + modalName + '"]');

      modal.classList.add('is-show');
      overlay.classList.add('is-show');
    });
  });

  crossArray.forEach(function(cross) {
    cross.addEventListener('click', function(event) {
      event.preventDefault();

      var parent = this.parentNode;

      parent.classList.remove('is-show');
      overlay.classList.remove('is-show');
    });
  });

  overlay.addEventListener('click', function () {

    var modal = document.querySelector('.js-modal.is-show');

    modal.classList.remove('is-show');
    overlay.classList.remove('is-show');
  });

});
