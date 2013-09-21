$(document).ready(function() {

	var $oL = $('#old_list');
	$oL.after('<ul id="even_list" class="box-list"></ul>');
	$oL.next().append($oL.find('li:odd'));
	var box_height;
    var flag= $('#parentBody').length == 1;
    var resizeWindow = function() {
		var height = $(window).height();
		var width = $(window).width();
        if(!flag)
        	box_height = ( height / 2) ;
        else 
        	box_height = (( height - 136) / 2);

        var slider = $('#slider1');
        var menu = slider.find('>ul').css('left','0');
        var chilren = menu.children();
        chilren.width(box_height).css('visibility','hidden').removeClass('visible');
        menu.width(chilren.length* chilren.find(':first').outerWidth(true));

        var controls = slider.next();
        var menuWidth = menu.width();
        var parentWidth = slider.width() - 60;
        if(menuWidth< parentWidth){
            chilren.css('visibility','visible').addClass('visible');
            controls.hide();
        } else {
            controls.show();
            var prev_page = controls.children(':first').hide();
            var next_page = controls.children(':last').show();
            console.log(next_page);
            chilren.css('visibility','hidden').removeClass('visible');
            var f = $(chilren[0]);
            var w = f.outerWidth(true);
            do{
                f = f.css('visibility','visible').addClass('visible').next();
                w+= f.outerWidth(true);
            }while(w < parentWidth && f.length !=0);
            controls.off('click').on('click','a',function(e){
                e.stopImmediatePropagation();
                var c = $(this);
                if(c.hasClass('prev-page')){
                    var first = menu.find('li.visible:first');
                    var prev = first.prev();
                    if(prev.length != 0){
                        w = prev.outerWidth(true);
                        do{
                            prev = prev.css('visibility','visible').addClass('visible').prev();
                            w+= prev.outerWidth(true);
                        } while(w < parentWidth && prev.length !=0);
                        var pos = 0;
                        if(prev.length != 0) {
                            pos = prev.next().position().left
                        } else {
                            if(w<parentWidth){
                                do{
                                    w += first.outerWidth(true);
                                    if(w <parentWidth){
                                        first = first.next();
                                    } else {
                                        break;
                                    }
                                }while(w < parentWidth)
                            }
                            prev_page.hide();
                        }
                        menu.animate({left:-pos},500,function(){
                            next_page.show();
                            first.prev().nextAll('.visible').removeClass('visible').css('visibility','hidden');
                        });
                    }
                } else {
                    var last = menu.find('li.visible:last');
                    var next = last.next();
                    if(next.length != 0){
                        var pos = next.position().left;
                        w = next.outerWidth(true);
                        do{
                            next = next.css('visibility','visible').addClass('visible').next();
                            w+= next.outerWidth(true);
                        } while(w < parentWidth && next.length !=0);
                        next = next.prev();
                        if(w < parentWidth && next.length ==0){
                            while(w<parentWidth){
                                w += last.outerWidth(true);
                                if(w < parentWidth){
                                    pos = last.addClass('visible').css('visibility','visible').position().left;
                                    last = last.prev();
                                } else break;
                            }
                            c.hide();
                        }
                        next = last.next();
                        menu.animate({left:-pos},500,function(){
                            next.prevAll('.visible').removeClass('visible').css('visibility','hidden');
                            prev_page.show();
                        });
                    }
                }
            });
        }
        
		$('.box-list li').height(box_height);
		$('.box-list li').width(box_height);
		$('.adj-width').width(box_height);
		var n = $oL.children().length;
		var w = n * $oL.children(':first').outerWidth();
		$oL.width(w).next().width(w);
        var fz1 = Math.floor($(window).height() * (flag ? 0.02 : 0.024));
	    //alert(flag + '=>'+ fz1)
    	$('body').css('font-size', fz1 + 'px');
		var move_x = 0;
		$('.next').on('click', function() {
			if(parseInt($('.box-list').css('left')) > (parseInt($('.box-list').css('width'))) * (-1) + parseInt($(window).width())) {
				$(this).css("background","url('../images/left.png') no-repeat;");
				var alpha = $(window).width();
				move_x = (parseInt($('.box-list').css('left')) + parseInt(((Math.round(alpha / box_height) - 1) * box_height)) * (-1) + "px");
				$('.box-list').animate({
					"left" : move_x
				}, 1000);
				// $('.box-list').css("left", move_x);
			};
		});
		$('.prev').on('click', function() {
			if(parseInt($('.box-list').css('left')) != 0) {
				$(this).css("background","url('../images/right.png') no-repeat;");
				var beta = $(window).width();
				move_x = parseInt($('.box-list').css('left')) + parseInt(((Math.round(beta / box_height) - 1) * box_height) + "px");
				$('.box-list').animate({
					"left" : move_x
				}, 1000);
			};
		});
		
		//leaves page js begins 
        $('.inner-page .main-content').height(box_height*2);
        $('.mc-left').height(box_height*2).width(box_height);
		//leaves page js ends
		
		//login page js begins
		var window_ratio = width/height;
		var login_box_height;
		$('.login-content').css("margin-top","0px");
		if(window_ratio>1.5){
			login_box_height = height/2;
		}
		else{
			login_box_height = width/3;
			$('.login-content').css("margin-top",((height/2)-login_box_height + "px"));
			var fz = Math.floor($(window).width() * 0.0134);
			$('.login-body').css('font-size', fz + 'px');
		};
		$('.login-list li').css("height",login_box_height).css("width",login_box_height);
		
		
		//login page js ends
		
		var dd_b_height = $('.dropdown-b').height();
		$('.dropdown-b ul').css('top',dd_b_height + "px");
		
		
		
		
		
		
		// $('.btn-set-a a').width(Math.round(box_height*0.1));
		// $('.btn-set-a a').height(Math.round(box_height*0.1));
		
	}
	resizeWindow();

	$(window).resize(resizeWindow);

	$('.dropdown-a').on('click', function() {
		$('ul#pmenu').toggle();
	});
	$('.dropdown-b').on('click', function() {
		$(this).children('ul').toggle();
	});
		$('.dropdown-c').on('click', function() {
		$(this).children('ul').toggle();
	});
	$('.box-copyLeft').on('click', function() {
		$(this).parents('li').find('.flip-b').toggle();
		$(this).parents('.flip-a').toggle();
		$(this).parents('li').addClass('flipped');
	});
	$('.box-copyLeft-b').on('click', function() {
		$(this).parents('li').find('.flip-a').toggle();
		$(this).parents('.flip-b').toggle();
		$(this).parents('li').removeClass('flipped');
	});
	$(document).keydown(function(eventObject) {
		if(eventObject.which == 37) {//left arrow
			$('.box-slider .prev').click();
			//emulates click on prev button
		} else if(eventObject.which == 39) {//right arrow
			$('.box-slider .next').click();
			//emulates click on next button
		}
	});
});
