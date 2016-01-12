/**
 * Created by Katya on 23.12.2015.
 */
var contentDivs = $(".content");

var allButtons = $(".btn");

function hidePreviousContent(showDiv, activeButton) {
    contentDivs.hide();
    showDiv.show();
    allButtons.removeClass("active");
    activeButton.addClass("active");
};

var contactBtn = $("#contacts-btn");
contactBtn.click(function () {
    console.debug("contact btn clicked");
    var contactsDiv = $("#contacts");
    hidePreviousContent(contactsDiv, contactBtn);
});

var homeBtn = $("#home-btn");
homeBtn.click(function () {
    console.debug("home btn clicked");
    var homeDiv = $("#welcome");
    hidePreviousContent(homeDiv, homeBtn);
});

