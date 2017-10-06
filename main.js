var rscroll = (function() {
    var phoneTrack;
    var phoneSlideHeight;
    var sections;
    var sectionHeight;
    var sectionsNumber;
    var stepPhone;
    var stepSection;
    var scrollHeightTrigger;
    var halfSectionHeight;
    var pageHeight;
    var isScrolling;
    var scrollDirection;
    var scrollDirectionVal;
    var timer;

    var $ = function(selector) {
        if (selector.substring(0, 1) == '#') {
            return document.getElementById(selector.substring(1, selector.length));
        }
        return document.querySelectorAll(selector);
    }

    var initVariables = function(config) {
        sections            = $(config.container)[0].querySelectorAll(':scope > div');
        sectionsNumber      = sections.length;
        sectionHeight       = window.innerHeight;
        scrollHeightTrigger = sectionHeight / 2;
        halfSectionHeight   = sectionHeight / 2;
        isScrolling         = false;
        scrollDirectionVal  = window.pageYOffset || window.scrollTop;

        $('.trigger')[0].style.top = scrollHeightTrigger + 'px';

        phoneTrack          = $(config.reflection)[0];
        phoneSlideHeight    = $(config.reflection)[0].querySelector(':scope > div').clientHeight;
        stepPhone           = 0;

        Array.prototype.forEach.call(sections, function(el) {
            el.style.height = sectionHeight + 'px';
        });

        pageHeight = document.body.scrollHeight;
    }

    var defaultScroll = function(){
        var percent = 100 * window.pageYOffset / (pageHeight - sectionHeight);

        stepPhone = ((phoneTrack.clientHeight - phoneSlideHeight) * percent) / 100;

        phoneTrack.style.top = '-' + stepPhone + 'px';
    }

    var lockScroll =  function(){
        if(window.pageYOffset >= scrollHeightTrigger){

            if(scrollDirection === 'down'){
                if(window.pageYOffset >= (scrollHeightTrigger + halfSectionHeight)){
                   if(!isScrolling){
                    incrementScrollTrigger();
                    if(parseFloat(phoneTrack.style.top.replace('px','')) != 0){
                        stepPhone = parseFloat(phoneTrack.style.top.replace('px',''));
                        console.log(stepPhone);
                    }
                   }
                   isScrolling = true;
                }
            }
            //se estiver descendo

            var percent = ((window.pageYOffset - scrollHeightTrigger) * 100) / halfSectionHeight;

            if(percent >= 95) percent = 100;
            if(percent <= 5) percent = 0;
            // console.log(stepPhone);
            stepPhone = (phoneSlideHeight * percent) / 100;

            console.log(phoneTrack.style.top);
            phoneTrack.style.top = '-' + stepPhone + 'px';
        }else{
            if(scrollDirection === 'up'){
                if(window.pageYOffset > halfSectionHeight){
                    if(!isScrolling){
                        decrementScrollTrigger();
                    }
                    isScrolling = true;
                }
            }
        }
    }

    var incrementScrollTrigger = function(){
        scrollHeightTrigger += sectionHeight;
         $('.trigger')[0].style.top = scrollHeightTrigger + 'px';
        // console.log('Trigger: ',scrollHeightTrigger);
    }

    var decrementScrollTrigger = function(){
        scrollHeightTrigger -= sectionHeight;
        // console.log('Trigger: ',scrollHeightTrigger);
         $('.trigger')[0].style.top = scrollHeightTrigger + 'px';
    }

    var scrollEnd = function(){
        isScrolling = false;
        // console.log('scrollend');
    }

    return {
        init: function(config) {
            initVariables(config);

            //
            window.addEventListener('scroll', function() {

                var st = window.pageYOffset || document.documentElement.scrollTop;
                if(st > scrollDirectionVal){
                    scrollDirection = 'down';
                    // console.log(scrollDirection);
                }else{
                    scrollDirection = 'up';
                    // console.log(scrollDirection);
                }

                scrollDirectionVal = st;


                if(config.lock){
                    lockScroll();
                }else{
                    defaultScroll();
                }

                clearTimeout(timer);
                timer = setTimeout( scrollEnd , 20);

                // scrollDirectionVal =
            }, false);


            window.addEventListener('resize',function(){
                initVariables(config);
            });
        }
    }
})();