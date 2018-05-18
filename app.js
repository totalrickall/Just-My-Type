let upperKey = $(`#keyboard-upper-container`);
let lowerKey = $(`#keyboard-lower-container`);
// uppercase keyboard should be hidden
$(upperKey).hide();
// These are the sentences for the game
let sentences = ["ten ate neite ate nee enet ite ate inet ent eate",
    "Too ato too nOt enot one totA not anot tOO aNot",
    "oat itain oat tain nate eate tea anne inant nean",
    "itant eate anot eat nato inate eat anot tain eat",
    "nee ene ate ite tent tiet ent ine ene ete ene ate"];
// refers to the individuals sentences in the array
let sentenceNum = 0;
let singleSentence = sentences[sentenceNum];
// refer to a single letter in the sentence
let letterNum = 0;
let letter = singleSentence.substring(letterNum, letterNum + 1);
// variables need for results
let timerOn = false;
let startDate;
let startTime;
let errors = 0;
// show the uppercase keyboard when shift key is pressed
$(document).keydown(function (e) {
    if (e.which === 16) {
        $(upperKey).show();
        $(lowerKey).hide()
    }
});
// hide the uppercase keyboard when shift key is pressed
$(document).keyup((e) => {
    if (e.which === 16) {
        $(upperKey).hide();
        $(lowerKey).show()

    }
});
// highlight the keys that are pressed
$(document).keypress((e) => {
    let key = $('#' + e.which)
    $(key).css('background-color', 'lime');
    $(document).keyup((e) => {
        $(key).css('background-color', '');
    });
});
// display the sentences from the array one-at-a-time
// display them in the <div id='sentence'></div>
$(`div #sentence`).text(singleSentence);
// display the expected letter in <div id='target-letter'></div>
$(`div #target-letter`).text(letter)


// For each sentence, show a visual "log" of right/wrong per character by inserting one of the following into the div with id="feedback":
// If the correct key is pressed, indicate with a green check.
// If the correct key is not pressed, indicate with a red X.
// At the end of each sentence, clear out the feedback div
$(document).keypress((e) => {
    if (timerOn === false) {
        startDate = new Date();
        startTime = startDate.getTime();
        timerOn = true;
    }
    // if the correct letter is pressed
    if (e.which === singleSentence.charCodeAt(letterNum)) {
        $(`div #feedback`).text(`✔`).css('color', 'green');
        letterNum++;
        letter = singleSentence.substring(letterNum, letterNum + 1);
        $(`div #target-letter`).text(letter);
        $("#yellow-block").css('left', '+=17.5px')
        // if the sentence is complete
        if (letterNum === singleSentence.length) {
            sentenceNum++;
            // if all sentences are complete
            if (sentenceNum === sentences.length) {
                let endDate = new Date();
                let endTime = endDate.getTime();
                let minutes = (endTime - startTime) / 60000;
                wpm = Math.round(54 / minutes - 2 * errors);
                let confirmBox = confirm(
                    `You typed ${wpm} words per minute! Would you like to try again?`
                );
                if (confirmBox == true) {
                    location.reload();
                }
                // change the sentence
            } else {
                singleSentence = sentences[sentenceNum];
                $(`div #sentence`).text(singleSentence);
                letterNum = 0;
                letter = singleSentence.substring(letterNum, letterNum + 1);
                $("#target-letter").text(letter);
                $("#yellow-block").css("left", "15px");
                $("#feedback").text("");
            }

        }
    } else { // if the incorrect letter is pressed
        $(`div #feedback`).text('✖').css('color', 'red')
    }
});


// $("#yellow-block").css('left', '+=18px'); >>> moves yellow block over letter


////////// will change to next sentence when enter key is pressed
// $(document).keypress((e) => {
//    if (e.which === 13) {
//        singleSentence = sentences[array];
//        array++;
//        $(`div #sentence`).text(singleSentence);
//    }
// });
