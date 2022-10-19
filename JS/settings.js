(() => {
  const TABLET_WIDTH = 1280;
  const MOBILE_WIDTH = 970;

  function debounce(f, ms) {

    let isCooldown = false;

    return function() {
      if (isCooldown) return;

      f.apply(this, arguments);

      isCooldown = true;

      setTimeout(() => isCooldown = false, ms);
    };
  };

  function getWindowWidth () {
	  return Math.max(
	    document.body.scrollWidth,
	    document.documentElement.scrollWidth,
	    document.body.offsetWidth,
	    document.documentElement.offsetWidth,
	    document.body.clientWidth,
	    document.documentElement.clientWidth
	  );
	}

  window.TABLET_WIDTH = TABLET_WIDTH;
  window.MOBILE_WIDTH = MOBILE_WIDTH;
  window.debounce = debounce;
  window.getWindowWidth = getWindowWidth;
})();
