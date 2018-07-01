(function($) {
  $(document).ready(function() {
    var isWoman = true;

    initCarousel();
    smoothScroll();
    $(".form--contact").submit(submitForm);

    setInterval(function() {
      var image = "";
      $(".header-bg").fadeOut(1000, function() {
        isWoman = !isWoman;

        if (isWoman) {
          image = "womanClipped.png";
        } else {
          image = "menClipped.png";
        }

        $(".header-bg")
          .attr("src", "img/header/" + image)
          .fadeIn(1000);
      });
    }, 8000);

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
          to: "jmoller2106@gmail.com",
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
  });
})(jQuery);
