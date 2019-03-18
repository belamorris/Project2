// var axios = require("axios");
// var chalk = require("chalk");

var mainURL = "https://api-us.faceplusplus.com/facepp/v3/compare";
var apiKey = "api_key=MYV-AMKLwV0A7LFZOFN4zJCKEIdLX4uJ";
var apiSecret = "api_secret=IeyKWPy6LfTvWl6Oy5-Kesy8YnKoNIdV";
var image1 = [
  "https://images.pexels.com/photos/814052/pexels-photo-814052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/789305/pexels-photo-789305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/886477/pexels-photo-886477.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1994818/pexels-photo-1994818.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1066116/pexels-photo-1066116.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1068207/pexels-photo-1068207.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1181742/pexels-photo-1181742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/977311/pexels-photo-977311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1832959/pexels-photo-1832959.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1893198/pexels-photo-1893198.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1963075/pexels-photo-1963075.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/247885/pexels-photo-247885.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1993094/pexels-photo-1993094.png?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/935969/pexels-photo-935969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1529350/pexels-photo-1529350.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/1211605/pexels-photo-1211605.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/733505/pexels-photo-733505.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1623536/pexels-photo-1623536.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1812634/pexels-photo-1812634.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1457824/pexels-photo-1457824.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1153334/pexels-photo-1153334.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/1618592/pexels-photo-1618592.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
];
// var image2 = example.photoURL;
// console.log("image2 URL is: " + image2);
var index = 0;
var imagePic1;
var compResults = {};

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");
// var $getTwin = $("#getTwin");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function (example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/photolibraries",
      data: JSON.stringify(example)
    });
  },
  getExamples: function () {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function (id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function () {
  API.getExamples().then(function (data) {
    var $examples = data.map(function (example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    celebName: $exampleText.val().trim(),
    photoURL: $exampleDescription.val().trim()
  };



  // if (!(example.text && example.description)) {
  //   alert("You must enter an example text and description!");
  //   return;
  // }

  API.saveExample(example).then(function () {
    faceCompare();
    console.log("MADE IT HERE");
  });

  // $exampleText.val("");
  // $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function () {
    refreshEfaxamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);


// ================ Call to Face++ API =================
function faceCompare() {
  console.log(
    (
      "====================== Begin of API Call " +
      (index + 1) +
      "==========================================="
    )
  );

  imagePic1 = image1[index];
  image2 = $exampleDescription.val().trim();
 
  var compareQuery =
    mainURL +
    "?" +
    apiKey +
    "&" +
    apiSecret +
    "&image_url1=" +
    imagePic1 +
    "&image_url2=" +
    image2;
    console.log(compareQuery);
  $.ajax({
    url: compareQuery,
    type: "POST",
    dataType: "JSON",
    success: function (response) {
      console.log("HERE I AM!!!!");
      console.log(response);
        //   console.log(response.data);
        //   var confidence = new Object(
        //     (compResults.confidence = response.data.confidence)
        //   );
        console.log(
          (
            "\n\n\t\t  The confidence rating is: " +
            response.confidence +
            "  "
          )
        );

        var thresholdVals = Object.values(response.thresholds);

        compResults = Object.assign({
          [index]: {
            confidence: response.confidence,
            lowThreshold: thresholdVals[0],
            midThreshold: thresholdVals[2],
            highThreshold: thresholdVals[1]
          }
        }, compResults);

        console.log(
          (
            "\n\t If confidence rating is less than " +
            thresholdVals[0] +
            ", the two images are not of the same person. "
          )
        );
        console.log(
          (
            "\n\t If confidence rating is around " +
            thresholdVals[2] +
            ", the two images are somewhat alike. "
          )
        );
        console.log(
          (
            "\n\t If the confidence rating is greater than " +
            thresholdVals[1] +
            ", it is highly possible the two people are the same.\n "
          )
        ); 

        if (index < image1.length - 1) {
          console.log(
            (
              "====================== End of API Call " +
              (index + 1) +
              "===========================================\n"
            )
          );
          index++;
          faceCompare();
        } else {
          console.log(
            (
              "====================== End of API Call " +
              (index + 1) +
              "===========================================\n"
            )
          );
          var compObjView = JSON.stringify(compResults);
          var jsonAccess = JSON.parse(compObjView);
          console.log("Image comparison results are: " + compObjView); //This is an object containing the condfidence rating & low, mid, and high threshold values for each image comparison pair
          console.log(Object.keys(compResults));
          console.log(jsonAccess["0"]); //Example accessing entire first comparison info
          console.log("The low threshold cutoff is " + jsonAccess["0"].lowThreshold); //Example accessing specific information from first comparison info
          return;
        }
      }
      // .catch(function (error) {
      //   console.log(error);
      // })
  });

};
