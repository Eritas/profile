/**
 * Created by Katya on 23.12.2015.
 */
var contentDivs = $(".content");

var allButtons = $(".btn");

function startPage() {

}

function hidePreviousContent(showDiv, activeButton) {
    for (var i = 0; i < contentDivs.length; i++) {
        $(contentDivs[i]).hide();
    }
    ;
    showDiv.show();

    for (var i = 0; i < allButtons.length; i++) {
        $(allButtons[i]).removeClass("active");
    }
    ;

    activeButton.addClass("active");
};

var homeBtn = $("#home-btn");
homeBtn.click(function () {
    console.debug("home btn clicked");
    var homeDiv = $("#welcome");
    hidePreviousContent(homeDiv, homeBtn);
});

var contactBtn = $("#contacts-btn");
contactBtn.click(function () {
    console.debug("contact btn clicked");
    var contactsDiv = $("#contacts");
    hidePreviousContent(contactsDiv, contactBtn);
});

var cvBtn = $("#cv-btn");
cvBtn.click(function () {
    console.debug("cv btn clicked");
    var cvDiv = $("#cv");
    hidePreviousContent(cvDiv, cvBtn);
});



