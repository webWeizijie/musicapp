(function htmlAuto(){
	var oHtml = document.getElementsByTagName('html')[0];
	var windowWidth = '';
	function computedCss(){
		windowWidth = document.documentElement.offsetWidth;
		oHtml.style.fontSize = windowWidth / 6.1 + 'px';
	}
	computedCss()
	window.addEventListener('resize',computedCss);
})();
