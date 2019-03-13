var axios = require("axios");
var chalk = require("chalk");
var FacePlusPlus;

var mainURL = "https://api-us.faceplusplus.com/facepp/v3/compare";
var apiKey = "api_key=MYV-AMKLwV0A7LFZOFN4zJCKEIdLX4uJ";
var apiSecret = "api_secret=IeyKWPy6LfTvWl6Oy5-Kesy8YnKoNIdV";
var image1 = [
  "https://images.pexels.com/photos/814052/pexels-photo-814052.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
  "https://images.pexels.com/photos/789305/pexels-photo-789305.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
];
var image2 =
  "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500";
var index = 0;
var imagePic1;

// console.log(compareQuery);

function faceCompare() {
  console.log(
    chalk.yellow.bold.bgGreen(
      "====================== Begin of API Call " +
        (index + 1) +
        "===========================================\n"
    )
  );

  imagePic1 = image1[index];
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
  axios
    .post(compareQuery)

    .then(function(response) {
      console.log(response.data);
      console.log(
        chalk.yellowBright.bold.bgMagenta(
          "\n\n\t\t  The confidence rating is: " +
            response.data.confidence +
            "  "
        )
      );
      var thresholdVals = Object.values(response.data.thresholds);
      console.log(
        chalk.bgRed(
          "\n\t If confidence rating is less than " +
            thresholdVals[0] +
            ", the two images are not of the same person. "
        )
      );
      console.log(
        chalk.bgBlue(
          "\n\t If confidence rating is around " +
            thresholdVals[2] +
            ", the two images are somewhat alike. "
        )
      );
      console.log(
        chalk.black.bgCyan(
          "\n\t If the confidence rating is greater than " +
            thresholdVals[1] +
            ", it is highly possible the two people are the same. "
        )
      ); //The data outputs for confidence thresholds are lowest, highest, mid, thus the second index position is the highest confidence threshold listing.

      console.log(
        chalk.gray.bold.bgYellow(
          "\n The information below is additional data return from the POST request. "
        )
      );
      console.log(response.data.faces1);
      console.log(response.data.faces2);

      if (index < image1.length - 1) {
        console.log(
          chalk.yellow.bold.bgRed(
            "====================== End of API Call " +
              (index + 1) +
              "===========================================\n"
          )
        );
        index++;
        faceCompare();
      } else {
        console.log(
          chalk.yellow.bold.bgRed(
            "====================== End of API Call " +
              (index + 1) +
              "===========================================\n"
          )
        );
        return;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

faceCompare();

module.exports = FacePlusPlus;
