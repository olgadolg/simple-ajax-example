$(document).ready(function () {
  $('.add').on('click', function () {
    var productId = $(this).parent().data('id');
    var productName = $(this).prev('.name').text();

    $.ajax({
      url: '/cart',
      type: 'POST',
      data: {
        name : productName,
        id : productId
      },
      success: function (data) {
        alert('Product added');
        refreshCart(data);
      }
    });
  });


});

refreshCart = function (data) {
  var blockWithProducts = $('.your-products');
  blockWithProducts.text('');
  for (var product in data) {
    blockWithProducts.append('<div>' + data[product].name + '; amount: ' + data[product].count + '</div>');
  }
}