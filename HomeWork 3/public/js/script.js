$("#searchBtn").click(function(){
    $.post("/delete?id=userBase[i]._id",
    {
      name: $("#search").val(),
    },
    function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });


