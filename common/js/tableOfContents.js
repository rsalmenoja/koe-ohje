/*
    Initializes automatically table of contents and displays it left-side
    of the screen if the screen is not too tiny.
*/

function initializeTocBot(language) {
    $('.js-toc-content').find('h2, h3')
        .each(function () {
            var elem = $(this)
            elem.attr('id', formAutomaticIDs(elem.text()))
        })

    var languageToBeIgnored = language === "fi" ? ".sv" : ".fi"
    tocbot.init({
        tocSelector: '.js-toc',
        contentSelector: '.js-toc-content',
        headingSelector: 'h2, h3',
        ignoreSelector: languageToBeIgnored,
        collapseDepth: 6,
        positionFixedSelector: '.js-toc',
        fixedSidebarOffset: 'auto'
    })

    // Toggle toc menu (#menu button is show on narrow displays)
    $("#menu").off("click");
    $("#menu").click(function() {
      $(".js-toc").toggle("fast", function () {
        $(".toc-link").click(function() {
          $(".js-toc").hide("fast");
        });
      });
    });

    // Close toc menu when tab is changed on narrow displays
    $(".tab-menu-option").click(function() {
      if ($("#menu").css('display') == 'block') {
        $(".js-toc").hide("fast");
      }
    });

    // Always show on wide displays
    $(window).resize(function () {
      showTocBasedOnWidth();
    });

    showTocBasedOnWidth();
}

function showTocBasedOnWidth () {
  if ($(window).width()>1024) {
    $(".js-toc").show();
    $(".js-toc").css('top', $("#tab-menu").height());
    $(".toc-link").off("click");
  }
  else {
    $(".js-toc").hide();
    $(".js-toc").css('top', $("#tab-menu").height());
  }
}
