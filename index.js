function supportsTemplate() {
  return $("#image-template").html();
}

$(document).ready(function () {
  fetchDataFromAPI()
  $('#images').on("click", function () {
    var canWarn = $("#shouldWarnOnExternalURLs").prop("checked")
    if (canWarn) {
      $('#leaveIntentModal').modal('show')
    }
  });
});


function fetchDataFromAPI() {
  fetch('https://picsum.photos/v2/list').then(function (response) {
    return response.json();
  }).then(function (data) {
    addImages(data)
  }).catch(function (err) {
    console.warn('Something went wrong.', err);
  });
}


function addImages(images) {
  $("#images").empty();
  images.forEach(image => {
    addImage(image)
  });
}

function addImage(image) {
  console.log(image)
  if (supportsTemplate()) {
    var contents = $("#image-template").html()
    var entry = $(contents)

    contents = entry
      .find("#thumbnail")
      .attr("src", image.download_url);

    contents = entry
      .find("#author")
      .text(image.width + " x " + image.height);

    contents = entry
      .find("#dimensions")
      .text('By ' + image.author);

    contents = entry
      .find("#link")
      .attr("href", image.url);

    $("#images").append(entry);
  } else {
    console.log("No support for template tag.");
  }
}