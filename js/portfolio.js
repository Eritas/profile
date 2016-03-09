//Add new style to hovered links with social networks in contacts
function hoveredLinkStyle() {
    var hoveredLink = $("a.socNet");
    hoveredLink.mouseover(function (e) {
        $(e.currentTarget).parent(".socNetDiv").css({
            "border": "4px groove #0f0f0f"
        });

    });
    hoveredLink.mouseleave(function (e) {
        $(e.currentTarget).parent(".socNetDiv").css({
            "border": ""
        });
    })
}

window.addEventListener("load", hoveredLinkStyle);