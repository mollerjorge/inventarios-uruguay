(function($) {
  $.fn.extend({
    animateCss: function(animationName, callback) {
      var animationEnd = (function(el) {
        var animations = {
          animation: 'animationend',
          OAnimation: 'oAnimationEnd',
          MozAnimation: 'mozAnimationEnd',
          WebkitAnimation: 'webkitAnimationEnd',
        };
  
        for (var t in animations) {
          if (el.style[t] !== undefined) {
            return animations[t];
          }
        }
      })(document.createElement('div'));
  
      this.addClass('animated ' + animationName).one(animationEnd, function() {
        //$(this).removeClass('animated ' + animationName);
  
        if (typeof callback === 'function') callback();
      });
  
      return this;
    },
  });

  $('.services__wrp.fisicos').click(function(){
    redirect('fisicos.html');
  });
  $('.services__wrp.bienesCambio').click(function(){
    redirect('bienesDeCambio.html');
  });
  $('.services__wrp.consultoria').click(function(){
    redirect('consultoria.html');
  });
  $('.services__wrp.otros').click(function(){
    redirect('otrosServicios.html');
  });

  function redirect(url) {
    var href = window.location.href.split('/');
    href = href[0] + "//" + href[2] + '/';
    $(location).attr('href',href+url);
  }
  $(document).ready(function() {
    var isWoman = true;

    initCarousel();
    smoothScroll();
    //addAnimations();
    $('.mobile-nav-icon').click(displayMenu);
    $(".form--contact").submit(submitForm);
    $('.services__item-content').click(function() {
      $(location).attr("href", window.location.href + 'servicios.html');
    });

    $('.owl-carousel').owlCarousel({
      margin:10,
      nav:true,
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        }
      }
    })

    function initCarousel() {
      if ($(".clients__carousel").length) {
        $(".clients__carousel").slick({
          slidesToShow: 4,
          slidesToScroll: 1,
          autoplay: true,
          centerMode: true,
          autoplaySpeed: 2000,
          arrows: false,
          dots: true,
          responsive: [
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
          ]
        });
      }
    }

    function submitForm(e) {
      e.preventDefault();

      var name = $('input[name="nombre"]').val(),
        tel = $('input[name="telefono"]').val(),
        email = $('input[name="email"]').val(),
        message = $('textarea[name="mensaje"]').val();

      var htmlBody =
        "<ul>" +
        "<li><b>Nombre: </b> " +
        name +
        "</li>" +
        "<li><b>Email: </b> " +
        email +
        "</li>" +
        "<li><b>Telefono: </b> " +
        tel +
        "</li>" +
        "<li><b>Mensaje: </b> " +
        message +
        "</li>" +
        "</ul>";

      $(".form--contact button span").html("");
      $(".contact__spinner").css("display", "block");
      $.post(
        "https://api.elasticemail.com/v2/email/send",
        {
          apiKey: "761bcfd7-1488-484c-8334-1ca26ae96409",
          subject: "Nueva consulta desde su formulario web",
          from: email,
          to: "info@inventariosuruguay.com",
          isTransactional: true,
          bodyHtml: htmlBody,
          encodingType: 4
        },
        function(returnedData) {
          debugger;
          $(".contact__spinner").css("display", "none");
          $(".form--contact button span").html("ENVIAR MENSAJE");
          if (returnedData.success) {
            $(".notification").addClass("animated fadeInUp");
          } else {
            $(".notification").addClass("is-danger");
            $(".notification").html("Ocurrio un error al enviar la consulta");
            $(".notification").addClass("animated fadeInUp");
          }
        }
      ).fail(function() {
        console.log("error");
      });
    }

    function smoothScroll() {
      // Select all links with hashes
      $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]')
        .not('[href="#0"]')
        .click(function(event) {
          // On-page links
          if (
            location.pathname.replace(/^\//, "") ==
              this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
          ) {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length
              ? target
              : $("[name=" + this.hash.slice(1) + "]");
            // Does a scroll target exist?
            if (target.length) {
              // Only prevent default if animation is actually gonna happen
              event.preventDefault();
              $("html, body").animate(
                {
                  scrollTop: target.offset().top + 80
                },
                1000,
                function() {
                  // Callback after animation
                  // Must change focus!
                  var $target = $(target);
                  $target.focus();
                  if ($target.is(":focus")) {
                    // Checking if the target was focused
                    return false;
                  } else {
                    $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
                    $target.focus(); // Set focus again
                  }
                }
              );
            }
          }
        });
    }

    function addAnimations() {

      $('.wp-header-text h1').addClass('animated fadeIn');
      $('.wp-header-text h4').addClass('animated fadeIn');
      
      $('.wp-woman-men-work').waypoint(function(direction) {
        $('.wp-woman-men-work').addClass('animated fadeInLeft');
        $('.intro__text').addClass('animated fadeInRight');
      }, {
        offset: '20%'
      });


      $('.services__intro').waypoint(function() {
        $('.services__intro').animateCss('fadeIn');
      }, {offset: '30%'});

      $('.wp-si-1').waypoint(function() {
        
        $('.wp-si-1').animateCss('fadeInRight', function() {
          
          $('.wp-si-2').animateCss('fadeInRight', function() {
          
            $('.wp-si-3').animateCss('fadeInRight');
          });
        });
      },{ offset: '20%'});

      $('.about-us').waypoint(function() {
        $('.about-us__img-wrp').addClass('animated fadeInLeft');
        $('.about-us__box').addClass('animated fadeInRight');
      }, {offset: '20%'});


      $('.ts1').waypoint(function() {
        $('.ts1').addClass('animated fadeIn');
      }, {offset: '50%'});
      $('.ps1').waypoint(function() {
        $('.ps1').addClass('animated fadeIn');
      }, {offset: '50%'});
      $('.ts2').waypoint(function() {
        $('.ts2').addClass('animated fadeIn');
      }, {offset: '50%'});
      $('.ps2').waypoint(function() {
        $('.ps2').addClass('animated fadeIn');
      }, {offset: '50%'});
    }
  });

  function displayMenu() {
    if ($('.navigation__list').hasClass('fadeIn')) {
      $('.navigation__list').animateCss('fadeOut');
      $('.navigation__list').removeClass('fadeIn');

    } else {
      $('.navigation__list').animateCss('fadeIn');
      $('.navigation__list').removeClass('fadeOut');
    }
  }
})(jQuery);
