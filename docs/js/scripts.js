/* up 2 */

var i = 0,
    score = 0,
    firstClick = true,
    quiz = $('.quiz'),
    welcome = $('.welcome'),
    footer = $('.footer'),
    htmlTag = $('html'),
    background = $('.background'),
    lang = htmlTag.attr('lang');

var quizQuestionsLength = quizQuestionsTest.length;



function interfaceRender() {
    welcome.append(
        "<div class=''>" +
            "<div class='animate animate-inside animate-js header'>" + quizStrings[0][lang].header + "</div>" +
            "<div class='animate animate-inside animate-js header--under'>" + quizStrings[0][lang].about + "</div>" +
        "</div>" +
        "<button class='animate animate-down animate-js js-quiz'>" + quizStrings[0][lang].start + "</button>"
    );
    footer.append( "<button class='reset'>" + quizStrings[0][lang].reset + "</button>" );
    footer.append( "<button class='lang'>" + quizStrings[0][lang].lang + "</button>" );

}
interfaceRender();
// $('body').append(
//     "<div class='rang'>" +
//     "<div class='rang__img'><img src='/images/exmp.jpg'></div>" +
//     "<div class='rang__name'>" + quizStrings[0][lang].rang[0] + "</div>" +
//     "</div>"
// );

$(document).on('click', '.js-quiz', function () {

    var $this = $(this);

    $('.animate-js').removeClass('animate');
    $('.background').removeClass('background--animate');

    setTimeout(function () {
        $('body').removeClass().addClass("question--" + Number(i+1) + '');
        $('.background').removeClass('background--intro').removeClass("background--" + i + '');
    }, 300);

    setTimeout(function () {
        welcome.hide();

        quiz.html('');


        function render() {
            quiz.append(
                "<div class='quiz-wrap'>" +
                    "<div class='question animate-top animate-js'>" + quizQuestions[i][lang].question + "</div>" +
                "</div>"
            );
            quiz.append(
                $( '<div />', { 'class': 'answers' } ).append( function() {

                    return $.map(quizQuestions[i][lang].answers, function(value, key) {
                        return $( '<button class="quiz-answer animate-inside animate-js" data-true="'+ value +'">'+ key +'</button>');
                    });

                })
            );
            quiz.append(
                "<div class='quiz-additional hide'>" +
                    "<div class='description animate-inside animate-js'>" + quizQuestions[i][lang].description + "</div>" +
                "</div>"
            );
        }

        setTimeout(function () {
            $('.quiz-answer').addClass('animate');
            $('.question').addClass('animate');
        }, 100);

        if ( i == quizQuestionsLength - 1 ) {

            render();

            quiz.append(
                "<div class='quiz-additional quiz-additional--next hide'>" +
                    "<button class='js-quiz animate-down animate-js'>" + quizStrings[0][lang].end + "</button>" +
                "</div>"
            );

            firstClick = true;
            i++;

        } else if ( i === quizQuestionsLength ) {

            function getRang(rang) {
                $('body').append(
                    "<div class='rang'>" +
                        "<div class='rang__text'>" +
                            "<div class='rang__text__score'>" + quizStrings[0][lang].rangText[score] + "</div>" +
                            "<div class='rang__text__name'>" + quizStrings[0][lang].rang[rang] + "</div>" +
                            "<button class='reset reset--rang quiz-alert__text'>Начать сначала</button>" +
                        "</div>" +
                    "</div>"
                );
                $('.rang').addClass("background--score--" + score + '').css('opacity', '1');
            }


            // background.addClass("background--animate background--score--" + score + '');
            if (score === 0) {
                console.log('new');
                getRang(0);
            }
            else if (score === 1 || score === 2 || score === 3) {
                console.log('стрелец');
                getRang(1);
            }
            else if (score == 4 || score == 5 || score == 6) {
                console.log('сотник');
                getRang(2);
            }
            else if (score == 7 || score == 8 || score == 9) {
                console.log('голова');
                getRang(3);
            }
            else if (score == 10) {
                console.log('голова');
                getRang(4);
            }
            // setTimeout(function () {
            //     // quiz.append( "<div class='score'>" + quizStrings[0][lang].score + " " + score + " " + quizStrings[0][lang].out + " " + quizQuestionsLength +"</div>" );
            //     welcome.show();
            //     $('.rang').remove();
            //     $('.animate-js').addClass('animate');
            //     $('.background').addClass('background--animate background--intro');
            //
            // }, 10000);
            setTimeout(function () {


                score = 0;
                i = 0;
            }, 100);

        } else {

            render();

            quiz.append(
                "<div class='quiz-additional quiz-additional--next hide'>" +
                    "<button class='js-quiz animate-down animate-js'>" + quizStrings[0][lang].next + "</button>" +
                "</div>"
            );

            // setTimeout(function () {
            //     $('.animate-js').addClass('animate');
            // }, 100);


            firstClick = true;
            i++;
        }
    }, 500);
});


$(document).on('click', '.quiz-answer', function () {

    $('.quiz-alert').remove();

    if ($(this).attr('data-true') != 0) {

        $('.background').addClass("background--" + i + '');
        $('.quiz-answer').removeClass('animate');

        setTimeout(function () {
            $('.answers').addClass('hide');
            $('.quiz-additional').removeClass('hide');
            $('.background').addClass("background--animate");

        }, 400);
        setTimeout(function () {
            $('.description').addClass('animate');
            $('.js-quiz').addClass('animate');
        }, 600);

        if (firstClick) {
            score++;
        }

    } else {
        quiz.append( "<div class='quiz-alert'><div class='quiz-alert__text'>" + quizStrings[0][lang].tryAgain + "</div></div>" );
        $(this).addClass('pressed');
    }


    firstClick = false;
});

$(document).on('click', '.reset', function () {

    $('.animate-js').removeClass('animate');
    $('.background').addClass('background--intro').removeClass("background--" + i + '');
    $('.rang').css('opacity', '0')
    setTimeout(function () {
        quiz.html('');
        welcome.show();
        $('.animate-js').addClass('animate');
        $('.background').addClass('background--animate');
        $('body').removeClass();
        $('.rang').remove();
    }, 400);

    score = 0;
    i = 0;
});
$(document).on('click', '.lang', function () {

    $('.animate-js').removeClass('animate');
    $('.background').addClass('background--intro').removeClass("background--" + i + '');
    $('.rang').remove();
    setTimeout(function () {
        if (lang === 'ru') {
            lang = 'eng';
        } else {
            lang = 'ru';
        }
        // $('html').attr('lang', lang);


        quiz.html('');
        welcome.html('');
        footer.html('');

        interfaceRender();
        $('.animate-js').removeClass('animate');
        $('.background').addClass('background--animate');
        $('body').removeClass();


        welcome.show();

    }, 400);
    setTimeout(function () {
        $('.animate-js').addClass('animate');
    }, 600);

    score = 0;
    i = 0;

});