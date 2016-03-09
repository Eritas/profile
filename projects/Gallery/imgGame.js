/**
 * Created by Katya on 18.02.2016.
 */

window.addEventListener("load", afterload);

var imagesToDisplay = [
    ["projects/Gallery/image/fiveblur.jpg", "projects/Gallery/image/five.jpg"],
    ["projects/Gallery/image/zeroblur.jpg", "projects/Gallery/image/zero.jpg"],
    ["projects/Gallery/image/oneblur.jpg", "projects/Gallery/image/one.jpg"],
    ["projects/Gallery/image/twoblur.jpg", "projects/Gallery/image/two.jpg"],
    ["projects/Gallery/image/threeblur.jpg", "projects/Gallery/image/three.jpg"],
    ["projects/Gallery/image/fourblur.jpg", "projects/Gallery/image/four.jpg"]
];

function afterload() {
    console.log("here I am img");
    createImages("images-holder", imagesToDisplay);
};

/* This function will take holder element id and array of element to create */

function createImages(holderElementId, imagesArray) {
    //we will get element with required id and will put it into variable
    var holder = $("#" + holderElementId);
    //if element is exist
    if (holder) {
        //we are looking by array of elements which we want to create
        for (var i = 0; i < imagesArray.length; i++) {
            //create an element
            var image = $("<img>");
            var imageContainer = $("<div></div>");
            //set it's attribute
            image.attr({
                "src": imagesArray[i][0],
                "data-original-src": imagesArray[i][0],
                "data-alt-src": imagesArray[i][1],
                "class": "img-circle"
            });
            imageContainer.attr("class", "galleryImage");

            image.mouseover(function (e) {
                var image = $(e.currentTarget);
                image.attr("src", image.attr("data-alt-src"));
            });

            image.mouseleave(function (e) {
                var image = $(e.currentTarget);
                image.attr("src", image.attr("data-original-src"));
            });

            //add new element to the HTML holder
            holder.append(imageContainer);
            imageContainer.append(image);
        }
    }
};
