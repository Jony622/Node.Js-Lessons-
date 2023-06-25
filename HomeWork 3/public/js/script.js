$("#searchBtn").click(function(){
    $.post("/admin/search",
    {
      name: $("#search").val(),
    },
    function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });
  });


