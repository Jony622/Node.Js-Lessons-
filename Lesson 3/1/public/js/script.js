$("#post").click(function(){
  $.post("/front-post",
  {
    name: "Donald Duck",
    city: "Duckburg"
  },
  function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
    $("#result").text(data)
  });
});

