//Add new style to hovered links with social networks in contacts
function hoveredLinkStyle() {
    var hoveredLink = $("a.socNet");
    hoveredLink.mouseover(function (e) {
        $(e.currentTarget).parent(".socNetDiv").css({
            "border": "9px groove #3e8f3e"
        });

    });
    hoveredLink.mouseleave(function (e) {
        $(e.currentTarget).parent(".socNetDiv").css({
            "border": ""
        });
    })
}

window.addEventListener("load", hoveredLinkStyle);