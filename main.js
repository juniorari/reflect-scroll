var phoneTrack       = document.querySelector('.phone-carousel');
var phoneSlideHeight = document.querySelector('.phone-item').clientHeight;
var sections         = document.querySelectorAll('.section');
var sectionsNumber   = sections.length;
var sectionHeight    = window.innerHeight;
var stepPhone        = 0;
var stepSection      = 0;
var scrollHeight     = sectionHeight;
// console.log(document.querySelector('.sections'));

Array.prototype.forEach.call(sections, function(el){
  el.style.height =  sectionHeight + 'px';
});

var pageHeight = document.body.scrollHeight;
console.log(phoneTrack.clientHeight);

console.log(phoneTrack);
window.addEventListener('scroll', function(){
// console.log(window.pageYOffset);
  var percent = 100 * window.pageYOffset / (pageHeight - scrollHeight);
  // console.log(percent);

  //stepPhone = ((pageHeight - phoneSlideHeight) / 100) * percent;
  stepPhone = ((phoneTrack.clientHeight - phoneSlideHeight ) * percent) / 100;
  // console.log("Y: "+phoneTrack.style.bot)

  phoneTrack.style.transform = 'translateY(-'+stepPhone+'px)';

});
