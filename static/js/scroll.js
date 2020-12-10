window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
     document.getElementById("scroller").style.display = "block";
  } else {
     document.getElementById("scroller").style.display = "none";
  }
}

function scrollUp() {
  $('html,body').animate({ scrollTop: 0 }, 1000);
}