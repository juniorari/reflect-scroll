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

    var idxSection;

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

        percent = 0;

        // console.log("window.pageYOffset ", window.pageYOffset );
        // console.log("scrollHeightTrigger ", scrollHeightTrigger );
        // console.log("sectionHeight ", sectionHeight );
        // console.log("pageHeight ", pageHeight );
        // console.log("scrollDirectionVal ", scrollDirectionVal );
        // console.log("window.innerHeight ", window.innerHeight );

        idxSection = parseInt(window.pageYOffset / sectionHeight);
        // console.log("idxSection", idxSection);

        $("#slideIndex").innerHTML = idxSection+1;
        //console.log($("#slideIndex"));

        areaStoppedFrom = idxSection * sectionHeight;
        areaStoppedTo  = areaStoppedFrom + (sectionHeight/2);

        // console.log("areaStoppedFrom", areaStoppedFrom);
        // console.log("areaStoppedTo", areaStoppedTo);
        // console.log("idxSection * sectionHeight = "+idxSection +" x "+sectionHeight, idxSection * sectionHeight);


        if(window.pageYOffset >= areaStoppedFrom && window.pageYOffset <= areaStoppedTo){

            stepPhone = idxSection * phoneSlideHeight;
            //percent = 0;
            // console.log("stepPhone", stepPhone);

        } else if(window.pageYOffset >= scrollHeightTrigger){

            if(scrollDirection === 'down'){
                if(window.pageYOffset >= (scrollHeightTrigger + halfSectionHeight)){
                   if(!isScrolling){
                    incrementScrollTrigger();
                    // if(parseFloat(phoneTrack.style.top.replace('px','')) != 0){
                    //     stepPhone = parseFloat(phoneTrack.style.top.replace('px',''));
                    //     console.log(stepPhone);
                    // }
                   }
                   isScrolling = true;
                }
            }
            //se estiver descendo


            var percent = ((window.pageYOffset - scrollHeightTrigger) * 100) / halfSectionHeight;

            if(percent >= 95) percent = 100;
            if(percent <= 5) percent = 0;
            // console.log("stepPhone", stepPhone);
            // console.log("percent * " + phoneSlideHeight, percent);




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
        stepPhone = (phoneSlideHeight * percent) / 100 + (phoneSlideHeight * idxSection);

        if (stepPhone > ((sectionsNumber-1) * phoneSlideHeight)) {
            stepPhone = (sectionsNumber-1) * phoneSlideHeight;
        }

        phoneTrack.style.top = '-' + stepPhone + 'px';
        // console.log("phoneSlideHeight", phoneSlideHeight);
        // console.log("percent", percent);
        // console.log("phoneTrack.style.top", phoneTrack.style.top);
        // console.log("window.pageYOffset", window.pageYOffset);
        // console.log("sectionsNumber", sectionsNumber);

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