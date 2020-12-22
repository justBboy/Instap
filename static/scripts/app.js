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

function delaySearch(s){

	setTimeout(function(){

		var input = document.querySelector('.search-modal .search-bar .centered .search-input');
		if(input.value.trim() == s && input.value.trim().length > 0){

			if(input.getAttribute('data-active') != s){
				input.setAttribute('data-active', s);

				ga('send', 'pageview', '/search');

				$.get('https://www.instagram.com/web/search/topsearch/?context=blended&query='+s+'&include_reel=false&count=50', function(r){

					document.querySelector('.search-modal').classList.remove('loading');

					if(r.status == 'ok'){

						if(r.users.length > 0){

							document.querySelector('.search-modal').classList.add('has-results');

						} else {

							document.querySelector('.search-modal').classList.add('no-results');
						}

						var list = document.querySelectorAll('.search-modal .search-results .centered .results-search-list .account');

						for(var i = 0; i < list.length; i++){

							var li = list[i];

							var item = r.users[i].user;

							if(item === undefined){

								li.style.display = 'none';
								li.classList.remove('verified');
								li.querySelector('a').href = 'stories.html';
								//li.querySelector('a').on('click', null);

								var div = li.querySelector('a .avatar');
								div.style.backgroundImage = 'none';

								var span1 = li.querySelector('a .username');
								span1.innerHTML = 'username';

								var span2 = li.querySelector('a .name');
								span2.innerHTML = 'subname';

								continue;
							}

							li.style.display = 'block';

							if(li.getAttribute('data-type') == 'stories'){

								li.querySelector('a').href = '/stories/'+item.username;

							} else {

								li.querySelector('a').href = '/profile/'+item.username;
							}

							var div = li.querySelector('a .avatar');
							div.style.backgroundImage = 'url(\''+item.profile_pic_url+'\')';

							var span1 = li.querySelector('a .username');
							span1.innerHTML = item.username;
							if(item.is_verified != null && item.is_verified === true){
								var el = document.createElement('i');
								el.classList.add('verified');
								span1.appendChild(el);
								li.classList.add('verified');
							}

							var span2 = li.querySelector('a .name');
							span2.innerHTML = '';
							if(item.full_name != null && item.full_name.length > 0){
								span2.innerHTML = item.full_name;
							}
						}

						ga('send', 'pageview', '/search/results');

						return;
					}

					document.querySelector('.search-modal').classList.remove('loading');
					document.querySelector('.search-modal').classList.add('error');

					ga('send', 'pageview', '/search/error-2');


				}).fail(function(xhr, status, error) {

					document.querySelector('.search-modal').classList.remove('loading');
					document.querySelector('.search-modal').classList.add('error');

					ga('send', 'pageview', '/search/error-1');
				});
			}
		}
	}, 3000);
}
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
    };function refreshSearch(){.
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
