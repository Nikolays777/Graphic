$(function () {

    $('.content__btn').on('click', () => {
      $('.content__btn').toggleClass('active');
      $('.content__filter').toggleClass('active');
    });

    $('.filter__change-btn').on('click', function() {
        $('.filter__change-btn').removeClass('active');         
        $(this).toggleClass('active');
    });

    $('.menu__item').on('click', function() {
        $('.menu__item').removeClass('active');         
        $(this).toggleClass('active');
    });



      $('input[type="checkbox"]').styler();
    


  });