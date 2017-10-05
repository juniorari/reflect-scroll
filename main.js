var rscroll = (function() {
    var phoneTrack;
    var phoneSlideHeight;
    var sections;
    var sectionHeight;
    var sectionsNumber;
    var stepPhone;
    var stepSection;
    var scrollHeightTrigger;
    var pageHeight;
    var percent;

    var $ = function(selector) {
        if (selector.substring(0, 1) == '#') {
            return document.getElementById(selector.substring(1, selector.length));
        }
        return document.querySelectorAll(selector);
    }

    var initVariables = function(config) {
        if (!$('.phone-carousel')[0]) {
            console.log('Error: Nenhum elemento encontrado para o container');
            return;
        }

        sections = $(config.container)[0].querySelectorAll(':scope > div');
        sectionsNumber = sections.length;
        sectionHeight = window.innerHeight;
        scrollHeightTrigger = sectionHeight / 2;

        phoneTrack = $(config.reflection)[0];
        phoneSlideHeight = $(config.reflection)[0].querySelector(':scope > div').clientHeight;
        stepPhone = 0;

        Array.prototype.forEach.call(sections, function(el) {
            el.style.height = sectionHeight + 'px';
        });

        pageHeight = document.body.scrollHeight;
    }

    return {
        init: function(config) {
            initVariables(config);

            //
            window.addEventListener('scroll', function() {

// console.log('PageY',window.pageYOffset);

                if(window.pageYOffset >= scrollHeightTrigger && (window.pageYOffset < (scrollHeightTrigger * 2))){
                   //  v = true;
                   // if(){
                    scrollHeightTrigger += sectionHeight;
                   //  v = false;
                   // }
                   //var percent = 100 * (scrollHeightTrigger - window.pageYOffset) / (sectionHeight / 2);
                   percent = ((window.pageYOffset - scrollHeightTrigger) * 100) / (sectionHeight / 2);

                   if(percent>=98) percent =100;

                console.log('Porcetangem: ',percent);

                    stepPhone = (phoneSlideHeight * percent) / 100;
                    // console.log('stepPhone', phoneTrack.clientHeight  + ' - ' + phoneSlideHeight + ' = ' + stepPhone);

                    phoneTrack.style.transform = 'translateY(-' + stepPhone + 'px)';
                }else{
                    percent = 0;
                }

            });


            window.addEventListener('resize',function(){
                initVariables(config);
            });
        }
    }
})();