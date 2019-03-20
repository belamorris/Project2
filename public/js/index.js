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

var index = 0;
var imagePic1;
var currentHighCon = 0;
var compResults = {};
var $img;
var $name;
var $compareImg;
var $compareName;

// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $userImage = $("#userImgPlace");
var $userName = $("#userName");
var $userPhoto = $("#userImgPlace");
var $comparisonName = $("#compName");
var $compPhoto = $("#compImgPlace");

// var $exampleList = $("#example-list");


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
      url: "api/photolibraries",
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
    console.log(data);
    var submittedImage = data[data.length - 1];
    console.log("submitted image: " + submittedImage.photoURL);
    $img = $("#userImgPlace")
      .attr("id", "userImgPlace")
      .attr("src", submittedImage.photoURL);

    $name = $("#userName")
      .attr("id", "userName")
      .text(submittedImage.celebName);

    console.log("Name is: " + submittedImage.celebName);
    return $img, $name;
  });

  console.log("$img is: " + $img);
  $userPhoto.empty();
  $userName.empty();
  $userPhoto.append($img);
  $userName.append($name);
}

// var $examples = data.map(function (example) {
//   var $a = $("<a>")
//     .text(example.text)
//     .attr("href", "/example/" + example.id);

//   var $li = $("<li>")
//     .attr({
//       class: "list-group-item",
//       "data-id": example.id
//     })
//     .append($a);

//   var $button = $("<button>")
//     .addClass("btn btn-danger float-right delete")
//     .text("ｘ");

//   $li.append($button);

//   return $li;
// });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var example = {
    celebName: $exampleText.val().trim(),
    photoURL: $exampleDescription.val().trim()
  };



  if (!(example.celebName && example.photoURL)) {
    alert("You must enter your first name and an image URL!");
    return;
  }

  API.saveExample(example).then(function () {
    refreshExamples();
    faceCompare();
    // console.log("MADE IT HERE");
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
  // var currentHighCon = 0;
  imagePic1 = image1[index];
  image2 = $exampleDescription.val().trim();
  console.log("Image 2 is: " + image2);

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
      console.log(response);
      //   console.log(response.data);
      //   var confidence = new Object(
      //     (compResults.confidence = response.data.confidence)
      //   );
      console.log(
        "\n\n\t\t  The confidence rating is: " +
        response.confidence +
        "  "
      );

      confidenceLvl = response.confidence;

      updateComparison(index, confidenceLvl);

      var thresholdVals = Object.values(response.thresholds);

      if (response.confidence > currentHighCon) {
        currentHighCon = response.confidence;
        imageBestMatch = image1[index];
      }

      console.log("The Current High Confidence is: " + currentHighCon);
      console.log("The Image URL for the Best Match is: " + imageBestMatch);

      compResults = Object.assign({
        [index]: {
          confidence: response.confidence,
          lowThreshold: thresholdVals[0],
          midThreshold: thresholdVals[2],
          highThreshold: thresholdVals[1]
        }
      }, compResults);

      // console.log(
      //   (
      //     "\n\t If confidence rating is less than " +
      //     thresholdVals[0] +
      //     ", the two images are not of the same person. "
      //   )
      // );
      // console.log(
      //   (
      //     "\n\t If confidence rating is around " +
      //     thresholdVals[2] +
      //     ", the two images are somewhat alike. "
      //   )
      // );
      // console.log(
      //   (
      //     "\n\t If the confidence rating is greater than " +
      //     thresholdVals[1] +
      //     ", it is highly possible the two people are the same.\n "
      //   )
      // ); 


      if (index < image1.length - 1) {
        console.log(
          "====================== End of API Call " +
          (index + 1) +
          "===========================================\n"
        );
        index++;
        faceCompare();
      } else {
        console.log(
          "====================== End of API Call " +
          (index + 1) +
          "===========================================\n"
        );


        var compObjView = JSON.stringify(compResults);
        var jsonAccess = JSON.parse(compObjView);
        // console.log("Image comparison results are: " + compObjView); //This is an object containing the condfidence rating & low, mid, and high threshold values for each image comparison pair
        // console.log(Object.keys(compResults));
        // console.log(jsonAccess["0"]); //Example accessing entire first comparison info
        // console.log("The low threshold cutoff is " + jsonAccess["0"].lowThreshold); //Example accessing specific information from first comparison info
        return;
      }
    }
    // .catch(function (error) {
    //   console.log(error);
    // })
  });

};

//==========Updates comparison Photo and name =========== 
function updateComparison(index, confidenceLvl) {
  API.getExamples().then(function (info) {
    console.log(info);
    var compImage = info[index];
    console.log("Comparison image: " + compImage.photoURL);

    console.log ("MADE IT HERE!!!");

    $compareImg = $("#compImgPlace")
      .attr("id", "compImgPlace")
      .attr("src", compImage.photoURL);

    $compareName = $("#compName")
      .attr("id", "compName")
      .text(compImage.celebName + " Match % = " + confidenceLvl);

    console.log("Name is: " + compImage.celebName);
    return $compareImg, $compareName;
  });
  $compPhoto.empty();
  $comparisonName.empty();
  $compPhoto.append($compareImg);
  $comparisonName.append($compareName);
}