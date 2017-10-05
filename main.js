var rscroll = (function() {
    var phoneTrack;
    var phoneSlideHeight;
    var sections;
    var sectionHeight;
    var sectionsNumber;
    var stepPhone;
    var stepSection;
    var scrollHeight;
    var pageHeight;

    var $ = function(selector) {
        if (selector.substring(0, 1) == '#') {
            return document.getElementById(selector.substring(1, selector.length));
        }
        return document.querySelectorAll(selector);
    }

    var initVariables = function(container, mirror) {
        if (!$('.phone-carousel')[0]) {
            console.log('Error: Nenhum elemento encontrado para o container');
            return;
        }

        sections = $(container)[0].querySelectorAll('.section');
        sectionsNumber = sections.length;
        sectionHeight = window.innerHeight;
        scrollHeight = sectionHeight;

        phoneTrack = $(mirror)[0];
        phoneSlideHeight = $(mirror)[0].querySelector('.phone-item').clientHeight;
        stepPhone = 0;

        Array.prototype.forEach.call(sections, function(el) {
            el.style.height = sectionHeight + 'px';
        });

        pageHeight = document.body.scrollHeight;
    }

    return {
        init: function(container, mirror) {
            initVariables(container, mirror);

            //
            window.addEventListener('scroll', function() {
                var percent = 100 * window.pageYOffset / (pageHeight - scrollHeight);

                stepPhone = ((phoneTrack.clientHeight - phoneSlideHeight) * percent) / 100;

                phoneTrack.style.transform = 'translateY(-' + stepPhone + 'px)';

            });


            window.addEventListener('resize',function(){
                initVariables(container, mirror);
            });
        }
    }
})();