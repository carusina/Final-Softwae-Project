function showPopup(message) {
    $('#wishlist-popup .popup-body').text(message);
    $('#wishlist-popup').addClass('visible');
}

function closePopup() {
    $('#wishlist-popup').removeClass('visible');
}

$(document).on('click', '.remove-item', function(e) {
    e.preventDefault();
    const pname = $(this).data('pname');
    $.ajax({
        url: '/remove-from-wishlist',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ pname: pname }),
        success: function(response) {
            $('tr[data-id="' + pname + '"]').remove();
            showPopup('위시리스트에서 삭제되었습니다.');
            setTimeout(() => {
                location.reload(); // 페이지 새로고침
            }, 2000);
        },
        error: function(error) {
            console.error('Error removing item:', error);
            showPopup('위시리스트 삭제 오류');
        }
    });
});
