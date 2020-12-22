/* Document Ready ---------- */
$(document).ready(function() {

	/* Sidebar */
	$('.menu-btn').click(function() {
	  $('body').addClass('sb-toggled');
	  $('.prevent-click').fadeIn();
	});
	$('body .prevent-click').click(function() {
	  $('body').removeClass('sb-toggled');
	  $('.prevent-click').fadeOut();
	});

	/* Promote Ad */
	$('.promote-account-ad .close-btn').click(function() {
	  $(this).parent().parent().hide();
	});

	/* Promote Form */
	$('.package-select').click(function() {
	  $(this).toggleClass('toggled');
	});


	/* Dark Mode */
	$('.darkmode-options .button .switch input').change(function() {

		console.log(_getCookie('dark_mode'));

		if(this.checked) {

			_addCookie('1', 'dark_mode');

			$('body').addClass('darkmode');

		} else {

			_addCookie('0', 'dark_mode');

			$('body').removeClass('darkmode');
		}
	});

	/* Scroll */
	$(function() {
	  $('.scroll-more-btn').on('click', function(e) {
	  	$(this).addClass('scrolled');
	    e.preventDefault();
	    $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');

	  });
    });
    
//search section

    function refreshSearch(){
        document.querySelector('.search-modal').classList.remove('no-results');
        document.querySelector('.search-modal').classList.remove('has-results');
        document.querySelector('.search-modal').classList.remove('error');
    
        var val = document.querySelector('.search-modal .search-bar .centered .search-input').value.trim();
        if(val.length > 0){
    
            document.querySelector('.search-modal').classList.add('loading');
            document.querySelector('.search-modal').classList.remove('has-history');
    
            delaySearch(val);
    
        } else {
    
            document.querySelector('.search-modal').classList.remove('loading');
            document.querySelector('.search-modal').classList.add('has-history');
        }
    }
    
    document.querySelector('.header .centered .search-btn').onclick = function(){
        document.querySelector('body').classList.add('search-toggled');
        document.querySelector('.search-modal').style.display = 'block';
    
        var list = document.querySelector('.search-modal .search-results .centered .results-promoted-list');
        if(!list.hasAttribute('data')){
            $.post('track',{'i':{'s':0,'id':''}});
            list.setAttribute('data', true);
        }
    
        document.querySelector('.search-modal .search-bar .centered .search-input').focus();
    
        ga('send', 'pageview', '/search');
    };
    
    document.querySelector('.search-modal .back-btn').onclick = function(){
        document.querySelector('body').classList.remove('search-toggled');
        document.querySelector('.search-modal').style.display = 'none';
    
        };
    
    document.querySelector('.search-modal .search-bar .centered .search-input').onkeyup = function(e){
    
        e.preventDefault();
    
        if(e.keyCode === 13){
            refreshSearch();
            return false;
        }
    
        var val = this.value;
        if(val.length > 1){
            document.querySelector('.search-modal .search-bar .search-btn').classList.add('show');
        } else {
            document.querySelector('.search-modal .search-bar .search-btn').classList.remove('show');
        }
    };
    
    document.querySelector('.search-modal .search-bar .search-btn').onclick = function(e){
        e.preventDefault();
        
        refreshSearch();
    };function refreshSearch(){
	document.querySelector('.search-modal').classList.remove('no-results');
	document.querySelector('.search-modal').classList.remove('has-results');
	document.querySelector('.search-modal').classList.remove('error');

	var val = document.querySelector('.search-modal .search-bar .centered .search-input').value.trim();
	if(val.length > 0){

		document.querySelector('.search-modal').classList.add('loading');
		document.querySelector('.search-modal').classList.remove('has-history');

		delaySearch(val);

	} else {

		document.querySelector('.search-modal').classList.remove('loading');
		document.querySelector('.search-modal').classList.add('has-history');
	}
}

document.querySelector('.header .centered .search-btn').onclick = function(){
	document.querySelector('body').classList.add('search-toggled');
	document.querySelector('.search-modal').style.display = 'block';

	var list = document.querySelector('.search-modal .search-results .centered .results-promoted-list');
	if(!list.hasAttribute('data')){
		$.post('track',{'i':{'s':0,'id':''}});
		list.setAttribute('data', true);
	}

	document.querySelector('.search-modal .search-bar .centered .search-input').focus();

	ga('send', 'pageview', '/search');
};

document.querySelector('.search-modal .back-btn').onclick = function(){
	document.querySelector('body').classList.remove('search-toggled');
	document.querySelector('.search-modal').style.display = 'none';

	};

document.querySelector('.search-modal .search-bar .centered .search-input').onkeyup = function(e){

	e.preventDefault();

	if(e.keyCode === 13){
    	refreshSearch();
    	return false;
	}

	var val = this.value;
	if(val.length > 1){
		document.querySelector('.search-modal .search-bar .search-btn').classList.add('show');
	} else {
		document.querySelector('.search-modal .search-bar .search-btn').classList.remove('show');
	}
};

document.querySelector('.search-modal .search-bar .search-btn').onclick = function(e){
	e.preventDefault();
	
	refreshSearch();
};



});
