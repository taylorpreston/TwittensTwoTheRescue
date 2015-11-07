$(function(){
  $('nav ul > li > a').click(function(){
    $('nav ul > li').removeClass('selected');
    $(this).closest('li').addClass('selected');
  });
});

  $(window).load(function() {

    var $el, leftPos, tabSelected,
            $tabsNav = $("nav ul");

        if ($tabsNav.length > 0) {
            var width = $('nav ul').width();
            $tabsNav.css('width', width + 'px');

            if(!tabSelected) {
                var tabSelected = $('nav ul li:first-child');
                tabSelected.addClass('selected');
            }
            if($('nav ul li#line').length == 0) {
                $tabsNav.append("<li id='line'></li>");
            }

            $("nav ul #line").css({
                left: tabSelected.position().left,
                width: tabSelected.width()
            }).data("origLeft", $("#line").position().left);
       
            $("nav ul li").hover(function () {
                $el = $(this);
                width = $el.width();
                $("ulnav ul li#line").css("width", width);
                leftPos = $el.position().left;
                $("ulnav ul li#line").css("left", leftPos);

            }, function () {
                $("nav ul li#line").css({
                    left: $(".selected").position().left,
                    width: $(".selected").width()
                });
            });

        }
   });